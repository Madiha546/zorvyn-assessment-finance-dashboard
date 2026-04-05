import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'

export function CursorParticles() {
  const sparklesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (sparklesRef.current) {
      const targetX = state.pointer.x * 4;
      const targetY = state.pointer.y * 4;
      sparklesRef.current.position.x = THREE.MathUtils.lerp(sparklesRef.current.position.x, targetX, 0.05);
      sparklesRef.current.position.y = THREE.MathUtils.lerp(sparklesRef.current.position.y, targetY, 0.05);
    }
  })

  return (
    <group ref={sparklesRef}>
      <Sparkles count={500} scale={20} size={2.5} speed={0.4} color="#10b981" opacity={0.6} />
      <Sparkles count={300} scale={15} size={3.5} speed={0.8} color="#8b5cf6" opacity={0.8} />
      <Sparkles count={200} scale={12} size={1.5} speed={1.2} color="#06b6d4" opacity={0.7} />
    </group>
  )
}

export function StarBackground() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={3.5} color="#10b981" />
      <directionalLight position={[-10, -10, -10]} intensity={3.5} color="#8b5cf6" />
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={1} fade speed={2} />
      <CursorParticles />
    </>
  )
}
