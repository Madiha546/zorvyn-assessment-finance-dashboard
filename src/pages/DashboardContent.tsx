import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { Charts } from '../components/dashboard/Charts'
import { Insights } from '../components/dashboard/Insights'
import { TransactionsTable } from '../components/dashboard/TransactionsTable'
import { AddTransactionModal } from '../components/dashboard/AddTransactionModal'
import { Plus, X } from 'lucide-react'
import { useDashboardFilter } from '../context/FilterContext'

export function DashboardContent({ isAdmin }: { isAdmin: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { activeFilter, clearFilter } = useDashboardFilter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="max-w-7xl mx-auto relative z-10"
    >
      {/* GLOBAL CONTEXT BACKGROUND TINT */}
      <AnimatePresence>
        {activeFilter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ backgroundColor: `${activeFilter.color}15` }} // Adds ultra-subtle tint like rgba(..., 0.08)
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-20">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-4">
            Overview
            
            {/* INTERACTIVE FILTER BADGE */}
            <AnimatePresence>
              {activeFilter && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-md shadow-xl cursor-pointer hover:brightness-125 transition-all text-sm pointer-events-auto"
                  style={{ 
                    backgroundColor: `${activeFilter.color}25`, 
                    borderColor: `${activeFilter.color}50`,
                    color: activeFilter.color
                  }}
                  onClick={clearFilter}
                >
                  <span className="font-bold tracking-wide">Showing: {activeFilter.label || activeFilter.value}</span>
                  <div className="p-0.5 rounded-md hover:bg-black/20 ml-1">
                    <X size={14} strokeWidth={3} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Here's what's happening with your finances today.</p>
        </div>
        
        <AnimatePresence>
          {isAdmin && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-navy-950 px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer relative z-20"
            >
              <Plus size={18} />
              Add Transaction
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20">
        <SummaryCards />
        <Insights />
        <Charts />
        <TransactionsTable isAdmin={isAdmin} />
      </div>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  )
}
