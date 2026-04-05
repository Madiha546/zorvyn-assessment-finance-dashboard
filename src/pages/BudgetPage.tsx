import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, AlertTriangle, Layers, CreditCard } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { mockBudgetLimits } from '../data/mock'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function CircularProgress({ percentage, color }: { percentage: number, color: string }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
        <circle 
          cx="48" cy="48" r={radius} stroke={color} strokeWidth="6" fill="transparent"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out drop-shadow-md"
        />
      </svg>
      <span className="absolute font-bold text-white text-lg">{percentage}%</span>
    </div>
  )
}

export function BudgetPage() {
  const [budgets, setBudgets] = useState(mockBudgetLimits);

  const handleSlider = (idx: number, val: number) => {
    const newBudgets = [...budgets];
    newBudgets[idx].limit = val;
    setBudgets(newBudgets);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto pb-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 tracking-tight flex items-center gap-3">
          <Target className="text-teal-400" size={28} />
          Constraint Parameters
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">Actively tune categorical thresholds governing your expenditure parameters in real time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          {budgets.map((budget, i) => {
            const percentage = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);
            let stateColor = '#22c55e'; // green
            let alertText = 'Nominal';
            if (percentage >= 100) { stateColor = '#f43f5e'; alertText = 'Breached'; }
            else if (percentage >= 80) { stateColor = '#f59e0b'; alertText = 'Elevated'; }

            return (
              <Card key={i} className="bg-gradient-to-r from-navy-900 to-slate-800/80 border-slate-700 p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                       {percentage >= 80 && <AlertTriangle size={14} color={stateColor} />}
                       {budget.category}
                    </h3>
                    <p className={`text-xs mt-1 font-semibold`} style={{ color: stateColor }}>State: {alertText}</p>
                  </div>
                  <CircularProgress percentage={percentage} color={stateColor} />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Consumed: <span className="text-white font-bold">${budget.spent}</span></span>
                    <span className="text-slate-400">Limit: <span className="text-white font-bold">${budget.limit}</span></span>
                  </div>
                  <input 
                    type="range" 
                    min={Math.max(budget.spent, 50)} 
                    max={2000} 
                    value={budget.limit}
                    onChange={(e) => handleSlider(i, parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>
              </Card>
            )
          })}
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
           <Card className="h-[400px]">
             <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Layers className="text-teal-400" size={18} /> Allocation Topology
             </h3>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgets} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <defs>
                    <linearGradient id="limitGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="spentGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#64748b" tickFormatter={(v) => `$${v}`} />
                  <YAxis type="category" dataKey="category" stroke="#cbd5e1" width={100} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
                    cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  />
                  <Legend />
                  <Bar dataKey="limit" name="Maximum Allocation" fill="url(#limitGrad)" radius={[0, 4, 4, 0]} barSize={12} animationDuration={1000} />
                  <Bar dataKey="spent" name="Consumed Capital" fill="url(#spentGrad)" radius={[0, 4, 4, 0]} barSize={12} animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
           </Card>

           <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/10 border-emerald-500/20">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md bg-emerald-500/20 text-emerald-400"><CreditCard size={18} /></div>
                    <span className="font-medium text-emerald-100">Total Liquid Buffer</span>
                 </div>
                 <p className="text-3xl font-bold text-white mt-4">$1,845.00</p>
                 <p className="text-emerald-400 text-sm mt-1">Remaining across all active constraints</p>
              </Card>

              <Card className="bg-gradient-to-br from-rose-900/30 to-orange-900/10 border-rose-500/20">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md bg-rose-500/20 text-rose-400"><AlertTriangle size={18} /></div>
                    <span className="font-medium text-rose-100">Algorithm Warning</span>
                 </div>
                 <p className="text-[13px] text-slate-300 mt-2">The <span className="font-bold text-rose-400">Entertainment</span> parameter has breached 100% capacity. Mathematical adjustments to the constraint limit are strongly advised to prevent negative accumulation.</p>
              </Card>
           </div>
        </div>
      </div>
    </motion.div>
  )
}
