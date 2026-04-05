import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PiggyBank, Plus, Trophy, Sparkles } from 'lucide-react'
import { Card } from '../components/ui/Card'
import confetti from 'canvas-confetti'

interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
}

const initialGoals: Goal[] = [
  { id: '1', name: 'Emergency Buffer', target: 5000, saved: 4500 },
  { id: '2', name: 'Vacation Fund', target: 2000, saved: 800 },
  { id: '3', name: 'New Laptop', target: 1500, saved: 1500 }, // completed
]

export function SavingsGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [isCreating, setIsCreating] = useState(false)
  const [newGoalName, setNewGoalName] = useState('')
  const [newGoalTarget, setNewGoalTarget] = useState('')

  const handleDeposit = (id: string) => {
    setGoals(goals.map(g => {
      if (g.id !== id) return g;
      const newSaved = g.saved + 100;
      if (newSaved >= g.target && g.saved < g.target) {
        // Trigger completion burst!
        const end = Date.now() + 1.5 * 1000;
        const colors = ['#10b981', '#34d399', '#fbbf24'];

        (function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }
      return { ...g, saved: Math.min(newSaved, g.target) }
    }))
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName || !newGoalTarget) return;
    setGoals([...goals, { id: Date.now().toString(), name: newGoalName, target: parseFloat(newGoalTarget), saved: 0 }]);
    setIsCreating(false);
    setNewGoalName('');
    setNewGoalTarget('');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400 tracking-tight flex items-center gap-3">
            <PiggyBank className="text-emerald-400" size={28} />
            Savings Objectives
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl">Accumulate wealth by strictly partitioning excess liquidity into algorithmic goals. Click deposit buttons to simulate tracking.</p>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/10 transition-colors shadow-lg shadow-emerald-500/10"
        >
          <Plus size={18} /> New Objective
        </button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-navy-900 to-slate-800 border-emerald-500/40 p-6 overflow-hidden">
               <h3 className="text-lg font-bold text-white mb-4">Initialize New Target</h3>
               <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4 items-end">
                 <div className="flex-1 w-full">
                   <label className="block text-xs font-medium text-slate-400 mb-1">Objective Designation</label>
                   <input 
                     type="text" 
                     value={newGoalName} 
                     onChange={e => setNewGoalName(e.target.value)} 
                     placeholder="e.g. Real Estate Downpayment"
                     className="w-full bg-navy-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                   />
                 </div>
                 <div className="flex-1 w-full">
                   <label className="block text-xs font-medium text-slate-400 mb-1">Target Capital ($)</label>
                   <input 
                     type="number" 
                     value={newGoalTarget} 
                     onChange={e => setNewGoalTarget(e.target.value)} 
                     placeholder="10000"
                     className="w-full bg-navy-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                   />
                 </div>
                 <button type="submit" className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold rounded-lg transition-colors">
                   Engage
                 </button>
               </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => {
          const isComplete = goal.saved >= goal.target;
          const percentage = Math.round((goal.saved / goal.target) * 100);

          return (
            <Card key={goal.id} className={`relative overflow-hidden ${isComplete ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-gradient-to-b from-navy-900 to-emerald-900/20' : ''}`}>
              {isComplete && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-amber-400/20 text-amber-400 p-2 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    <Trophy size={20} />
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-6 pr-12">{goal.name}</h3>
              
              <div className="flex items-center justify-center mb-6">
                 {/* CSS SVG Donut */}
                 <div className="relative w-40 h-40">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                     <circle 
                       cx="80" cy="80" r="70" 
                       stroke={isComplete ? '#10b981' : '#38bdf8'} 
                       strokeWidth="12" fill="transparent"
                       strokeDasharray={2 * Math.PI * 70} 
                       strokeDashoffset={(2 * Math.PI * 70) - ((percentage / 100) * (2 * Math.PI * 70))}
                       className="transition-all duration-1000 ease-out"
                       strokeLinecap="round"
                     />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-black text-white tracking-tighter">{percentage}%</span>
                   </div>
                 </div>
              </div>

              <div className="flex justify-between items-center mb-6 px-2">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Accumulated</p>
                  <p className="text-lg font-semibold text-white">${goal.saved.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Target</p>
                  <p className="text-lg font-semibold text-white">${goal.target.toLocaleString()}</p>
                </div>
              </div>

              {!isComplete ? (
                <button 
                  onClick={() => handleDeposit(goal.id)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Plus size={16} className="text-teal-400" /> Deposit $100
                </button>
              ) : (
                <div className="w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center gap-2">
                  <Sparkles size={18} /> Objective Secured
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </motion.div>
  )
}
