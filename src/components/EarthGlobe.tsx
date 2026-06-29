import { useRef, Suspense, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Preload the texture so it starts downloading immediately
useTexture.preload("/images/earth-texture-hq.jpg");

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
  // Australia & Oceania
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: -37.8136, lng: 144.9631, label: "Melbourne" },
  { lat: -27.4698, lng: 153.0251, label: "Brisbane" },
  { lat: -31.9505, lng: 115.8605, label: "Perth" },
  { lat: -34.9285, lng: 138.6007, label: "Adelaide" },
  { lat: -41.2865, lng: 174.7762, label: "Wellington" },
  // Asia
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 22.3193, lng: 114.1694, label: "Hong Kong" },
  { lat: 37.5665, lng: 126.978, label: "Seoul" },
  { lat: 13.7563, lng: 100.5018, label: "Bangkok" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: 19.076, lng: 72.8777, label: "Mumbai" },
  // Europe
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 52.52, lng: 13.405, label: "Berlin" },
  { lat: 41.9028, lng: 12.4964, label: "Rome" },
  // Americas
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
  { lat: 43.6532, lng: -79.3832, label: "Toronto" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  { lat: 19.4326, lng: -99.1332, label: "Mexico City" },
  // Africa
  { lat: -33.9249, lng: 18.4241, label: "Cape Town" },
  { lat: 30.0444, lng: 31.2357, label: "Cairo" },
];

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

