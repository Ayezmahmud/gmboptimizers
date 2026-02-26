import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/images/earth-texture.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.18;
    }
  });

  return (
    <group>
      {/* Atmosphere glow */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#4285F4"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Earth */}
      <mesh ref={meshRef} scale={[2, 2, 2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={[2.02, 2.02, 2.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          transparent
          opacity={0.15}
          color="#ffffff"
          depthWrite={false}
        />
      </mesh>

      {/* Google Maps pin markers - small glowing dots */}
      {[
        [0.3, 0.8, 1.7],
        [-1.2, 0.5, 1.3],
        [1.0, -0.3, 1.6],
        [-0.5, -0.7, 1.7],
        [1.5, 0.6, 1.0],
        [-1.0, 1.0, 1.2],
      ].map((pos, i) => {
        const colors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
        return (
          <mesh key={i} position={pos as [number, number, number]} scale={[0.04, 0.04, 0.04]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color={colors[i % 4]} />
          </mesh>
        );
      })}
    </group>
  );
};

const EarthGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -2, -3]} intensity={0.3} color="#4285F4" />
        <Suspense fallback={null}>
          <Earth />
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default EarthGlobe;
