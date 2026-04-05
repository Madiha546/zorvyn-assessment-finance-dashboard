import { Card } from '../ui/Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { categoryData, summaryData } from '../../data/mock'
import { useRealTimeSimulation } from '../../hooks/useRealTimeSimulation'
import { useDashboardFilter } from '../../context/FilterContext'

export function Charts() {
  const { history } = useRealTimeSimulation()
  const { activeFilter, setFilter, clearFilter } = useDashboardFilter()

  // Generate deterministic mapped graph subsets simulating filtered queries
  const displayHistory = !activeFilter || activeFilter.type === 'month' 
    ? history 
    : history.map((point) => {
        // Create deterministic scale factor (0.1 to 0.5) from string chars
        const charSeed = activeFilter.value.charCodeAt(0) || 5;
        const scale = (charSeed % 5 + 1) / 10;
        return {
          ...point,
          balance: activeFilter.type === 'card' && activeFilter.value === 'expenses' 
            ? point.balance * 0.6 
            : point.balance * scale
        }
      });

  // Dynamic Pie click handler
  const handlePieClick = (entry: any) => {
    if (activeFilter?.type === 'category' && activeFilter.value === entry.name) {
      clearFilter();
    } else {
      setFilter({
        type: 'category',
        value: entry.name,
        color: entry.color,
        label: entry.name
      });
    }
  }

  // Dynamic Line click handler 
  const handleLineClick = (payload: any) => {
    if (payload && payload.activePayload && payload.activePayload.length > 0) {
      const data = payload.activePayload[0].payload;
      if (activeFilter?.type === 'month' && activeFilter.value === data.name) {
        clearFilter();
      } else {
        setFilter({
          type: 'month',
          value: data.name,
          color: '#06b6d4',
          label: data.name
        });
      }
    }
  }

  // Visual logic for Pie Chart Segments
  const getPieSegmentStyle = (entryName: string) => {
    if (!activeFilter) return { opacity: 1, filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.3))' };
    if (activeFilter.type === 'category' && activeFilter.value === entryName) {
      return { 
        opacity: 1, 
        filter: `drop-shadow(0 0 15px ${activeFilter.color})`, 
        stroke: activeFilter.color, 
        strokeWidth: 2 
      };
    }
    return { opacity: 0.2, filter: 'grayscale(0.8)' };
  }

  // Visual logic for Line Chart Graphing
  const getLineGradient = () => {
    if (activeFilter) {
      return (
        <linearGradient id="gradientLine" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor={activeFilter.color} />
          <stop offset="100%" stopColor={activeFilter.color} />
        </linearGradient>
      );
    }
    return (
      <linearGradient id="gradientLine" x1="0" y1="0" x2="100%" y2="0">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      
      {/* 1. Line Chart: Live Historical Feed */}
      <div className={`transition-all duration-300 ${activeFilter && activeFilter.type === 'month' ? 'opacity-80 saturate-50' : ''}`}>
        <Card className="relative overflow-hidden group border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-between z-10 relative">
            Balance Trend
            <span className="text-xs font-normal text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full animate-pulse">Live</span>
          </h3>
          
          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayHistory} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} onClick={handleLineClick} style={{ cursor: 'pointer' }}>
                <defs>
                  {getLineGradient()}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.4} />
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: activeFilter ? activeFilter.color : '#10b981', fontWeight: 'bold' }}
                  cursor={{ stroke: activeFilter ? activeFilter.color : '#64748b', strokeWidth: 1, opacity: 0.5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="url(#gradientLine)" 
                  strokeWidth={activeFilter ? 4 : 3}
                  dot={{ r: 4, fill: '#0f172a', stroke: activeFilter ? activeFilter.color : '#06b6d4', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: activeFilter ? activeFilter.color : '#10b981', stroke: '#fff', strokeWidth: 2 }}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 2. Interactive Pie & Analytics */}
      <div className={`flex flex-col gap-6 transition-all duration-300 ${activeFilter && activeFilter.type !== 'category' ? 'opacity-80 saturate-50' : ''}`}>
        <Card className="h-full relative overflow-hidden flex flex-col justify-between group border border-slate-700/50 hover:border-purple-500/30 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2 z-10 relative">Spending Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Click a segment to filter transactions</p>

          <div className="flex-1 w-full relative flex items-center justify-center min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1000}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      onClick={() => handlePieClick(entry)}
                      className="transition-all duration-300 outline-none hover:scale-[1.05]"
                      style={{ 
                        cursor: 'pointer',
                        transformOrigin: 'center',
                        ...getPieSegmentStyle(entry.name)
                      }}
                    />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderColor: '#1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tighter">
                 ${summaryData.monthlyExpenses}
              </span>
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}
