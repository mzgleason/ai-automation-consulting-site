"use client";

import { RefObject, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number;
  phase: number;
  phaseSpeed: number;
};

type ParticleLineBackgroundProps = {
  hostRef: RefObject<HTMLElement | null>;
  interactiveRef?: RefObject<HTMLElement | null>;
};

export function ParticleLineBackground({ hostRef, interactiveRef }: ParticleLineBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let spawnAccumulator = 0;
    let animationFrameId = 0;
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    const createParticle = (): Particle => {
      const spawnFromTop = Math.random() < 0.5;
      const x = spawnFromTop ? Math.random() * width : 0;
      const y = spawnFromTop ? 0 : Math.random() * height;
      return createParticleAt(x, y);
    };

    const createParticleAt = (x: number, y: number): Particle => {
      // 120-150 degrees in a top-origin compass model, yielding down-right movement.
      const angleDeg = 120 + Math.random() * 30;
      const radians = (angleDeg * Math.PI) / 180;
      const dirX = Math.sin(radians);
      const dirY = -Math.cos(radians);

      const depth = 0.2 + Math.random() * 0.8;
      const speed = 0.55 + depth * 1.5;

      return {
        x,
        y,
        vx: dirX * speed,
        vy: dirY * speed,
        depth,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.018 + Math.random() * 0.02
      };
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      const desiredCount = Math.max(260, Math.floor((width + height) / 5));
      for (let index = 0; index < desiredCount; index += 1) {
        particles.push(createParticleAt(Math.random() * width, Math.random() * height));
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const interactiveHost = interactiveRef?.current;
      const targetNode = event.target as Node | null;
      if (interactiveHost && targetNode && interactiveHost.contains(targetNode)) {
        mouseX = null;
        mouseY = null;
        return;
      }
      const rect = host.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      spawnAccumulator += 1;
      const desiredCount = Math.max(260, Math.floor((width + height) / 5));
      if (particles.length < desiredCount || spawnAccumulator >= 2) {
        const spawnBatch = particles.length < desiredCount ? 6 : 3;
        for (let index = 0; index < spawnBatch; index += 1) {
          particles.push(createParticle());
        }
        spawnAccumulator = 0;
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.phase += particle.phaseSpeed;
        if (particle.phase > Math.PI * 2) particle.phase -= Math.PI * 2;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (mouseX !== null && mouseY !== null) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const eraseRadius = 42;
          if (dx * dx + dy * dy <= eraseRadius * eraseRadius) {
            particles.splice(index, 1);
            continue;
          }
        }

        const depthOscillation = (Math.sin(particle.phase) + 1) * 0.5;
        const alpha = 0.16 + particle.depth * 0.56 + depthOscillation * 0.22;
        const size = 1 + particle.depth * 2.3 + depthOscillation * 0.85;
        context.fillStyle = `rgba(17, 20, 26, ${alpha})`;
        context.fillRect(particle.x, particle.y, size, size);

        if (particle.x > width + 3 || particle.y > height + 3) {
          particles.splice(index, 1);
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);

    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [hostRef, interactiveRef]);

  return <canvas ref={canvasRef} className="my-focus-particle-layer" aria-hidden="true" />;
}
