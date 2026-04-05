import { motion } from 'framer-motion'
import { Insights } from '../components/dashboard/Insights'
import { Charts } from '../components/dashboard/Charts'

export function InsightsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Financial Insights</h1>
        <p className="text-slate-400 text-sm mt-1">Deep dive into your spending algorithms and goal tracking.</p>
      </div>
      
      <Insights />
      <div className="mt-8">
        <Charts />
      </div>
    </motion.div>
  )
}
