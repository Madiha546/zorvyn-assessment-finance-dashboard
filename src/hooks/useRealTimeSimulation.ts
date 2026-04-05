import { useState, useEffect } from 'react';
import { chartData as initialChartData, summaryData as initialSummaryData } from '../data/mock';

export function useRealTimeSimulation() {
  const [summary, setSummary] = useState(initialSummaryData);
  const [history] = useState(initialChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live fluctuating balance bounds (+/- 5 to 50 bucks dynamically)
      const mockShift = (Math.random() - 0.5) * 80;
      
      setSummary(prev => ({
        ...prev,
        totalBalance: prev.totalBalance + mockShift,
        monthlyIncome: mockShift > 0 ? prev.monthlyIncome + mockShift : prev.monthlyIncome,
        monthlyExpenses: mockShift < 0 ? prev.monthlyExpenses + Math.abs(mockShift) : prev.monthlyExpenses
      }));

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return { summary, history };
}
