import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export function Card({ children, className, delay = 0, style }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "bg-navy-900 border border-slate-800 rounded-2xl shadow-lg p-6",
        className
      )}
      style={style}
    >
      {children}
    </motion.div>
  )
}

interface GradientCardProps {
  title: ReactNode;
  value: ReactNode;
  change: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  delay?: number;
  onClick?: () => void;
  isActive?: boolean;
}

export function GradientCard({ title, value, change, gradientFrom, gradientTo, shadowColor, delay = 0, onClick, isActive }: GradientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: `0 0 40px ${shadowColor}`,
        background: `linear-gradient(45deg, ${gradientTo}, ${gradientFrom})` 
      }}
      onClick={onClick}
      className={`p-6 rounded-2xl overflow-hidden relative group cursor-pointer border transition-transform duration-300 ${isActive ? 'border-l-4 scale-105' : 'border-transparent'}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: isActive ? `0 0 50px ${shadowColor}` : `0 8px 32px ${shadowColor}80`,
        borderColor: isActive ? gradientFrom : 'transparent',
        backgroundSize: "200% 200%",
        animation: "gradientShift 5s ease infinite"
      }}
    >
      {/* Animated gradient border simulation via pseudo-element overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ 
          background: `linear-gradient(45deg, ${gradientTo}, ${gradientFrom})`,
          zIndex: 0
        }} 
      />
      <div className="relative z-10 text-white">
        <h3 className="text-slate-100/80 font-medium mb-1 drop-shadow-sm">{title}</h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mt-2 tracking-tighter drop-shadow-md"
        >
          {value}
        </motion.div>
        <p className="text-sm font-semibold opacity-90 mt-3 drop-shadow-sm bg-black/10 inline-block px-2 py-1 rounded-md">
          {change}
        </p>
      </div>
    </motion.div>
  )
}
