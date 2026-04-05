import { motion } from 'framer-motion'
import { ArrowLeft, Target, Trophy, Clock } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { mockSavingsData } from '../../data/mock'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useNavigate } from 'react-router-dom'

export function SavingsPage() {
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
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight flex items-center gap-3">
          <Target className="text-emerald-400" />
          Savings Goal Trajectory
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">Track your monthly progression against your baseline algorithmic goals. You're currently running 20% mathematically ahead of the benchmark sequence!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-navy-900 to-emerald-900/20 border-emerald-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Trophy size={20} />
            </div>
            <h3 className="font-semibold text-emerald-100">Current Alpha</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">+$450.00</p>
          <p className="text-emerald-400 text-sm">Surplus against April target</p>
        </Card>

        <Card className="bg-gradient-to-br from-navy-900 to-teal-900/20 border-teal-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
              <Target size={20} />
            </div>
            <h3 className="font-semibold text-teal-100">Average Hit Rate</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">108%</p>
          <p className="text-teal-400 text-sm">Historical trailing compliance</p>
        </Card>

        <Card className="bg-gradient-to-br from-navy-900 to-slate-800/50 border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-800 text-slate-300 rounded-lg">
              <Clock size={20} />
            </div>
            <h3 className="font-semibold text-slate-200">Next Milestone</h3>
          </div>
          <p className="text-4xl font-bold text-white mb-2">24 Days</p>
          <p className="text-slate-400 text-sm">Until Q2 target validation lock</p>
        </Card>
      </div>

      <Card className="h-[450px]">
        <h3 className="text-lg font-semibold text-white mb-6">Target vs Actual Trajectory</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockSavingsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748b" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#334155" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
              itemStyle={{ fontWeight: 'bold' }}
              cursor={{ fill: '#1e293b', opacity: 0.4 }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="target" name="Target Objective" fill="url(#targetGradient)" radius={[4, 4, 0, 0]} animationDuration={1500} />
            <Bar dataKey="actual" name="Actual Accumulated" fill="url(#actualGradient)" radius={[4, 4, 0, 0]} animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  )
}
