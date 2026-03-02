"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { TrackableButton } from "@/components/TrackableButton";

function PyramidCore() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const px = (state.pointer.x * Math.PI) / 8;
    const py = (state.pointer.y * Math.PI) / 10;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, t * 0.28 + px, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, py, 0.06);
      group.current.position.y = Math.sin(t * 1.2) * 0.08;
    }

    if (shell.current) {
      shell.current.rotation.y = -t * 0.36;
      shell.current.rotation.z = Math.sin(t * 0.8) * 0.16;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
        <mesh castShadow receiveShadow>
          <coneGeometry args={[1.08, 1.65, 4]} />
          <meshStandardMaterial
            color="#d7b381"
            emissive="#8a5c24"
            emissiveIntensity={0.44}
            roughness={0.24}
            metalness={0.72}
          />
        </mesh>
      </Float>

      <mesh ref={shell} scale={1.5}>
        <icosahedronGeometry args={[1.18, 1]} />
        <MeshDistortMaterial
          color="#9a6f3d"
          transparent
          opacity={0.22}
          distort={0.6}
          speed={1.7}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <ringGeometry args={[1.5, 2.1, 64]} />
        <meshStandardMaterial color="#ca9d63" emissive="#7f5220" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.32;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.18;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
        <torusGeometry args={[1.9, 0.02, 12, 120]} />
        <meshStandardMaterial color="#dbbe97" emissive="#845e34" emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.3, 0]} position={[0, -0.05, 0]}>
        <torusGeometry args={[2.3, 0.02, 12, 120]} />
        <meshStandardMaterial color="#b28b57" emissive="#704b26" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

export function PyramidHero3D() {
  return (
    <section className="pyramid-hero">
      <div className="container pyramid-grid">
        <div className="pyramid-copy reveal">
          <p className="eyebrow">Immersive Automation Design</p>
          <h1>Operational systems with a cinematic wow factor</h1>
          <p className="lead">
            Original interactive hero built from scratch: motion-reactive geometry, layered depth, and conversion-focused
            messaging for local SMB automation consulting.
          </p>
          <div className="hero-actions">
            <TrackableButton href="/book" label="Book Discovery Call" location="pyramid-hero-primary" />
            <TrackableButton href="/services" label="Explore Services" location="pyramid-hero-secondary" variant="ghost" />
          </div>
        </div>

        <div className="pyramid-stage reveal">
          <Canvas shadows camera={{ position: [0, 0.4, 4.6], fov: 50 }}>
            <Suspense fallback={null}>
              <color attach="background" args={["#0a0908"]} />
              <fog attach="fog" args={["#0a0908", 4, 12]} />
              <ambientLight intensity={0.35} />
              <directionalLight position={[3, 4, 2]} intensity={1.1} castShadow color="#ffd8a2" />
              <pointLight position={[-2.2, 1.4, -1.4]} intensity={1.5} color="#cb9a62" />
              <pointLight position={[2.4, -0.2, 2.3]} intensity={1.1} color="#7d5f40" />

              <Stars radius={35} depth={50} count={1400} factor={2.8} saturation={0} fade speed={1.2} />
              <OrbitRings />
              <PyramidCore />
              <Environment preset="warehouse" />
            </Suspense>
          </Canvas>

          <div className="stage-meta">
            <div>
              <p>Interaction</p>
              <span>Pointer + motion reactive</span>
            </div>
            <div>
              <p>Mode</p>
              <span>Pyramid signal core</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
