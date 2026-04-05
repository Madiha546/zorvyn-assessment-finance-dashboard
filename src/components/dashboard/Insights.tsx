import { motion } from 'framer-motion'
import { TrendingUp, AlertCircle, Award, Target, ChevronRight } from 'lucide-react'
import { Card } from '../ui/Card'
import { categoryData } from '../../data/mock'
import { useDashboardFilter } from '../../context/FilterContext'
import { useNavigate } from 'react-router-dom'

export function Insights() {
  const { activeFilter } = useDashboardFilter()
  const navigate = useNavigate()
  const highestCategory = categoryData.reduce((prev, current) => (prev.value > current.value) ? prev : current)

  return (
    <Card 
      className="mb-8 border relative overflow-hidden transition-all duration-300"
      style={{
        background: activeFilter ? `linear-gradient(to bottom right, #0f172a, ${activeFilter.color}15)` : 'linear-gradient(to bottom right, #0f172a, rgba(16, 185, 129, 0.05))',
        borderColor: activeFilter ? `${activeFilter.color}30` : 'rgba(16, 185, 129, 0.2)',
        boxShadow: activeFilter ? `0 0 30px ${activeFilter.color}10` : '0 0 30px rgba(16, 185, 129, 0.05)',
      }}
    >
      <div 
        className="absolute top-0 left-0 w-1 h-full transition-colors duration-300" 
        style={{ backgroundColor: activeFilter ? activeFilter.color : '#10b981' }}
      />
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
        Financial Insights
        {activeFilter && (
         <span className="text-xs font-normal px-2 py-1 flex items-center gap-1 rounded-md bg-black/20" style={{ color: activeFilter.color }}>
           <Target size={12} />
           Contextual Analysis
         </span> 
        )}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          onClick={() => navigate('/insights/savings')}
          whileHover={{ y: -2, scale: 1.02 }}
          className="flex items-start justify-between gap-3 bg-navy-950/50 p-4 rounded-xl border border-slate-800/50 backdrop-blur-sm cursor-pointer group hover:border-emerald-500/50 transition-colors"
          style={{ opacity: activeFilter && activeFilter.type !== 'card' ? 0.4 : 1 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: activeFilter ? `${activeFilter.color}15` : 'rgba(16, 185, 129, 0.1)', color: activeFilter ? activeFilter.color : '#34d399' }}>
              <Award size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">Savings Goal</p>
              <p className="text-xs text-slate-400 mt-1">You've saved 20% more than last month. Keep it up!</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-600 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
        </motion.div>

        <motion.div 
          onClick={() => navigate('/insights/spending')}
          whileHover={{ y: -2, scale: 1.02 }}
          className="flex items-start justify-between gap-3 bg-navy-950/50 p-4 rounded-xl border border-slate-800/50 backdrop-blur-sm cursor-pointer group hover:border-sky-500/50 transition-colors"
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg" style={{ backgroundColor: activeFilter ? `${activeFilter.color}15` : 'rgba(14, 165, 233, 0.1)', color: activeFilter ? activeFilter.color : '#38bdf8' }}>
              <TrendingUp size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-200 group-hover:text-sky-400 transition-colors">Top Spending</p>
              {activeFilter && activeFilter.type === 'category' ? (
                <p className="text-xs text-slate-400 mt-1">
                  <span className="text-white font-semibold" style={{ color: activeFilter.color }}>{activeFilter.value}</span> spending represents a significant portion of your budget.
                </p>
              ) : (
                <p className="text-xs text-slate-400 mt-1">
                  <span className="text-white font-semibold">{highestCategory.name}</span> is your highest expense category.
                </p>
              )}
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-600 group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
        </motion.div>

        <motion.div 
          onClick={() => navigate('/insights/bills')}
          whileHover={{ y: -2, scale: 1.02 }}
          className="flex items-start justify-between gap-3 bg-navy-950/50 p-4 rounded-xl border border-slate-800/50 backdrop-blur-sm cursor-pointer group hover:border-amber-500/50 transition-colors"
          style={{ opacity: activeFilter && activeFilter.type !== 'month' ? 0.4 : 1 }}
        >
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg" style={{ backgroundColor: activeFilter ? `${activeFilter.color}15` : 'rgba(245, 158, 11, 0.1)', color: activeFilter ? activeFilter.color : '#fbbf24' }}>
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 group-hover:text-amber-400 transition-colors">Upcoming Bills</p>
              <p className="text-xs text-slate-400 mt-1">You have 2 subscriptions renewing in the next 5 days.</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-600 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
        </motion.div>
      </div>
    </Card>
  )
}
