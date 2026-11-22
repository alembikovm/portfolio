"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, useGSAP } from "@/lib/gsap";

/** Shared, mutable target that ScrollTrigger writes and the render loop eases towards. */
const target = { x: 0.6, y: 0, opacity: 0 };

function Geodesic() {
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const pointMat = useRef<THREE.PointsMaterial>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);
  const { viewport } = useThree();

  const { wire, nodes } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(1.5, 2);
    const wire = new THREE.WireframeGeometry(ico);
    // De-duplicate vertices so each node is drawn once
    const pos = ico.getAttribute("position");
    const seen = new Set<string>();
    const pts: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const k = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`;
      if (!seen.has(k)) {
        seen.add(k);
        pts.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      }
    }
    const nodes = new THREE.BufferGeometry();
    nodes.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return { wire, nodes };
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.pow(0.002, dt); // frame-rate independent easing
    g.position.x += (target.x * (viewport.width / 2) - g.position.x) * k;
    g.position.y += (target.y * (viewport.height / 2) - g.position.y) * k;
    g.rotation.y += dt * 0.15;
    g.rotation.x += dt * 0.05;
    const o = target.opacity;
    if (lineMat.current) lineMat.current.opacity = 0.45 * o;
    if (pointMat.current) pointMat.current.opacity = 0.9 * o;
    if (coreMat.current) coreMat.current.opacity = o;
    g.visible = o > 0.01;
  });

  return (
    <group ref={group} scale={Math.min(0.62, viewport.width / 14)}>
      <lineSegments geometry={wire}>
        <lineBasicMaterial ref={lineMat} color="#5a615b" transparent />
      </lineSegments>
      <points geometry={nodes}>
        <pointsMaterial ref={pointMat} color="#6f8f78" size={0.09} sizeAttenuation transparent />
      </points>
      <mesh>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial ref={coreMat} color="#8d918e" emissive="#3c403d" roughness={0.4} metalness={0.1} transparent />
      </mesh>
      <pointLight position={[0.3, 0.2, 1.2]} intensity={3} color="#bfe3c9" />
    </group>
  );
}

/**
 * Fixed full-screen canvas (z-[1]) with a geodesic sphere that travels across
 * Motivation → Mindset → Experience. Sections with z-[2] backgrounds hide it.
 */
export default function Sphere() {
  useGSAP(() => {
    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "#motivation",
          start: "top 70%",
          endTrigger: "#experience",
          end: "bottom 30%",
          scrub: 1,
          refreshPriority: -1,
        },
      })
      .fromTo(target, { opacity: 0, x: 0.62, y: 0.05 }, { opacity: 1, duration: 0.3 })
      .to(target, { x: 0.15, y: -0.45, duration: 1 })
      .to(target, { x: -0.7, y: 0.05, duration: 1 })
      .to(target, { x: 0.55, y: -0.35, duration: 1.2 })
      .to(target, { opacity: 0, duration: 0.3 });
  });

  return (
    // R3F sets pointer-events:auto on its own wrapper; force it off so the fixed
    // full-screen canvas never swallows hovers and clicks meant for the page.
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] [&_*]:pointer-events-none!">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={0.6} />
        <Geodesic />
      </Canvas>
    </div>
  );
}
