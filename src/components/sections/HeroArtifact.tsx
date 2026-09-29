"use client";

import { useEffect, useRef, useState } from "react";
// Type-only: erased at compile, zero runtime cost. The VALUE comes from
// the dynamic import inside the effect (async chunk, never First Load).
import type * as THREE from "three";

/**
 * HeroArtifact — a small verification shield in WebGL.
 *
 * A shield + checkmark is the shape of "tested and passed": the one
 * QA idea that reads instantly without a word of copy. It carries NO
 * text, NO status, NO numbers — it is decorative symbolism, so it can
 * never imply a live system or a fabricated result.
 *
 * Cost control (this is the expensive item on the page, honestly):
 * - vanilla three.js only — no @react-three/fiber, no drei. ~150KB
 *   gzip in an async chunk, loaded AFTER the page is interactive.
 * - Renders only on fine pointers without reduced motion and with
 *   WebGL available. Everyone else keeps the static SVG fallback,
 *   which is also what server-rendering and no-JS users see.
 * - The RAF loop pauses when the tab is hidden or the artifact is
 *   offscreen. Pixel ratio capped at 1.75. No shadow maps — the
 *   contact shadow is a CSS ellipse.
 * - LCP is untouched: the h1 is text, the canvas mounts late with
 *   explicit dimensions (no CLS).
 */
