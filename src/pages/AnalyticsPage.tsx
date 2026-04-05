import { motion } from 'framer-motion'
import { LineChart as LineChartIcon, TrendingDown, TrendingUp, CalendarDays, Activity } from 'lucide-react'
import { Card, GradientCard } from '../components/ui/Card'
import { mockYearlyAnalytics, categoryData, mockHeatmapData } from '../data/mock'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts'

export function AnalyticsPage() {
  const bestDay = mockHeatmapData.reduce((prev, curr) => prev.intensity < curr.intensity ? prev : curr);
  const worstDay = mockHeatmapData.reduce((prev, curr) => prev.intensity > curr.intensity ? prev : curr);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto pb-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight flex items-center gap-3">
          <LineChartIcon className="text-indigo-400" size={28} />
          Advanced Analytics
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">Deep dive into a trailing 12-month historical performance matrix with built-in algorithmic predictive insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GradientCard 
          title="Year-over-Year Growth"
          value={<span className="text-4xl">+14%</span>}
          change="Consistent accumulation"
          gradientFrom="#8b5cf6"
          gradientTo="#3b82f6"
          shadowColor="#6366f1"
        />
        
        <Card className="bg-gradient-to-br from-navy-900 to-slate-800 border-slate-700/50">
          <h3 className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-400" /> Best Spending Day
          </h3>
          <p className="text-3xl font-bold text-white mb-1">{bestDay.day}</p>
          <p className="text-xs text-slate-500">Highest operational density observed</p>
        </Card>

        <Card className="bg-gradient-to-br from-navy-900 to-slate-800 border-slate-700/50">
          <h3 className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingDown size={16} className="text-rose-400" /> Lightest Spending Day
          </h3>
          <p className="text-3xl font-bold text-white mb-1">{worstDay.day}</p>
          <p className="text-xs text-slate-500">Lowest operational density observed</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-[400px]">
            <h3 className="text-lg font-semibold text-white mb-6">12-Month Trailing Performance</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockYearlyAnalytics} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="spendingGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="spending" name="Outflow" stroke="url(#spendingGrad)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} animationDuration={1500} />
                <Line type="monotone" dataKey="income" name="Inflow" stroke="url(#incomeGrad)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 bg-gradient-to-br from-indigo-900/40 to-cyan-900/20 border-indigo-500/20">
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
               <Activity size={18} className="text-cyan-400" />
               Predictive Insights
             </h3>
             <ul className="space-y-4">
               <li className="bg-navy-950/50 p-4 rounded-xl border border-indigo-500/20">
                 <p className="text-sm text-slate-300">Based on trailing Q1 velocity, May spending is projected to decrease by <span className="text-emerald-400 font-bold">12%</span>.</p>
               </li>
               <li className="bg-navy-950/50 p-4 rounded-xl border border-indigo-500/20">
                 <p className="text-sm text-slate-300">Dining expenditures are accelerating faster than global inflation indices. Consideration required.</p>
               </li>
             </ul>
          </Card>
          
          <Card className="flex-1">
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
               <CalendarDays size={18} className="text-slate-400" />
               Activity Matrix
             </h3>
             <div className="flex gap-2 h-20 items-end justify-between px-2">
               {mockHeatmapData.map((data, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 flex-1">
                   <div 
                     className="w-full rounded-md transition-all duration-300 hover:brightness-125"
                     style={{ 
                       height: `${data.intensity * 10}%`,
                       backgroundColor: `hsl(250, 70%, ${30 + data.intensity * 5}%)`,
                       opacity: 0.5 + (data.intensity * 0.05)
                     }}
                   />
                   <span className="text-[10px] text-slate-500 font-medium">{data.day}</span>
                 </div>
               ))}
             </div>
          </Card>
        </div>
      </div>

      <Card className="h-[350px]">
        <h3 className="text-lg font-semibold text-white mb-6">Categorical Distribution Weighting</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
            <XAxis type="number" stroke="#64748b" tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="name" stroke="#cbd5e1" width={100} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
              cursor={{ fill: '#1e293b', opacity: 0.4 }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={1000}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

    </motion.div>
  )
}
