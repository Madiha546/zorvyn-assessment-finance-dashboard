import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { TransactionsTable } from '../components/dashboard/TransactionsTable'

export function TransactionsPage() {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Transactions Directory</h1>
        <p className="text-slate-400 text-sm mt-1">Search, filter and organize your history across all categories.</p>
      </div>
      
      <TransactionsTable isAdmin={isAdmin} />
    </motion.div>
  )
}
