import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Canvas } from '@react-three/fiber'
import { StarBackground } from '../ui/StarBackground'

export function DashboardLayout() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="flex h-screen bg-navy-950 overflow-hidden text-slate-200 selection:bg-accent-purple/30 relative">
      
      {/* Shared 3D Particle Starfield injected into standalone Dashboard Views */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <Canvas camera={{ position: [0, 0, 9] }}>
          <StarBackground />
        </Canvas>
      </div>

      {/* Replaced fully opaque backdrop with translucent layered glass so Canvas elements bleed through */}
      <div className="flex-1 flex w-full relative z-10 bg-navy-950/20">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden relative border-t border-slate-800/50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none z-0" />
          
          <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 z-10 scroll-smooth custom-scrollbar">
            <Outlet context={{ isAdmin }} />
          </main>
        </div>
      </div>
    </div>
  )
}