export function HeroArtifact() {
  // Dedicated mount node: the canvas must NOT live inside the fallback
  // div, which gets display:none once WebGL starts.
  const mountRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Gate 1: pointer + motion preference. Gate 2 (below): WebGL.
    if (!finePointer || reduced) return;

    const probe = document.createElement("canvas");
    const hasGL =
      !!probe.getContext("webgl2") || !!probe.getContext("webgl");
    if (!hasGL) return;

    let cancelled = false;
    let dispose: (() => void) | null = null;

    import("three")
      .then((THREE) => {
        if (cancelled || !mount) return;

        const css = (name: string) =>
          getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim();

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
        camera.position.set(0, 0.15, 6.2);

        // Light source top-left, matching the neumorphic convention.
        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(-4, 5, 6);
        const rim = new THREE.DirectionalLight(0xbfd0ff, 0.9);
        rim.position.set(4, -1, -4);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x8a97ad, 0.85));
        scene.add(key, rim);

        const group = new THREE.Group();
        scene.add(group);

        // Shield body: extruded 2D profile, softly beveled.
        const s = new THREE.Shape();
        s.moveTo(-1, 0.9);
        s.lineTo(1, 0.9);
        s.lineTo(1, -0.1);
        s.bezierCurveTo(1, -0.9, 0.45, -1.25, 0, -1.5);
        s.bezierCurveTo(-0.45, -1.25, -1, -0.9, -1, -0.1);
        s.lineTo(-1, 0.9);
        const shieldGeo = new THREE.ExtrudeGeometry(s, {
          depth: 0.35,
          bevelEnabled: true,
          bevelThickness: 0.06,
          bevelSize: 0.06,
          bevelSegments: 3,
          curveSegments: 24,
        });
        shieldGeo.center();
        const shieldMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(css("--nm-raised") || "#eaeef5"),
          roughness: 0.35,
          metalness: 0.15,
        });
        group.add(new THREE.Mesh(shieldGeo, shieldMat));

        // Checkmark: two straight tube segments (sharp corner kept via
        // CurvePath, not CatmullRom) with sphere caps, embedded
        // slightly into the shield face so nothing floats.
        const p1 = new THREE.Vector3(-0.5, -0.02, 0);
        const p2 = new THREE.Vector3(-0.12, -0.38, 0);
        const p3 = new THREE.Vector3(0.55, 0.38, 0);
        const path = new THREE.CurvePath<THREE.Vector3>();
        path.add(new THREE.LineCurve3(p1, p2));
        path.add(new THREE.LineCurve3(p2, p3));
        const CHECK_R = 0.085;
        const checkGeo = new THREE.TubeGeometry(path, 32, CHECK_R, 12, false);
        const checkMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(css("--nm-accent") || "#2f4bc4"),
          roughness: 0.3,
          metalness: 0.2,
          emissive: new THREE.Color(css("--nm-accent") || "#2f4bc4"),
          emissiveIntensity: 0.12,
        });
        const check = new THREE.Group();
        check.add(new THREE.Mesh(checkGeo, checkMat));
        for (const p of [p1, p3]) {
          const cap = new THREE.Mesh(
            new THREE.SphereGeometry(CHECK_R, 12, 12),
            checkMat,
          );
          cap.position.copy(p);
          check.add(cap);
        }
        check.position.z = 0.27;
        group.add(check);

        // Theme changes re-tint the materials from the live tokens, so
        // a future palette swap flows through automatically.
        const retint = () => {
          shieldMat.color.set(css("--nm-raised") || "#eaeef5");
          const accent = new THREE.Color(css("--nm-accent") || "#2f4bc4");
          checkMat.color.copy(accent);
          checkMat.emissive.copy(accent);
        };
        const themeWatcher = new MutationObserver(retint);
        themeWatcher.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });

        const size = () => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          if (w === 0 || h === 0) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        size();
        mount.appendChild(renderer.domElement);
        const resizer = new ResizeObserver(size);
        resizer.observe(mount);

        // Pointer parallax + idle drift, eased toward targets. The loop
        // runs only while the tab is visible AND the artifact is on
        // screen — otherwise it is a battery drain for nothing.
        let raf = 0;
        let visible = true;
        let tRX = 0;
        let tRY = 0;
        const onMove = (e: PointerEvent) => {
          const r = mount.getBoundingClientRect();
          tRY = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
          tRX = -((e.clientY - r.top) / r.height - 0.5) * 0.3;
        };
        const visibility = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) loop();
          },
          { threshold: 0 },
        );
        visibility.observe(mount);
        window.addEventListener("pointermove", onMove, { passive: true });

        const clock = new THREE.Clock();
        const loop = () => {
          if (cancelled) return;
          if (document.hidden || !visible) {
            raf = 0;
            return;
          }
          raf = requestAnimationFrame(loop);
          const t = clock.getElapsedTime();
          group.position.y = Math.sin(t * 1.1) * 0.07;
          group.rotation.y +=
            (tRY + Math.sin(t * 0.4) * 0.08 - group.rotation.y) * 0.06;
          group.rotation.x += (tRX - group.rotation.x) * 0.06;
          renderer.render(scene, camera);
        };
        loop();

        const onVis = () => {
          if (!document.hidden && visible && raf === 0) loop();
        };
        document.addEventListener("visibilitychange", onVis);

        setWebgl(true);
        dispose = () => {
          cancelAnimationFrame(raf);
          document.removeEventListener("visibilitychange", onVis);
          window.removeEventListener("pointermove", onMove);
          themeWatcher.disconnect();
          visibility.disconnect();
          resizer.disconnect();
          scene.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.geometry.dispose();
              const m = mesh.material as THREE.Material;
              m.dispose();
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        /* three.js failed: the SVG fallback simply stays. */
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[300px] select-none lg:max-w-[340px]"
    >
      {/* Canvas mount: empty until three.js appends the canvas. */}
      <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
      {/* Static fallback: server-rendered, always present. Hidden only
          when the WebGL canvas successfully mounts. */}
      <div
        className="absolute inset-0 grid place-items-center"
        style={webgl ? { display: "none" } : undefined}
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
          className="text-accent"
        >
          <path
            d="M32 4 54 11v16c0 14-9.5 24.5-22 29C19.5 51.5 10 41 10 27V11z"
            strokeWidth="3"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="m22 32 7 7 13-15"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* CSS contact shadow: cheaper than shadow maps, same read. */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-full bg-black/15 blur-md dark:bg-black/50"
      />
    </div>
  );
}
