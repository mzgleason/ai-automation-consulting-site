"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type TunnelFieldData = {
  geometry: THREE.BufferGeometry;
};

function buildTunnelFieldData(majorSegments = 220, minorSegments = 62): TunnelFieldData {
  const count = majorSegments * minorSegments;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const seeds = new Float32Array(count);
  const majors = new Float32Array(count);
  const minors = new Float32Array(count);

  const majorRadius = 3.25;
  const tubeRadius = 1.18;

  let pointer = 0;

  for (let major = 0; major < majorSegments; major += 1) {
    const u = (major / majorSegments) * Math.PI * 2;

    for (let minor = 0; minor < minorSegments; minor += 1) {
      const v = (minor / minorSegments) * Math.PI * 2;

      // Store the raw torus point so the shader can re-project and animate it.
      const ringRadius = majorRadius + Math.cos(v) * tubeRadius;
      positions[pointer * 3] = Math.cos(u) * ringRadius;
      positions[pointer * 3 + 1] = Math.sin(v) * tubeRadius * 1.08;
      positions[pointer * 3 + 2] = Math.sin(u) * ringRadius;

      const contourWeight = 0.34 + Math.pow((Math.cos(v) + 1) * 0.5, 1.05) * 0.66;
      sizes[pointer] = 0.88 + contourWeight * 1.85;
      alphas[pointer] = 0.05 + contourWeight * 0.24;
      seeds[pointer] = Math.random() * 1000;
      majors[pointer] = u;
      minors[pointer] = v;
      pointer += 1;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aMajor", new THREE.BufferAttribute(majors, 1));
  geometry.setAttribute("aMinor", new THREE.BufferAttribute(minors, 1));

  return { geometry };
}

function HeroAtmosphere() {
  return (
    <mesh position={[0.6, 0.18, -2.35]} scale={[15.5, 9.6, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv - 0.5;
            uv.x *= 1.06;

            float mainGlow = smoothstep(0.88, 0.0, length(uv));
            float coreGlow = smoothstep(0.46, 0.0, length(uv * vec2(0.9, 1.05)));

            vec3 base = vec3(0.01, 0.03, 0.06);
            vec3 glow = vec3(0.05, 0.11, 0.16);
            vec3 color = mix(base, glow, coreGlow * 0.92 + mainGlow * 0.18);

            gl_FragColor = vec4(color, mainGlow * 0.24);
          }
        `}
      />
    </mesh>
  );
}

function HeroTextVeil() {
  return (
    <mesh position={[-2.55, 0.1, 0.5]} scale={[6.8, 6.2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;

          void main() {
            float fadeX = smoothstep(1.0, 0.12, vUv.x);
            float fadeY = smoothstep(1.0, 0.58, abs(vUv.y - 0.5) * 2.0);
            float alpha = fadeX * fadeY * 0.62;
            gl_FragColor = vec4(0.01, 0.03, 0.05, alpha);
          }
        `}
      />
    </mesh>
  );
}

function HeroTorusTunnel() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { geometry } = useMemo(() => buildTunnelFieldData(), []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#edf4f8") }
        },
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          attribute float aSeed;
          attribute float aMajor;
          attribute float aMinor;

          varying float vAlpha;
          varying float vDepthFade;
          uniform float uTime;

          float wrappedDistance(float angle) {
            return abs(atan(sin(angle), cos(angle)));
          }

          mat3 rotateX(float angle) {
            return mat3(
              1.0, 0.0, 0.0,
              0.0, cos(angle), -sin(angle),
              0.0, sin(angle), cos(angle)
            );
          }

          mat3 rotateY(float angle) {
            return mat3(
              cos(angle), 0.0, sin(angle),
              0.0, 1.0, 0.0,
              -sin(angle), 0.0, cos(angle)
            );
          }

          void main() {
            float majorRadius = 3.25;
            float spin = uTime * 0.075;
            float u = aMajor + spin;
            float v = aMinor;

            vec3 transformed = position;

            // Placement transform:
            // The torus is defined with the donut-hole center at the origin.
            // Translating by -R places the camera on the ring centerline, which
            // is exactly halfway between the inner and outer tube radii.
            transformed.x -= majorRadius;

            vec3 normalDir = normalize(vec3(cos(u) * cos(v), sin(v), sin(u) * cos(v)));
            float wave = sin(uTime * 0.52 + aMajor * 2.45 + aSeed * 0.01) * 0.038;
            float pulse = cos(uTime * 0.4 + aMinor * 1.7 + aSeed * 0.014) * 0.022;
            transformed += normalDir * (wave + pulse);

            // Only keep the forward interior slice so the full donut outline disappears.
            float majorDelta = wrappedDistance(u);
            float visibility = smoothstep(2.8, 1.48, majorDelta);

            // Framing transform:
            // Limit this to orientation plus a very small composition bias.
            transformed = rotateY(-0.28) * rotateX(0.18) * transformed;
            transformed.xy *= vec2(1.18, 1.03);
            transformed.x += 0.42;
            transformed.y += 0.015;
            transformed.z -= 0.65;

            vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float depthScale = 11.8 / max(1.0, -mvPosition.z);
            gl_PointSize = aSize * depthScale;
            vAlpha = aAlpha * visibility * (0.96 + wave * 0.65 + pulse * 0.4);
            vDepthFade = smoothstep(0.0, 9.0, -mvPosition.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          varying float vDepthFade;
          uniform vec3 uColor;

          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = dot(uv, uv);
            float alpha = smoothstep(0.25, 0.0, d) * vAlpha * vDepthFade;
            gl_FragColor = vec4(uColor, alpha);
            if (gl_FragColor.a < 0.01) discard;
          }
        `
      }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    if (pointsRef.current) {
      pointsRef.current.position.y = Math.sin(time * 0.09) * 0.025;
      pointsRef.current.rotation.z = Math.sin(time * 0.05) * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" ref={materialRef} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <HeroAtmosphere />
      <HeroTorusTunnel />
      <HeroTextVeil />
    </>
  );
}

export default function HeroProductionGlobe() {
  return (
    <div className="builder-hero-stage" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.9], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        className="builder-hero-dotfield"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
