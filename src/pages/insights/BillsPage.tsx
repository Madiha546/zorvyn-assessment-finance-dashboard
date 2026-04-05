import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle, Calendar } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { mockUpcomingBills } from '../../data/mock'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useNavigate } from 'react-router-dom'

export function BillsPage() {
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
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 tracking-tight flex items-center gap-3">
          <AlertCircle className="text-amber-400" />
          Subscription & Bill Radar
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">Visual projection mapping of all incoming debit liabilities across the monthly sequence to ensure adequate balance liquidity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="h-[400px]">
            <h3 className="text-lg font-semibold text-white mb-6">Upcoming Liability Timeline by Cost</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockUpcomingBills} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" tickFormatter={(value) => `$${value}`} />
                <YAxis type="category" dataKey="name" stroke="#cbd5e1" width={120} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Bar dataKey="amount" radius={[0, 4, 4, 0]} animationDuration={1500}>
                  {mockUpcomingBills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.urgent ? '#f97316' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex-1 bg-gradient-to-br from-navy-900 to-amber-900/10 border-amber-500/20">
             <h3 className="text-lg font-semibold text-white mb-4">Critical Action Items</h3>
             <div className="space-y-4">
               {mockUpcomingBills.map(bill => (
                 <div key={bill.id} className={`p-4 rounded-xl border flex items-center justify-between ${bill.urgent ? 'bg-orange-500/10 border-orange-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
                   <div className="flex items-center gap-3">
                     <Calendar size={18} className={bill.urgent ? 'text-orange-400' : 'text-slate-400'} />
                     <div>
                       <p className="text-sm font-semibold text-slate-200">{bill.name}</p>
                       <p className="text-xs text-slate-400">{bill.date}</p>
                     </div>
                   </div>
                   <p className={`font-bold ${bill.urgent ? 'text-orange-400' : 'text-slate-300'}`}>
                     ${bill.amount.toFixed(2)}
                   </p>
                 </div>
               ))}
             </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
