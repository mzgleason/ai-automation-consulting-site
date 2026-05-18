"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Outcome = "accept" | "reroute" | "reject";

type ParticleState = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  depthBand: number;
  outcome: Outcome;
  laneLock: number;
};

function RoutingFieldScene() {
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 860 : false;
  const particleCount = isMobile ? 84 : 180;
  const laneY = useMemo(() => [2.35, 0.82, -0.78, -2.55], []);
  const activeCountRef = useRef(0);

  const particles = useMemo<ParticleState[]>(() => {
    return Array.from({ length: particleCount }, () => {
      const r = Math.random();
      const outcome: Outcome = r < 0.7 ? "accept" : r < 0.9 ? "reroute" : "reject";
      const depthBand = Math.floor(Math.random() * 3);
      const x = -10.6 - Math.random() * 0.8;
      const laneTarget = outcome === "accept" ? laneY[0] : outcome === "reroute" ? laneY[2] : laneY[3] - 0.35;
      const y = laneTarget + (Math.random() - 0.5) * 0.08;

      return {
        x,
        y,
        z: depthBand === 0 ? -1.5 + Math.random() * 0.18 : depthBand === 1 ? -0.14 + Math.random() * 0.16 : 0.82 + Math.random() * 0.16,
        vx: 0.0105 + Math.random() * 0.0014,
        vy: (Math.random() - 0.5) * 0.00012,
        vz: (Math.random() - 0.5) * 0.00014,
        depthBand,
        outcome,
        laneLock: 0.88 + Math.random() * 0.1
      };
    });
  }, [laneY, particleCount]);

  const particlePositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const particleColors = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const pointsRef = useRef<THREE.Points>(null);
  const particleSprite = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.55, "rgba(255,255,255,0.92)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const ramp = Math.min(1, t / 3.8);
    activeCountRef.current = Math.floor(particleCount * ramp);

    camera.position.x = Math.sin(t * 0.038) * 0.035;
    camera.position.y = Math.sin(t * 0.051) * 0.03;
    camera.lookAt(0, 0, 0);

    const congestionA = { x: -2.4, y: 0.1, radius: 1.8, drag: 0.945 };
    const congestionB = { x: 1.4, y: -0.2, radius: 1.45, drag: 0.94 };

    for (let i = 0; i < particleCount; i += 1) {
      const idx = i * 3;
      if (i >= activeCountRef.current) {
        particlePositions[idx] = -1000;
        particlePositions[idx + 1] = -1000;
        particlePositions[idx + 2] = -1000;
        particleColors[idx] = 0;
        particleColors[idx + 1] = 0;
        particleColors[idx + 2] = 0;
        continue;
      }
      const p = particles[i];

      const laneTarget = p.outcome === "accept" ? laneY[0] : p.outcome === "reroute" ? laneY[2] : laneY[3] - 0.35;
      const preSplitTarget = p.outcome === "accept" ? 0.58 : p.outcome === "reroute" ? -0.16 : -0.9;

      let targetY: number;
      if (p.x < -2.2) {
        targetY = p.y * 0.985;
      } else if (p.x < 2.8) {
        targetY = preSplitTarget;
      } else if (p.x < 4.8) {
        targetY = THREE.MathUtils.lerp(preSplitTarget, laneTarget, THREE.MathUtils.smoothstep(p.x, 2.8, 4.8));
      } else {
        targetY = laneTarget;
      }

      const targetZ = p.depthBand === 0 ? -1.42 : p.depthBand === 1 ? -0.04 : 0.9;

      const cohesion = p.laneLock;
      const preBranchTighten = p.x > -1.4 && p.x < 3.8 ? 1.34 : 1;
      let steerY = (targetY - p.y) * (p.x < -2.2 ? 0.0075 : 0.0105) * cohesion * preBranchTighten;
      const steerZ = (targetZ - p.z) * 0.0065;

      const dxA = p.x - congestionA.x;
      const dyA = p.y - congestionA.y;
      const dA = Math.sqrt(dxA * dxA + dyA * dyA);
      if (dA < congestionA.radius) {
        const pressure = 1 - dA / congestionA.radius;
        p.vx *= congestionA.drag;
        steerY += (dyA / Math.max(dA, 0.001)) * pressure * 0.0025;
      }

      const dxB = p.x - congestionB.x;
      const dyB = p.y - congestionB.y;
      const dB = Math.sqrt(dxB * dxB + dyB * dyB);
      if (dB < congestionB.radius) {
        const pressure = 1 - dB / congestionB.radius;
        p.vx *= congestionB.drag;
        steerY += (dyB / Math.max(dB, 0.001)) * pressure * 0.0027;
      }

      const accel = p.outcome === "accept" ? 0.000075 : p.outcome === "reroute" ? 0.00006 : 0.000045;
      const branchBoost = p.x > 2.6 && p.outcome !== "reject" ? 0.00005 : 0;
      p.vx = THREE.MathUtils.clamp(p.vx + accel + branchBoost, 0.009, p.outcome === "accept" ? 0.045 : 0.038);
      p.vy = THREE.MathUtils.clamp(p.vy + steerY, -0.008, 0.008);
      p.vz = THREE.MathUtils.clamp(p.vz + steerZ, -0.005, 0.005);

      if (p.outcome === "reject" && p.x > 3.4) {
        p.vy -= 0.00125;
        p.vx *= 0.9975;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      const outOfBounds = p.x > 10.8 || p.y < -4.6 || p.y > 3.6 || p.z < -2.5 || p.z > 2.2;
      if (outOfBounds) {
        const r2 = Math.random();
        p.outcome = r2 < 0.7 ? "accept" : r2 < 0.9 ? "reroute" : "reject";
        p.x = -10.5 - Math.random() * 1.2;
        p.y = laneTarget + (Math.random() - 0.5) * 0.1;
        p.z = p.depthBand === 0 ? -1.5 + Math.random() * 0.18 : p.depthBand === 1 ? -0.14 + Math.random() * 0.16 : 0.82 + Math.random() * 0.16;
        p.vx = 0.0104 + Math.random() * 0.0012;
        p.vy = (Math.random() - 0.5) * 0.00014;
        p.vz = (Math.random() - 0.5) * 0.00012;
        p.laneLock = 0.88 + Math.random() * 0.1;
      }

      particlePositions[idx] = p.x;
      particlePositions[idx + 1] = p.y;
      particlePositions[idx + 2] = p.z;

      if (p.outcome === "accept") {
        particleColors[idx] = 0.77;
        particleColors[idx + 1] = 0.84;
        particleColors[idx + 2] = 0.75;
      } else if (p.outcome === "reroute") {
        particleColors[idx] = 0.48 + (p.depthBand === 2 ? 0.04 : 0);
        particleColors[idx + 1] = 0.6 + (p.depthBand === 2 ? 0.04 : 0);
        particleColors[idx + 2] = 0.9 + (p.depthBand === 2 ? 0.05 : 0);
      } else {
        particleColors[idx] = 0.86 + (p.depthBand === 2 ? 0.03 : 0);
        particleColors[idx + 1] = 0.36 + (p.depthBand === 2 ? 0.02 : 0);
        particleColors[idx + 2] = 0.36 + (p.depthBand === 2 ? 0.02 : 0);
      }

      if (p.x < -4.8) {
        const g = 0.76 + (p.depthBand === 2 ? 0.04 : 0);
        particleColors[idx] = g;
        particleColors[idx + 1] = g;
        particleColors[idx + 2] = g + 0.02;
      }
    }

    const geo = pointsRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (geo) {
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#000000", 8.9, 31]} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} count={particleCount} />
          <bufferAttribute attach="attributes-color" args={[particleColors, 3]} count={particleCount} />
        </bufferGeometry>
        <pointsMaterial
          size={0.171}
          map={particleSprite ?? undefined}
          alphaMap={particleSprite ?? undefined}
          vertexColors
          transparent
          alphaTest={0.05}
          opacity={0.68}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function RealtimeRoutingFieldHero() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 0, background: "#000", position: "relative" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(54% 50% at 58% 47%, rgba(14,22,30,0.18) 0%, rgba(0,0,0,0) 74%), radial-gradient(28% 28% at 13% 49%, rgba(255,255,255,0.035) 0%, rgba(0,0,0,0) 78%)"
        }}
      />
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.08} />
        <RoutingFieldScene />
      </Canvas>
    </div>
  );
}
