import { useEffect, useState } from 'react'
import { motion, type Variants, animate } from 'framer-motion'
import { GradientCard } from '../ui/Card'
import { useRealTimeSimulation } from '../../hooks/useRealTimeSimulation'
import { useDashboardFilter } from '../../context/FilterContext'

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState("0.00")
  
  useEffect(() => {
    // Start from wherever it currently is visually, to the new value smoothly
    const controls = animate(parseFloat(displayValue.replace(/,/g, '')), value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate(cur) {
        setDisplayValue(cur.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
      }
    })
    return controls.stop
  }, [value])

  return <span>${displayValue}</span>
}

export function SummaryCards() {
  const { summary } = useRealTimeSimulation()
  const { activeFilter, setFilter, clearFilter } = useDashboardFilter()

  const handleCardClick = (type: string, value: string, color: string, label: string) => {
    if (activeFilter?.type === type && activeFilter.value === value) {
      clearFilter();
    } else {
      setFilter({ type: type as any, value, color, label });
    }
  }

  // Calculate generic opacity multiplier
  const getFadingStyle = (myValue: string) => {
    if (!activeFilter) return { opacity: 1, filter: 'saturate(1)'};
    if (activeFilter.type === 'card' && activeFilter.value === myValue) return { opacity: 1, filter: 'saturate(1.2)'};
    return { opacity: 0.3, filter: 'saturate(0.2) brightness(0.8)' };
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <motion.div variants={item} style={getFadingStyle('balance')} className="transition-all duration-300">
        <GradientCard 
          title="Total Balance"
          value={<AnimatedNumber value={summary.totalBalance} />}
          change="↗ 2.4% vs last month"
          gradientFrom="#10b981"
          gradientTo="#0891b2"
          shadowColor="#10b981"
          delay={0.1}
          onClick={() => handleCardClick('card', 'balance', '#10b981', 'Balances')}
          isActive={activeFilter?.value === 'balance'}
        />
      </motion.div>

      <motion.div variants={item} style={getFadingStyle('income')} className="transition-all duration-300">
        <GradientCard 
          title="Monthly Income"
          value={<AnimatedNumber value={summary.monthlyIncome} />}
          change="↗ 1.2% vs last month"
          gradientFrom="#22c55e"
          gradientTo="#06b6d4"
          shadowColor="#22c55e"
          delay={0.2}
          onClick={() => handleCardClick('card', 'income', '#22c55e', 'Income Sources')}
          isActive={activeFilter?.value === 'income'}
        />
      </motion.div>

      <motion.div variants={item} style={getFadingStyle('expenses')} className="transition-all duration-300">
        <GradientCard 
          title="Monthly Expenses"
          value={<AnimatedNumber value={summary.monthlyExpenses} />}
          change="↘ 4.1% vs last month"
          gradientFrom="#ec4899"
          gradientTo="#a855f7"
          shadowColor="#ec4899"
          delay={0.3}
          onClick={() => handleCardClick('card', 'expenses', '#ec4899', 'Expenditures')}
          isActive={activeFilter?.value === 'expenses'}
        />
      </motion.div>

      <motion.div variants={item} style={getFadingStyle('savings')} className="transition-all duration-300">
        <GradientCard 
          title="Savings Goal"
          value={<AnimatedNumber value={3200.50} />} 
          change="★ 20% ahead of target"
          gradientFrom="#f59e0b"
          gradientTo="#f97316"
          shadowColor="#f59e0b"
          delay={0.4}
          onClick={() => handleCardClick('card', 'savings', '#f59e0b', 'Savings Tracker')}
          isActive={activeFilter?.value === 'savings'}
        />
      </motion.div>

    </motion.div>
  )
}
