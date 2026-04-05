import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Edit2, Trash2, FileWarning, PlusCircle } from 'lucide-react'
import { Card } from '../ui/Card'
import { useDashboardFilter } from '../../context/FilterContext'
import { useCSVData } from '../../context/CSVContext'
import type { Transaction } from '../../context/CSVContext'

const CATEGORY_COLORS: Record<string, string> = {
  'Groceries': '#22c55e',
  'Entertainment': '#a855f7',
  'Transport': '#06b6d4',
  'Utilities': '#f59e0b',
  'Healthcare': '#ec4899',
  'Shopping': '#f97316',
  'Salary': '#10b981'
};

export function TransactionsTable({ isAdmin }: { isAdmin: boolean }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { transactions, loading } = useCSVData()
  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([])
  const { activeFilter, setFilter } = useDashboardFilter()

  // Sync CSV logic with local deletion ability safely
  // Normally deleting modifies DB, here we modify our local visual state
  if (transactions.length > 0 && localTransactions.length === 0 && !loading) {
     setLocalTransactions(transactions);
  }

  // 1. Text Search Filter
  let filtered = localTransactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 2. Global Active Context Filter
  if (activeFilter) {
    if (activeFilter.type === 'category') {
      filtered = filtered.filter(t => t.category === activeFilter.value)
    } else if (activeFilter.type === 'card') {
      if (activeFilter.value === 'income') filtered = filtered.filter(t => t.amount > 0)
      if (activeFilter.value === 'expenses') filtered = filtered.filter(t => t.amount < 0)
    } else if (activeFilter.type === 'month') {
      // Mock assumes 'month' value hits partial matching on 't.date' (e.g. 'Feb' matches 'Feb 15')
      filtered = filtered.filter(t => t.date.includes(activeFilter.value.substring(0, 3)))
    }
  }

  const handleDelete = (id: string) => {
    setLocalTransactions(prev => prev.filter(t => t.id !== id))
  }

  const handleCategoryClick = (category: string) => {
    setFilter({
      type: 'category',
      value: category,
      color: CATEGORY_COLORS[category] || '#10b981',
      label: category
    });
  }

  return (
    <Card 
      className="mb-8 relative overflow-hidden group transition-all duration-300 border"
      style={{
        borderColor: activeFilter ? `${activeFilter.color}40` : 'rgba(51, 65, 85, 0.5)',
        boxShadow: activeFilter ? `0 0 40px ${activeFilter.color}15` : 'none'
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 relative z-10">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-950/80 backdrop-blur-sm border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-slate-200 shadow-inner"
            />
          </div>
          <button className="p-2 border border-slate-700 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto relative z-10 min-h-[250px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48">
             <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-emerald-400 border-solid animate-spin" />
             <p className="text-slate-400 mt-4 text-sm loading-pulse">Parsing CSV Records...</p>
          </div>
        ) : (
          <>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-slate-400 border-b border-slate-700">
            <tr>
              <th className="pb-3 font-medium">Transaction</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Amount</th>
              {isAdmin && <th className="pb-3 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <AnimatePresence mode="popLayout">
              {filtered.map((t, i) => {
                const categoryColor = CATEGORY_COLORS[t.category] || '#10b981';
                const isItemFilteredOut = activeFilter && activeFilter.type === 'category' && activeFilter.value !== t.category;
                
                return (
                  <motion.tr 
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: isItemFilteredOut ? 0.3 : 1, x: 0, scale: 1, filter: isItemFilteredOut ? 'grayscale(0.8)' : 'none' }}
                    exit={{ opacity: 0, x: 50, scale: 0.9, filter: "blur(4px)" }}
                    whileHover={{ scale: 1.01, backgroundColor: `${categoryColor}15`, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="group transition-colors relative cursor-default"
                  >
                    <td className="py-4 font-medium text-slate-200">{t.description}</td>
                    <td className="py-4">
                      <span 
                        onClick={() => handleCategoryClick(t.category)}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-600 shadow-sm backdrop-blur-md inline-block cursor-pointer transition-all hover:-translate-y-0.5"
                        style={{ color: categoryColor, borderColor: `${categoryColor}40` }}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity">{t.date}</td>
                    <td 
                      className={`py-4 text-right font-bold tracking-tight ${t.amount > 0 ? 'text-emerald-400' : 'text-slate-200'}`}
                      style={activeFilter ? { textShadow: `0 0 10px ${activeFilter.color}50` } : {}}
                    >
                      {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                    </td>
                    {isAdmin && (
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                          <button className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors rounded-lg cursor-pointer">
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 transition-colors rounded-lg cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
        
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center pt-12 pb-8 pointer-events-none"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-slate-800/50 border border-slate-700/80 mb-4 relative"
                   style={{ boxShadow: activeFilter ? `0 0 40px ${activeFilter.color}30` : '0 0 40px rgba(168,85,247,0.15)' }}>
                 <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" 
                      style={{ background: activeFilter ? `linear-gradient(tr, transparent, transparent, ${activeFilter.color}30)` : 'linear-gradient(to top right, transparent, transparent, rgba(168,85,247,0.2))' }} />
                 <FileWarning size={32} className="text-slate-400" />
              </div>
              <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400 mb-2">No Transactions Found</h4>
              <p className="text-slate-500 mb-6 font-medium text-sm">We couldn't track down any records matching your filter.</p>
              
              {isAdmin && (
                <button className="pointer-events-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/30 hover:border-emerald-400 transition-all shadow-lg shadow-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <PlusCircle size={18} />
                  Add New Record
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </>
        )}
      </div>
    </Card>
  )
}
