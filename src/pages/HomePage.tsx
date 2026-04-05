import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Float, Text3D, Center } from '@react-three/drei'
import { ChevronDown, Info } from 'lucide-react'
import * as THREE from 'three'

import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'
import { DashboardContent } from './DashboardContent'
import { StarBackground } from '../components/ui/StarBackground'

function AnimatedDollar({ scrollProg }: { scrollProg: any }) {
  const groupRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<any>(null!)

  useFrame((state) => {
    if (!groupRef.current || !materialRef.current) return

    // Extract precise isolated scroll progress specifically from the Top Section (Hero + AboutUs)
    const scroll = scrollProg.get() 
    
    // Slide from Right to Left over the course of the Hero -> About Us transition
    const slideProgress = Math.min(scroll * 2, 1);
    const startX = state.viewport.width / 4;
    const endX = -state.viewport.width / 4;
    const targetX = THREE.MathUtils.lerp(startX, endX, slideProgress);
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);

    // Coin-spin oscillation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.8;
    groupRef.current.rotation.x = 0;
    groupRef.current.rotation.z = 0;

    // Fade out as it completely finishes passing the About Us section before the Welcome Fly-Through starts
    let opacity = 1;
    if (scroll > 0.8) {
      opacity = 1 - ((scroll - 0.8) / 0.15); 
    }
    opacity = Math.max(0, Math.min(1, opacity));
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, opacity, 0.1);

    // Cursor Liquification Math
    const worldMouseX = state.pointer.x * (state.viewport.width / 2);
    const worldMouseY = state.pointer.y * (state.viewport.height / 2);
    
    const dist = Math.sqrt(
      Math.pow(worldMouseX - groupRef.current.position.x, 2) + 
      Math.pow(worldMouseY - groupRef.current.position.y, 2)
    );

    const interactionRadius = 3.5;
    const ptrIntensity = Math.max(0, 1 - (dist / interactionRadius));
    
    const targetDistort = 0.2 + (ptrIntensity * 1.2); 
    const targetSpeed = 1.0 + (ptrIntensity * 6.0);

    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.1);
  })

  return (
    <group ref={groupRef}>
      <Float speed={2.0} rotationIntensity={0} floatIntensity={0.5}>
        <Center>
          <Text3D 
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={3.5} 
            height={0.5} 
            curveSegments={32}
            bevelEnabled 
            bevelThickness={0.15} 
            bevelSize={0.08} 
            bevelSegments={16}
          >
            $
            <MeshDistortMaterial
              ref={materialRef}
              color="#10b981"
              attach="material"
              distort={0.4}
              speed={2.5}
              roughness={0.1}
              metalness={0.9}
              emissive="#059669"
              emissiveIntensity={0.6}
              transparent={true}
              opacity={1}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  )
}

export function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Create an explicit wrapper targeting the top phase so the Dollar Sign precisely tracks it regardless of extra page sections
  const topPhaseRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: topPhaseProg } = useScroll({ target: topPhaseRef, offset: ["start start", "end start"] })

  // HERO (Section 1)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(heroProg, [0, 0.7], [1, 0])
  const heroY = useTransform(heroProg, [0, 1], ["0%", "-40%"])

  // ABOUT US (Section 2)
  const aboutRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: aboutProg } = useScroll({ target: aboutRef, offset: ["start end", "end start"] })
  const aboutOpacity = useTransform(aboutProg, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
  const aboutY = useTransform(aboutProg, [0.2, 0.4], ["30%", "0%"])



  return (
    <div className="bg-navy-950 relative text-slate-200">
      
      {/* 3D UNIVERSAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        <Canvas camera={{ position: [0, 0, 9] }}>
          <StarBackground />
          <AnimatedDollar scrollProg={topPhaseProg} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Wrapping the Hero and About Us exactly so topPhaseProg reliably tracks 0 -> 1 physically */}
      <div ref={topPhaseRef}>
        {/* SECTION 1: HERO */}
        <div ref={heroRef} className="h-[150vh] relative z-10 pointer-events-none">
          <motion.div 
            style={{ opacity: heroOpacity, y: heroY }}
            className="sticky top-0 h-screen w-full flex flex-col justify-center items-start pointer-events-auto pl-8 md:pl-24 lg:pl-32 shadow-[inset_0_-100px_100px_-50px_rgba(2,6,23,1)]"
          >
            <div className="flex flex-col items-start text-left w-full md:w-1/2">
              <div className="inline-block mb-6 p-4 rounded-3xl bg-navy-950/60 border border-emerald-500/20 backdrop-blur-md shadow-[0_0_60px_rgba(16,185,129,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none rounded-3xl"></div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-accent-purple tracking-tighter drop-shadow-xl relative z-10">
                  FinDash
                </h1>
              </div>
              <p className="text-slate-300 text-lg md:text-xl font-medium drop-shadow-md mb-12 pl-2 border-l-2 border-emerald-500/50">
                Experience your wealth dynamically. Uncover trends.
              </p>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-emerald-400 opacity-80 mt-10 ml-6"
              >
                <ChevronDown size={48} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: ABOUT US */}
        <div ref={aboutRef} className="h-[150vh] relative z-10 pointer-events-none">
          <motion.div 
            style={{ opacity: aboutOpacity, y: aboutY }}
            className="sticky top-0 h-screen w-full flex flex-col justify-center items-end pointer-events-auto pr-8 md:pr-16 lg:pr-32"
          >
            <div className="max-w-2xl text-right flex flex-col items-end">
              <div className="inline-flex items-center justify-center p-4 bg-accent-purple/20 text-accent-purple rounded-full mb-8 relative">
                <div className="absolute inset-0 bg-accent-purple/40 blur-xl rounded-full"></div>
                <Info size={40} className="relative z-10" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">
                Reimagining <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-cyan-400">Finance</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed drop-shadow-md font-medium px-6 py-4 rounded-2xl bg-navy-950/40 backdrop-blur-sm border border-slate-800/50">
                We merge institutional-grade analytics with breathtaking design. Dive into automated insights, categorized transactions, and real-time balance trends seamlessly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>



      {/* SECTION 4: DASHBOARD LAYOUT */}
      <div className="relative z-20 w-full h-screen bg-navy-950/20 border-t border-slate-700/80 shadow-[0_-30px_90px_rgba(16,185,129,0.2)] rounded-t-[3rem] overflow-hidden pointer-events-auto selection:bg-accent-purple/30">
        <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-accent-purple/20 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/4 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
        
        <div className="flex h-screen w-full relative z-10">
          <Sidebar />
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
              <DashboardContent isAdmin={isAdmin} />
            </main>
          </div>
        </div>
      </div>

    </div>
  )
}
