import { motion } from 'framer-motion'
import { Bell, Search, ShieldAlert } from 'lucide-react'

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export function Header({ isAdmin, setIsAdmin }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-20 flex justify-between items-center px-6 lg:px-8 border-b border-slate-800 bg-navy-950/80 backdrop-blur-md z-10 sticky top-0"
    >
      <div className="flex items-center flex-1">
        <div className="relative group w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..."
            className="w-full bg-navy-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-slate-200 placeholder-slate-500 shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Role Toggle */}
        <div className="flex items-center gap-1 bg-navy-900 p-1.5 rounded-full border border-slate-800">
          <button 
            onClick={() => setIsAdmin(false)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${!isAdmin ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'} relative`}
          >
            Viewer
          </button>
          <button 
            onClick={() => setIsAdmin(true)}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${isAdmin ? 'bg-primary text-navy-950 shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200'} relative`}
          >
            {isAdmin && <ShieldAlert size={12} />}
            Admin
          </button>
        </div>

        <div className="w-px h-6 bg-slate-800 mx-1"></div>

        <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors relative hover:bg-slate-800/50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-navy-950"></span>
        </button>
      </div>
    </motion.header>
  )
}
