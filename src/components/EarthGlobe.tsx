import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Convert lat/lng to 3D position on sphere
const latLngToPos = (lat: number, lng: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
};

const PIN_LOCATIONS = [
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
];

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

const PulsingPin = ({ lat, lng, color, delay }: { lat: number; lng: number; color: string; delay: number }) => {
  const pinRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLngToPos(lat, lng, 2.03), [lat, lng]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    // Pulsing scale
    const pulse = 1 + 0.4 * Math.sin(t * 2.5);
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(pulse);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 - 0.4 * Math.sin(t * 2.5);
    }
  });

  return (
    <group ref={pinRef} position={pos}>
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={pulseRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.04, 0.07, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* Vertical beam */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.2, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* Top glow */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, "/images/earth-texture.jpg");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group>
      {/* Atmosphere glow */}
      <mesh scale={[2.15, 2.15, 2.15]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#4285F4" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>

      {/* Earth */}
      <mesh ref={meshRef} scale={[2, 2, 2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={[2.02, 2.02, 2.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial transparent opacity={0.15} color="#ffffff" depthWrite={false} />
      </mesh>

      {/* Pulsing Google Maps pins at real city locations */}
      {PIN_LOCATIONS.map((loc, i) => (
        <PulsingPin
          key={loc.label}
          lat={loc.lat}
          lng={loc.lng}
          color={GOOGLE_COLORS[i % 4]}
          delay={i * 0.8}
        />
      ))}
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
          autoRotate
          autoRotateSpeed={0.5}
          enableRotate
          rotateSpeed={0.5}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
};

export default EarthGlobe;
