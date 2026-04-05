import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Receipt, PieChart, Settings, WalletCards, LineChart, Target, PiggyBank, FileText } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { ReactNode } from "react"

export function Sidebar() {
  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden md:flex flex-col w-64 bg-navy-900/30 backdrop-blur-xl border-r border-slate-800/50 h-full p-4 relative z-20"
    >
      <div className="flex items-center gap-3 px-2 mb-10 pt-4">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-navy-950 font-bold shadow-lg shadow-emerald-500/20">
          <WalletCards size={20} />
        </div>
        <span className="text-xl font-semibold text-white tracking-tight">FinDash</span>
      </div>

      <nav className="flex flex-col gap-2 relative">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/transactions" icon={<Receipt size={20} />} label="Transactions" />
        <NavItem to="/insights" icon={<PieChart size={20} />} label="Insights" />
        <NavItem to="/analytics" icon={<LineChart size={20} />} label="Analytics" />
        <NavItem to="/budget" icon={<Target size={20} />} label="Budget Planning" />
        <NavItem to="/savings" icon={<PiggyBank size={20} />} label="Savings Goals" />
        <NavItem to="/reports" icon={<FileText size={20} />} label="Reports" />
        <div className="mt-8 mb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</div>
        {/* Settings is a dummy route linking back to dashboard for this MVP */}
        <NavItem to="/" icon={<Settings size={20} />} label="Preferences" />
      </nav>

      {/* Profile info at bottom */}
      <div className="mt-auto pt-4 border-t border-slate-800 flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold border border-slate-700">JS</div>
        <div>
          <p className="text-sm font-medium text-white">John Smith</p>
          <p className="text-xs text-slate-500">Free Plan</p>
        </div>
      </div>
    </motion.aside>
  )
}

function NavItem({ to, icon, label }: { to: string, icon: ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
        isActive ? "bg-primary/10 text-primary font-medium" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
      )}
    >
      {({ isActive }) => (
        <>
          {icon}
          <span>{label}</span>
          {isActive && (
            <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-8 bg-primary rounded-r-md ml-0" />
          )}
        </>
      )}
    </NavLink>
  )
}
