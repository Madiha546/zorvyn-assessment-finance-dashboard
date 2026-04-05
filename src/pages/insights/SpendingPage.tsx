import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { mockSpendingVelocity } from '../../data/mock'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useNavigate } from 'react-router-dom'

export function SpendingPage() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-7xl mx-auto pb-12"
    >
      <button 
        onClick={() => navigate('/insights')}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Insights
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 tracking-tight flex items-center gap-3">
          <TrendingUp className="text-sky-400" />
          Spending Velocity
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">Analyze exactly where and how fast your capital is leaving the structure via stacked density matrices representing intersecting transaction algorithms.</p>
      </div>

      <Card className="h-[500px]">
        <h3 className="text-lg font-semibold text-white mb-6">Categorical Weekly Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockSpendingVelocity} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGroceries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorDining" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorUtilities" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area type="monotone" dataKey="Groceries" stackId="1" stroke="#22c55e" fill="url(#colorGroceries)" animationDuration={1500} />
            <Area type="monotone" dataKey="Dining" stackId="1" stroke="#ec4899" fill="url(#colorDining)" animationDuration={1500} />
            <Area type="monotone" dataKey="Utilities" stackId="1" stroke="#f59e0b" fill="url(#colorUtilities)" animationDuration={1500} />
            <Area type="monotone" dataKey="Subscriptions" stackId="1" stroke="#a855f7" fill="url(#colorSubs)" animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  )
}