const PulsingPin = ({ lat, lng, color, delay, label }: { lat: number; lng: number; color: string; delay: number; label: string }) => {
  const pinRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => latLngToPos(lat, lng, 2.43), [lat, lng]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    const pulse = 1 + 0.4 * Math.sin(t * 2.5);
    if (pulseRef.current) {
      pulseRef.current.scale.setScalar(pulse);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 - 0.4 * Math.sin(t * 2.5);
    }
  });

  return (
    <group
      ref={pinRef}
      position={pos}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
    >
      {/* Invisible larger hit area */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[hovered ? 0.05 : 0.035, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={pulseRef}>
        <ringGeometry args={[0.04, 0.07, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* Vertical beam */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.2, 8]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.4} />
      </mesh>
      {/* Top glow */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
      {/* Tooltip */}
      {hovered && (
        <Html position={[0, 0.35, 0]} center distanceFactor={5} zIndexRange={[100, 0]}>
          <div
            className="pointer-events-none px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shadow-lg"
            style={{
              background: color,
              color: color === "#FBBC04" ? "#1a1a1a" : "#ffffff",
              transform: "translateY(-4px)",
            }}
          >
            {label}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45"
              style={{ background: color }}
            />
          </div>
        </Html>
      )}
    </group>
  );
};

// Curved arc connection line between two points on the globe
const CONNECTION_PAIRS = [
  [0, 6],   // Sydney → Tokyo
  [0, 7],   // Sydney → Singapore
  [1, 8],   // Melbourne → Hong Kong
  [2, 10],  // Brisbane → Bangkok
  [3, 11],  // Perth → Dubai
  [5, 9],   // Wellington → Seoul
  [6, 13],  // Tokyo → London
  [7, 12],  // Singapore → Mumbai
  [8, 14],  // Hong Kong → Paris
  [11, 22], // Dubai → Cairo
  [13, 17], // London → New York
  [14, 15], // Paris → Berlin
  [17, 18], // New York → Los Angeles
  [17, 19], // New York → Toronto
  [18, 21], // Los Angeles → Mexico City
  [20, 17], // São Paulo → New York
  [12, 11], // Mumbai → Dubai
  [9, 6],   // Seoul → Tokyo
  [15, 16], // Berlin → Rome
  [22, 11], // Cairo → Dubai
];

const ArcLine = ({ from, to, color, delay }: { from: { lat: number; lng: number }; to: { lat: number; lng: number }; color: string; delay: number }) => {
  const lineRef = useRef<THREE.Line>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...latLngToPos(from.lat, from.lng, 2.44));
    const end = new THREE.Vector3(...latLngToPos(to.lat, to.lng, 2.44));
    
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(2.44 + dist * 0.18);
    
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to]);

  const geometry = useMemo(() => {
    const points = curve.getPoints(40);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay;
    if (lineRef.current) {
      const opacity = 0.15 + 0.1 * Math.sin(t * 1.5);
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = opacity;
    }
    // Traveling dot
    if (dotRef.current) {
      const progress = ((t * 0.25) % 1); // loops 0→1
      const pos = curve.getPoint(progress);
      dotRef.current.position.copy(pos);
      (dotRef.current.material as THREE.MeshBasicMaterial).opacity = 0.9;
    }
    // Trail dot (slightly behind)
    if (trailRef.current) {
      const progress = (((t * 0.25) - 0.04) % 1 + 1) % 1;
      const pos = curve.getPoint(progress);
      trailRef.current.position.copy(pos);
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4;
    }
  });

  return (
    <group>
      {/* @ts-ignore - line primitive works fine */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.2} depthWrite={false} />
      </line>
      {/* Traveling dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} depthWrite={false} />
      </mesh>
      {/* Trail dot */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.016, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} />
      </mesh>
    </group>
  );
};

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, "/images/earth-texture-hq.jpg");

  // Make texture brighter
  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.03;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07;
    }
  });

  // Rotate group so Australia faces camera initially (matching reference screenshot)
  const initialRotation = useMemo(() => {
    // Center on ~235°E longitude (shifted slightly more right)
    const yRot = -(235 + 180) * (Math.PI / 180);
    return [0.3, yRot, 0.05] as [number, number, number];
  }, []);

  return (
    <group ref={groupRef} rotation={initialRotation}>
      {/* Atmosphere glow */}
      <mesh scale={[2.55, 2.55, 2.55]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#4285F4" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {/* Outer atmosphere */}
      <mesh scale={[2.7, 2.7, 2.7]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#88bbff" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {/* Earth */}
      <mesh ref={meshRef} scale={[2.4, 2.4, 2.4]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} metalness={0.05} roughness={0.5} emissive="#223355" emissiveIntensity={0.15} />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef} scale={[2.43, 2.43, 2.43]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial transparent opacity={0.12} color="#ffffff" depthWrite={false} />
      </mesh>

      {/* Connection arc lines */}
      {CONNECTION_PAIRS.map(([fromIdx, toIdx], i) => (
        <ArcLine
          key={`arc-${fromIdx}-${toIdx}`}
          from={PIN_LOCATIONS[fromIdx]}
          to={PIN_LOCATIONS[toIdx]}
          color={GOOGLE_COLORS[i % 4]}
          delay={i * 0.3}
        />
      ))}

      {/* Pulsing Google Maps pins */}
      {PIN_LOCATIONS.map((loc, i) => (
        <PulsingPin
          key={loc.label}
          lat={loc.lat}
          lng={loc.lng}
          color={GOOGLE_COLORS[i % 4]}
          delay={i * 0.5}
          label={loc.label}
        />
      ))}
    </group>
  );
};

const GlobeLoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center relative">
    {/* Pulsing globe silhouette */}
    <div className="relative">
      <div
        className="w-48 h-48 sm:w-64 sm:h-64 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 35%, #1a3a5c 0%, #0a1628 60%, #060918 100%)",
          boxShadow: "0 0 60px 10px rgba(66, 133, 244, 0.15), inset 0 0 40px rgba(66, 133, 244, 0.1)",
          animation: "pulse 2s ease-in-out infinite",
        }}
      />
      {/* Animated ring */}
      <div
        className="absolute inset-0 rounded-full border border-google-blue/20"
        style={{ animation: "pulse 2s ease-in-out 0.5s infinite" }}
      />
      <div
        className="absolute -inset-3 rounded-full border border-google-blue/10"
        style={{ animation: "pulse 2s ease-in-out 1s infinite" }}
      />
      {/* Spinner overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-google-blue/30 border-t-google-blue rounded-full animate-spin" />
      </div>
    </div>
  </div>
);

// Earth radius in scene units (matches Earth mesh scale 2.4)
const EARTH_RADIUS = 2.4;

// Auto-frame camera so the earth always fully fits within the viewport,
// regardless of aspect ratio. Uses both vertical and horizontal FOV.
const ResponsiveCamera = ({ isMobile }: { isMobile: boolean }) => {
  const { camera, size } = useThree();

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(size.height, 1);

    // Base vertical FOV — slightly wider on mobile for a softer frame
    const baseFov = isMobile ? 48 : 42;
    perspective.fov = baseFov;
    perspective.aspect = aspect;

    // Compute the distance required so the earth (plus a margin) fits
    // both vertically and horizontally.
    const margin = isMobile ? 1.18 : 1.25; // extra room around the globe
    const target = EARTH_RADIUS * margin;

    const vFov = (perspective.fov * Math.PI) / 180;
    const distV = target / Math.tan(vFov / 2);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const distH = target / Math.tan(hFov / 2);

    const distance = Math.max(distV, distH);
    perspective.position.set(0, 0, distance);
    perspective.lookAt(0, 0, 0);
    perspective.updateProjectionMatrix();
  }, [camera, size.width, size.height, isMobile]);

  return null;
};

const EarthGlobe = () => {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100%", touchAction: "pan-y", background: "transparent" }}
      className="relative overflow-visible"
    >
      {!ready && (
        <div className="absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none">
          <GlobeLoadingFallback />
        </div>
      )}
      <div
        className="w-full h-full transition-opacity duration-700 overflow-visible"
        style={{
          opacity: ready ? 1 : 0,
          touchAction: "pan-y",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
          style={{ background: "transparent", touchAction: "pan-y", display: "block", width: "100%", height: "100%" }}
          onCreated={() => {
            setTimeout(() => setReady(true), 300);
          }}
        >
          <ResponsiveCamera isMobile={isMobile} />
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-3, -1, -3]} intensity={0.8} color="#6699ff" />
          <pointLight position={[0, 5, 3]} intensity={1} color="#ffffff" />
          <Suspense fallback={null}>
            <Earth />
            <Stars radius={100} depth={50} count={1500} factor={3} fade speed={1} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            enableRotate
            rotateSpeed={isMobile ? 0.35 : 0.5}
            enableDamping
            dampingFactor={0.1}
            target={[0, 0, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default EarthGlobe;
