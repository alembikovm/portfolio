"use client";

import dynamic from "next/dynamic";

/** Three.js is client-only and heavy; load it after hydration. */
export const SphereLoader = dynamic(() => import("./Sphere"), { ssr: false });
