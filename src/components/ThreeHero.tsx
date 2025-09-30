import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Text, Float, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Particle system component
const Particles = () => {
  const ref = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 10;
      temp[i3 + 1] = (Math.random() - 0.5) * 10;
      temp[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1);
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.1);
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF6B35"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

// // Dragon shadow component
// const DragonShadow = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
//   const groupRef = useRef<THREE.Group>(null!);
//   const { viewport } = useThree();
  
//   useFrame(() => {
//     if (groupRef.current) {
//       // Convert mouse position to 3D coordinates
//       const x = (mousePosition.x / window.innerWidth) * 2 - 1;
//       const y = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
//       // Update dragon shadow position to follow mouse
//       groupRef.current.position.x = x * viewport.width * 0.5;
//       groupRef.current.position.y = y * viewport.height * 0.3;
//       groupRef.current.position.z = -2;
      
//       // Add subtle rotation based on mouse movement
//       groupRef.current.rotation.z = x * 0.2;
//       groupRef.current.rotation.y = y * 0.1;
//     }
//   });

//   // Create dragon-like shape using multiple geometries
//   return (
//     <group ref={groupRef}>
//       {/* Dragon body */}
//       <mesh position={[0, 0, 0]}>
//         <cylinderGeometry args={[0.3, 0.1, 2, 8]} />
//         <meshStandardMaterial 
//           color="#FF6B35" 
//           transparent 
//           opacity={0.3}
//           emissive="#F7931E"
//           emissiveIntensity={0.1}
//         />
//       </mesh>
      
//       {/* Dragon wings */}
//       <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
//         <coneGeometry args={[0.6, 1.2, 3]} />
//         <meshStandardMaterial 
//           color="#F7931E" 
//           transparent 
//           opacity={0.2}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
      
//       <mesh position={[0.8, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
//         <coneGeometry args={[0.6, 1.2, 3]} />
//         <meshStandardMaterial 
//           color="#F7931E" 
//           transparent 
//           opacity={0.2}
//           side={THREE.DoubleSide}
//         />
//       </mesh>
      
//       {/* Dragon head */}
//       <mesh position={[0, 0.8, 0]}>
//         <coneGeometry args={[0.2, 0.5, 6]} />
//         <meshStandardMaterial 
//           color="#FF6B35" 
//           transparent 
//           opacity={0.4}
//           emissive="#F7931E"
//           emissiveIntensity={0.2}
//         />
//       </mesh>
//     </group>
//   );
// };

// Floating geometry component
const FloatingGeometry = () => {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.5, 32, 32]} position={[2, 1, 0]}>
          <meshStandardMaterial color="#F7931E" wireframe />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2, -1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF6B35" transparent opacity={0.7} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[0, -2, -1]} rotation={[Math.PI / 4, 0, 0]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial 
            color="#F7931E" 
            transparent 
            opacity={0.8}
            emissive="#FF6B35"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
};

// Main 3D scene
const Scene = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FF6B35" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F7931E" />
      
      {/* Particles */}
      <Particles />
      
      {/* Floating elements */}
      <FloatingGeometry />
      
      {/* Dragon shadow */}
      {/* <DragonShadow mousePosition={mousePosition} /> */}
    </>
  );
};

interface ThreeHeroProps {
  className?: string;
}

const ThreeHero: React.FC<ThreeHeroProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />
    </motion.div>
  );
};

export default ThreeHero;