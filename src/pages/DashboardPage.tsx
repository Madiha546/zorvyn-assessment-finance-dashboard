import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { Charts } from '../components/dashboard/Charts'
import { Insights } from '../components/dashboard/Insights'
import { TransactionsTable } from '../components/dashboard/TransactionsTable'
import { AddTransactionModal } from '../components/dashboard/AddTransactionModal'
import { Plus } from 'lucide-react'

export function DashboardPage() {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
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
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-navy-950 px-4 py-2 rounded-lg font-semibold shadow-lg shadow-emerald-500/20 transition-colors"
            >
              <Plus size={18} />
              Add Transaction
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <SummaryCards />
      <Insights />
      <Charts />
      
      {/* Keeping miniature version here, full experience in TransactionsPage */}
      <TransactionsTable isAdmin={isAdmin} />

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  )
}
