"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type GlobeCanvasProps = {
  reducedMotion?: boolean;
  explode?: number;
  cut?: number;
};

type GlobeMeshProps = {
  reducedMotion?: boolean;
  explode: number;
  cut: number;
};

function GlobeMesh({ reducedMotion = false, explode = 0, cut = 0 }: GlobeMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.ShaderMaterial>(null);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  const points = useMemo(() => {
    const count = reducedMotion ? 220 : 420;
    const radius = 1.45;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }

    return arr;
  }, [reducedMotion]);

  const lineRings = useMemo(() => {
    const rings: THREE.Vector3[][] = [];
    const latitudes = [-0.9, -0.45, 0, 0.45, 0.9];

    latitudes.forEach((lat) => {
      const ring: THREE.Vector3[] = [];
      const y = Math.sin(lat) * 1.45;
      const r = Math.cos(lat) * 1.45;
      for (let i = 0; i <= 64; i += 1) {
        const a = (i / 64) * Math.PI * 2;
        ring.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      rings.push(ring);
    });

    return rings;
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.45, 1);
    return new THREE.EdgesGeometry(g);
  }, []);

  const pointsUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uExplode: { value: 0 },
      uCut: { value: 0 }
    }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.uniforms.uTime.value = t;
      pointsRef.current.uniforms.uExplode.value = explode;
      pointsRef.current.uniforms.uCut.value = cut;
    }

    if (lineMaterialRef.current) {
      const opacity = 0.34 + explode * 0.24 - cut * 0.1;
      lineMaterialRef.current.opacity = Math.max(0.16, Math.min(0.65, opacity));
    }

    if (reducedMotion) {
      groupRef.current.rotation.y = 0.15 + explode * 0.08;
      return;
    }

    groupRef.current.rotation.y = t * 0.14 + explode * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.08 + explode * 0.04;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial ref={lineMaterialRef} color="#0f1117" transparent opacity={0.35} />
      </lineSegments>

      {lineRings.map((ring, idx) => (
        <Line key={`ring-${idx}`} points={ring} color="#0c0f17" transparent opacity={0.24} lineWidth={1} />
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
            args={[points, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsRef}
          uniforms={pointsUniforms}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
          vertexShader={`
            uniform float uTime;
            uniform float uExplode;
            uniform float uCut;
            varying float vCutMask;
            varying float vAlpha;

            float smooth3(float x) {
              return x * x * (3.0 - 2.0 * x);
            }

            void main() {
              vec3 dir = normalize(position);
              float wave = sin((position.x * 2.8) + (position.y * 4.4) + (uTime * 2.0)) * 0.06;
              float burst = (0.65 + wave) * uExplode;
              vec3 displaced = position + (dir * burst);

              float cutBand = 1.0 - smoothstep(0.0, 0.35, abs(displaced.y * 0.8 + sin(displaced.x * 1.6) * 0.1));
              vCutMask = mix(1.0, 1.0 - cutBand, smooth3(uCut));
              vAlpha = mix(0.5, 0.82, uExplode);

              vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
              gl_PointSize = (2.6 + uExplode * 1.4) * (1.0 / max(0.25, -mvPosition.z * 0.22));
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying float vCutMask;
            varying float vAlpha;

            void main() {
              vec2 uv = gl_PointCoord - vec2(0.5);
              float dist = length(uv);
              if (dist > 0.5) discard;
              float falloff = smoothstep(0.5, 0.0, dist);
              float alpha = falloff * vAlpha * vCutMask;
              gl_FragColor = vec4(vec3(0.06, 0.09, 0.14), alpha);
            }
          `}
        />
      </points>
    </group>
  );
}

export default function GlobeCanvas({ reducedMotion = false, explode = 0, cut = 0 }: GlobeCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 44 }}
      className="h-full w-full"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 2, 4]} intensity={0.55} />
      <GlobeMesh reducedMotion={reducedMotion} explode={explode} cut={cut} />
    </Canvas>
  );
}