// ============================================================================
// FILE: index.tsx
// MODULE: Home
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react"; // Using professional icons

/**
 * HOME HERO SECTION (Frontend Module)
 * 
 * This component handles the landing intro using a complex integration of
 * GSAP for DOM animations and Three.js for a high-end 3D visual background.
 * It strictly fetches its data from its corresponding backend module.
 */
export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);

  // Fetch real data from corresponding backend module
  useEffect(() => {
    fetch("/api/home/sections/hero")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load hero data:", err));
  }, []);

  // Complex GSAP Intro Animation
  useEffect(() => {
    if (!data) return; // Wait for data to load before animating

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(".hero-title", { y: 50, opacity: 0, duration: 0.8, ease: "power4.out", stagger: 0.2 }, "-=0.3")
        .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(".hero-cta", { scale: 0.9, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  if (!data) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* 3D Background - Sabse mushkil rasta using Three.js */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
          </Sphere>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Ticker Notifications from the DB/Backend */}
        <div className="hero-badge flex gap-3 text-sm font-medium bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="text-blue-200">Latest:</span>
          <span>{data.notifications[0].text}</span>
        </div>

        <h1 ref={textRef} className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-6">
          {data.title}
        </h1>
        
        <p className="hero-subtitle text-lg md:text-2xl text-zinc-400 max-w-3xl mb-10">
          {data.subtitle}
        </p>

        <div className="hero-cta flex gap-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-full font-bold transition-all border border-zinc-700">
            View Notifications
          </button>
        </div>
      </div>
    </section>
  );
}
