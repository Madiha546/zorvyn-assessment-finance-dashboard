import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function AddTransactionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-navy-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">New Transaction</h2>
              <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                <input type="text" className="w-full bg-navy-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner" placeholder="e.g. Grocery Store" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Amount</label>
                  <input type="number" className="w-full bg-navy-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                  <select className="w-full bg-navy-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner">
                    <option>Expense</option>
                    <option>Income</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                <select className="w-full bg-navy-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner">
                  <option>Groceries</option>
                  <option>Dining</option>
                  <option>Utilities</option>
                  <option>Subscription</option>
                </select>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="px-4 py-2 rounded-lg font-medium bg-primary text-navy-950 hover:bg-primary-hover shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Save Transaction
                </motion.button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
