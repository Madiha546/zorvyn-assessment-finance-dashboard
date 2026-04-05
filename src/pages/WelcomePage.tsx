import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei'

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-full bg-navy-950 flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#10b981" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1.5, 64, 64]}>
              <MeshDistortMaterial
                color="#0f172a"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                emissive="#10b981"
                emissiveIntensity={0.2}
              />
            </Sphere>
          </Float>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center pointer-events-auto"
        >
          <div className="inline-block mb-4 p-3 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tighter">
              FinDash
            </h1>
          </div>
          <p className="text-slate-300 text-lg md:text-xl max-w-md mx-auto mb-10 font-medium">
            Your finances, beautifully visualized. Control your wealth in a new dimension.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-navy-950 rounded-full font-bold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all cursor-pointer"
          >
            Enter Your Dashboard
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
