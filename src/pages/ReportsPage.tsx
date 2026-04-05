import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Printer, Filter } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { useCSVData } from '../context/CSVContext'

export function ReportsPage() {
  const { transactions } = useCSVData()
  const [reportPeriod, setReportPeriod] = useState('April 2026')

  const totalIn = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const net = totalIn - totalOut;

  // CSV Generator
  const downloadCSV = () => {
    const headers = ['ID', 'Date', 'Description', 'Category', 'Amount'];
    const rows = transactions.map(t => [t.id, t.date, t.description, t.category, t.amount.toString()]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `FinDash_Export_${reportPeriod.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Print trigger
  const handlePrint = () => {
    window.print();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto pb-12 print:text-black print:pb-0"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 print:mb-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight flex items-center gap-3 print:bg-none print:text-black print:text-4xl">
            <FileText className="text-violet-400 print:text-black" size={28} />
            Data Extraction Lab
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl print:hidden">Generate hard-copy PDF summaries or export your raw ledger matrices into standard CSV formats.</p>
        </div>
        
        <div className="flex items-center gap-3 print:hidden">
          <div className="relative">
            <select 
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="appearance-none bg-navy-900 border border-slate-700 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors text-white font-medium cursor-pointer"
            >
              <option>April 2026</option>
              <option>March 2026</option>
              <option>Q1 2026</option>
              <option>Trailing 12 Months</option>
            </select>
            <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
          >
            <Download size={16} /> CSV
          </button>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/20"
          >
            <Printer size={16} /> Render Document
          </button>
        </div>
      </div>

      {/* PRINT OPTIMIZED REPORT CONTAINER */}
      <div className="print:block">
        <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
          <h2 className="text-2xl font-bold">FinDash Internal Report</h2>
          <p className="text-gray-600 font-mono">Period: {reportPeriod}</p>
          <p className="text-gray-600 font-mono">Generated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="print:border-gray-300 print:shadow-none print:bg-white bg-gradient-to-br from-navy-900 to-slate-800 border-slate-700">
             <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2 print:text-gray-500">Gross Inward Capital</h3>
             <p className="text-3xl font-bold text-emerald-400 print:text-black">${totalIn.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </Card>
          <Card className="print:border-gray-300 print:shadow-none print:bg-white bg-gradient-to-br from-navy-900 to-slate-800 border-slate-700">
             <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2 print:text-gray-500">Gross Outward Capital</h3>
             <p className="text-3xl font-bold text-rose-400 print:text-black">${totalOut.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </Card>
          <Card className="print:border-gray-300 print:shadow-none print:bg-white bg-gradient-to-br from-navy-900 to-slate-800 border-slate-700">
             <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2 print:text-gray-500">Net Variance Flow</h3>
             <p className={`text-3xl font-bold ${net >= 0 ? 'text-white' : 'text-rose-400'} print:text-black`}>
               ${net.toLocaleString(undefined, { minimumFractionDigits: 2 })}
             </p>
          </Card>
        </div>

        <Card className="print:border-gray-300 print:shadow-none print:bg-white border-slate-700 bg-navy-900">
          <h3 className="text-lg font-bold text-white mb-6 print:text-black">Itemized Ledger Extract</h3>
          
          <table className="w-full text-left text-sm whitespace-nowrap print:border-collapse">
            <thead className="text-slate-400 border-b border-slate-700 print:text-black print:border-black">
              <tr>
                <th className="pb-3 font-semibold print:p-2 print:border">ID</th>
                <th className="pb-3 font-semibold print:p-2 print:border">Date</th>
                <th className="pb-3 font-semibold print:p-2 print:border">Vendor / Description</th>
                <th className="pb-3 font-semibold print:p-2 print:border">Classification</th>
                <th className="pb-3 font-semibold text-right print:p-2 print:border">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 print:divide-gray-300">
              {transactions.map(t => (
                <tr key={t.id} className="print:text-black print:break-inside-avoid text-slate-300 border-b print:border-gray-200">
                  <td className="py-3 font-mono text-xs opacity-50 print:p-2 print:border print:opacity-100">{t.id}</td>
                  <td className="py-3 print:p-2 print:border">{t.date}</td>
                  <td className="py-3 font-medium print:p-2 print:border">{t.description}</td>
                  <td className="py-3 print:p-2 print:border">{t.category}</td>
                  <td className={`py-3 text-right font-bold tracking-tight print:p-2 print:border ${t.amount > 0 ? 'text-emerald-400 print:text-black' : ''}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        
        <div className="hidden print:block mt-12 text-center text-xs text-gray-400">
           <p>End of Generated Report - FinDash Engine</p>
        </div>
      </div>
    </motion.div>
  )
}
