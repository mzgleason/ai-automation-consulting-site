"use client";

import { RefObject, useEffect } from "react";
import * as THREE from "three";

type HeroGlobeProps = {
  heroRef: RefObject<HTMLElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  globeWrapRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

function fibonacciSpherePoints(count: number, radius: number) {
  const pts = new Float32Array(count * 3);
  const base = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const noise = new Float32Array(count);
  const rand = new Float32Array(count * 3);

  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const px = x * radius;
    const py = y * radius;
    const pz = z * radius;

    pts[i * 3] = px;
    pts[i * 3 + 1] = py;
    pts[i * 3 + 2] = pz;

    base[i * 3] = px;
    base[i * 3 + 1] = py;
    base[i * 3 + 2] = pz;

    sizes[i] = 0.195;
    noise[i] = Math.random();

    const rx = Math.random() * 2 - 1;
    const ry = Math.random() * 2 - 1;
    const rz = Math.random() * 2 - 1;
    const len = Math.sqrt(rx * rx + ry * ry + rz * rz) || 1;
    rand[i * 3] = rx / len;
    rand[i * 3 + 1] = ry / len;
    rand[i * 3 + 2] = rz / len;
  }

  return { positions: pts, basePositions: base, sizes, noise, rand };
}

export default function HeroGlobe({ heroRef, overlayRef, globeWrapRef, canvasRef }: HeroGlobeProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroEl = heroRef.current;
    const overlayEl = overlayRef.current;
    const globeWrapEl = globeWrapRef.current;
    if (!canvas || !heroEl || !overlayEl || !globeWrapEl) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const globeRadius = 1.18;
    const dotCount = 4800;
    const { positions, basePositions, sizes, noise, rand } = fibonacciSpherePoints(dotCount, globeRadius);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aBase", new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aNoise", new THREE.BufferAttribute(noise, 1));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));

    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const simPositions = positionAttr.array as Float32Array;
    const restPositions = basePositions;
    const velocities = new Float32Array(simPositions.length);

    const uniforms = {
      uScatter: { value: 0 },
      uScrollDissolve: { value: 0 },
      uOpacity: { value: 1 }
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        uniform float uScatter;
        uniform float uScrollDissolve;
        uniform float uOpacity;

        attribute vec3 aBase;
        attribute float aSize;
        attribute float aNoise;
        attribute vec3 aRand;

        varying float vAlpha;

        void main() {
          vec3 p = position;
          vec3 normal = normalize(aBase);

          float rnd = aNoise;
          p += aRand * (uScatter * (0.6 + rnd * 1.2));
          p += normal * (uScrollDissolve * (0.4 + rnd * 1.6));

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;

          gl_PointSize = aSize * (145.0 / -mv.z);
          vAlpha = (1.0 - (uScrollDissolve * 0.85)) * uOpacity;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vAlpha;

        void main() {
          vec2 uv = gl_PointCoord.xy - 0.5;
          float r = dot(uv, uv);
          float circle = smoothstep(0.25, 0.20, r);

          float alpha = circle * vAlpha;
          if(alpha < 0.01) discard;

          gl_FragColor = vec4(vec3(0.06), alpha);
        }
      `
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(1.82, 0.02, 0);
    scene.add(points);

    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();
    const mouseTargetLocal = new THREE.Vector3(999, 999, 999);
    let hasPointerInCanvas = false;
    let repelStrength = 0;
    let repelStrengthTarget = 0;

    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 32, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    sphereMesh.position.copy(points.position);
    sphereMesh.updateMatrixWorld(true);
    scene.add(sphereMesh);

    const setSize = () => {
      const rect = globeWrapEl.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    setSize();
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(globeWrapEl);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      hasPointerInCanvas = true;
      mouseNdc.set(x, y);
    };

    const onPointerLeave = () => {
      hasPointerInCanvas = false;
      repelStrengthTarget = 0;
    };

    let scatterTarget = 0;
    let canScatter = false;
    let scatterTimeout: ReturnType<typeof setTimeout> | null = null;

    const onPointerDown = (e: PointerEvent) => {
      const rect = overlayEl.getBoundingClientRect();
      const centerNdc = points.position.clone().project(camera);
      const centerX = ((centerNdc.x + 1) * 0.5) * rect.width + rect.left;
      const centerY = ((1 - centerNdc.y) * 0.5) * rect.height + rect.top;
      const activationRadius = Math.min(rect.width, rect.height) * 0.34;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      canScatter = dx * dx + dy * dy <= activationRadius * activationRadius;
      if (!canScatter) return;

      scatterTarget = 1;
      if (scatterTimeout) {
        clearTimeout(scatterTimeout);
      }
      scatterTimeout = setTimeout(() => {
        scatterTarget = 0;
      }, 220);
    };

    overlayEl.addEventListener("pointermove", onPointerMove);
    overlayEl.addEventListener("pointerleave", onPointerLeave);
    overlayEl.addEventListener("pointerdown", onPointerDown);

    const getHeroScrollProgress = () => {
      const rect = heroEl.getBoundingClientRect();
      return Math.min(Math.max(-rect.top / rect.height, 0), 1);
    };

    let last = performance.now();
    let rafId = 0;

    const repelRadius = globeRadius * 0.33;
    const repelRadiusSq = repelRadius * repelRadius;
    const repelForce = 64;
    const returnForce = 5.6;
    const dampingAt60Fps = 0.9;
    const maxDisplacement = globeRadius * 0.22;

    const animate = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      points.rotation.y += dt * 0.25;
      sphereMesh.rotation.copy(points.rotation);
      sphereMesh.updateMatrixWorld(true);

      if (hasPointerInCanvas) {
        raycaster.setFromCamera(mouseNdc, camera);
        const hit = raycaster.intersectObject(sphereMesh, false)[0];
        if (hit) {
          mouseTargetLocal.copy(points.worldToLocal(hit.point.clone()));
          repelStrengthTarget = 1;
        } else {
          repelStrengthTarget = 0;
        }
      } else {
        repelStrengthTarget = 0;
      }

      repelStrength += (repelStrengthTarget - repelStrength) * (1.0 - Math.pow(0.001, dt));

      const damping = Math.pow(dampingAt60Fps, dt * 60);

      for (let i = 0; i < simPositions.length; i += 3) {
        let px = simPositions[i];
        let py = simPositions[i + 1];
        let pz = simPositions[i + 2];

        let vx = velocities[i];
        let vy = velocities[i + 1];
        let vz = velocities[i + 2];

        const rx = restPositions[i];
        const ry = restPositions[i + 1];
        const rz = restPositions[i + 2];

        let fx = (rx - px) * returnForce;
        let fy = (ry - py) * returnForce;
        let fz = (rz - pz) * returnForce;

        if (repelStrength > 0.001) {
          const dx = px - mouseTargetLocal.x;
          const dy = py - mouseTargetLocal.y;
          const dz = pz - mouseTargetLocal.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < repelRadiusSq) {
            const dist = Math.sqrt(distSq) + 1e-5;
            const invDist = 1 / dist;
            const dirX = dx * invDist;
            const dirY = dy * invDist;
            const dirZ = dz * invDist;
            const t = Math.max(0, Math.min(1, 1 - dist / repelRadius));
            const falloff = t * t * (3 - 2 * t);
            const centerBoost = 1 + 1.8 * t;
            const force = repelForce * falloff * centerBoost * repelStrength;
            fx += dirX * force;
            fy += dirY * force;
            fz += dirZ * force;
          }
        }

        vx += fx * dt;
        vy += fy * dt;
        vz += fz * dt;

        vx *= damping;
        vy *= damping;
        vz *= damping;

        px += vx * dt;
        py += vy * dt;
        pz += vz * dt;

        const offX = px - rx;
        const offY = py - ry;
        const offZ = pz - rz;
        const offLenSq = offX * offX + offY * offY + offZ * offZ;
        const maxDisplacementSq = maxDisplacement * maxDisplacement;
        if (offLenSq > maxDisplacementSq) {
          const offLen = Math.sqrt(offLenSq) + 1e-5;
          const scale = maxDisplacement / offLen;
          px = rx + offX * scale;
          py = ry + offY * scale;
          pz = rz + offZ * scale;

          const nx = offX / offLen;
          const ny = offY / offLen;
          const nz = offZ / offLen;
          const radialVelocity = vx * nx + vy * ny + vz * nz;
          if (radialVelocity > 0) {
            vx -= nx * radialVelocity;
            vy -= ny * radialVelocity;
            vz -= nz * radialVelocity;
          }

          vx *= 0.65;
          vy *= 0.65;
          vz *= 0.65;
        }

        velocities[i] = vx;
        velocities[i + 1] = vy;
        velocities[i + 2] = vz;

        simPositions[i] = px;
        simPositions[i + 1] = py;
        simPositions[i + 2] = pz;
      }

      positionAttr.needsUpdate = true;

      uniforms.uScatter.value += (scatterTarget - uniforms.uScatter.value) * (1.0 - Math.pow(0.001, dt));

      const progress = getHeroScrollProgress();
      const dissolve = Math.max(0, (progress - 0.15) / 0.65);
      uniforms.uScrollDissolve.value += (dissolve - uniforms.uScrollDissolve.value) * (1.0 - Math.pow(0.001, dt));

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      overlayEl.removeEventListener("pointermove", onPointerMove);
      overlayEl.removeEventListener("pointerleave", onPointerLeave);
      overlayEl.removeEventListener("pointerdown", onPointerDown);
      if (scatterTimeout) {
        clearTimeout(scatterTimeout);
      }
      geometry.dispose();
      material.dispose();
      sphereMesh.geometry.dispose();
      (sphereMesh.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [canvasRef, globeWrapRef, heroRef, overlayRef]);

  return null;
}
