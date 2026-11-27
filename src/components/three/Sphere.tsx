"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Shared, mutable target that ScrollTrigger writes and the render loop eases towards. */
/** Scroll progress 0..1 along the spiral, written by ScrollTrigger and read by the render loop. */
const target = { p: 0 };

/** Loops the logo makes over the page, and how far it swings from centre (fraction of half the viewport). */
const TURNS = 4;
const FADE = 0.03;

/** Point on a "breathing" spiral: the radius swells and shrinks so loops are not identical. */
function spiral(p: number) {
  const a = p * TURNS * Math.PI * 2 - Math.PI / 2;
  const r = 0.55 + 0.2 * Math.sin(p * Math.PI * 5);
  return { x: Math.cos(a) * r * 0.9, y: Math.sin(a) * r * 0.75 };
}

/** Ellipse in the XY plane, used as the path for one orbit tube. */
class Orbit extends THREE.Curve<THREE.Vector3> {
  constructor(private rx: number, private ry: number) {
    super();
  }
  getPoint(t: number, out = new THREE.Vector3()) {
    const a = t * Math.PI * 2;
    return out.set(Math.cos(a) * this.rx, Math.sin(a) * this.ry, 0);
  }
}

/** Logo units: the official SVG's orbit rx of 11 maps to 1.5 world units. */
const U = 1.5 / 11;
const orbit = new THREE.TubeGeometry(new Orbit(11 * U, 4.2 * U), 160, 0.07, 16, true);
/** One material for every part, so fading is a single opacity write. Module-level: this file is client-only. */
const mat = new THREE.MeshStandardMaterial({ color: "#8d918e", emissive: "#2e322f", roughness: 0.45, metalness: 0.15, transparent: true });

/** On-screen width of the logo in CSS pixels; phones get half of a quarter of the screen. */
const SIZE_PX = 180;
const MOBILE_MAX = 768;

/** The React atom, proportions from the official SVG (rx 11, ry 4.2, nucleus 2.05). */
function ReactLogo() {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const unit = viewport.width / size.width; // world units per CSS pixel
  const px = size.width < MOBILE_MAX ? Math.min(SIZE_PX, size.width * 0.25) / 2 : Math.min(SIZE_PX, size.width * 0.25);
  const scale = (px * unit) / (2 * 11 * U);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.pow(0.002, dt); // frame-rate independent easing
    const { x, y } = spiral(target.p);
    g.position.x += (x * (viewport.width / 2) - g.position.x) * k;
    g.position.y += (y * (viewport.height / 2) - g.position.y) * k;
    g.rotation.y += dt * 0.6;
    const o = Math.min(1, target.p / FADE, (1 - target.p) / FADE);
    mat.opacity = Math.max(0, o);
    g.visible = o > 0.01;
  });

  return (
    <group ref={group} scale={scale} rotation={[0.25, 0, -0.15]}>
      {[0, 60, 120].map((deg) => (
        <mesh key={deg} geometry={orbit} material={mat} rotation={[0, 0, THREE.MathUtils.degToRad(deg)]} />
      ))}
      <mesh material={mat}>
        <sphereGeometry args={[2.05 * U, 32, 32]} />
      </mesh>
      <pointLight position={[0.4, 0.3, 1.5]} intensity={3} color="#ffffff" />
    </group>
  );
}

/**
 * Fixed full-screen canvas above the sections (below the header) with a grey
 * 3D React logo that spirals across the screen as the page scrolls.
 */
export default function Sphere() {
  useGSAP(() => {
    // Spirals across the screen from the end of the hero down to Contact
    ScrollTrigger.create({
      trigger: "#statement",
      start: "top 80%",
      endTrigger: "#contact",
      end: "top 60%",
      refreshPriority: -1, // measure after the pinned sections
      onUpdate: (self) => {
        target.p = self.progress;
      },
    });
  });

  return (
    // R3F sets pointer-events:auto on its own wrapper; force it off so the fixed
    // full-screen canvas never swallows hovers and clicks meant for the page.
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 [&_*]:pointer-events-none!">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.6} />
        <ReactLogo />
      </Canvas>
    </div>
  );
}
