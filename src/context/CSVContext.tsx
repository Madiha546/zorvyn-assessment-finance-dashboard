import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Papa from 'papaparse';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

interface CSVContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refreshCSV: () => void;
}

const CSVContext = createContext<CSVContextType | undefined>(undefined);

export function CSVProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCSV = () => {
    setLoading(true);
    // Path matches standard Vite public dir resolution
    fetch('/transactions.csv')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch transactions.csv');
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data.map((row: any) => ({
              id: row.id,
              date: row.date,
              description: row.description,
              amount: parseFloat(row.amount),
              category: row.category
            }));
            setTransactions(parsedData);
            setLoading(false);
          },
          error: (err: any) => {
            setError(err.message);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        console.error("CSV Loading Error:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCSV();
  }, []);

  return (
    <CSVContext.Provider value={{ transactions, loading, error, refreshCSV: loadCSV }}>
      {children}
    </CSVContext.Provider>
  );
}

export function useCSVData() {
  const context = useContext(CSVContext);
  if (context === undefined) {
    throw new Error('useCSVData must be used within a CSVProvider');
  }
  return context;
}
