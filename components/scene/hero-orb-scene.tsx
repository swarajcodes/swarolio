"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Reads the live --accent CSS custom property so the orb recolors itself
// instantly when the Batman/Spiderman theme is toggled.
function useAccentColor() {
  const color = useRef(new THREE.Color("#dc2626"));

  useFrame(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    if (value) color.current.set(value);
  });

  return color;
}

function WireframeOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useThree((s) => s.pointer);
  const accent = useAccentColor();
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // A field of scattered points orbiting the core shape.
  const particlePositions = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.04;

    // Subtle parallax drift toward the cursor.
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      pointer.x * 0.4,
      0.03,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      pointer.y * 0.25,
      0.03,
    );

    if (materialRef.current) {
      materialRef.current.color.copy(accent.current);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial ref={materialRef} wireframe transparent opacity={0.55} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#888899" transparent opacity={0.5} />
      </points>
    </group>
  );
}

export default function HeroOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <WireframeOrb />
    </Canvas>
  );
}
