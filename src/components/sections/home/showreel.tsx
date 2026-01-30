"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { useLoading } from "@/context/loading-context"; // Loading Context Importu
import { cn } from "@/lib/utils/cn";

// --- YEREL GSAP IMPORTLARI ---
import gsapCore from "@/plugins/gsap";
import { ScrollTrigger } from "@/plugins/gsap/ScrollTrigger";

// --- TYPESCRIPT TANIMLAMALARI ---
interface GSAP {
  registerPlugin(...args: unknown[]): void;
  fromTo(target: unknown, fromVars: unknown, toVars: unknown): GSAPAnimation;
  context(
    func: () => void | (() => void),
    scope?: unknown,
  ): { revert: () => void };
}

interface GSAPAnimation {
  kill(): void;
}

const gsap = gsapCore as unknown as GSAP;

export default function Showreel() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Loading Durumu ve Görünürlük State'i
  const { isLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);

  // 2. Preloader Bitişini Dinleme
  useEffect(() => {
    if (!isLoading) {
      // Preloader bittikten hemen sonra veya hafif bir gecikmeyle açılması için
      // Hero'daki mantığa benzer bir zamanlayıcı kullanabiliriz.
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100); // 100ms gecikme (Preloader perdesi kalkarken başlaması için)

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // 3. GSAP Parallax Efekti (Mevcut Kod)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        {
          yPercent: -25,
        },
        {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative h-[100svh] w-full overflow-hidden bg-black",
        // FADE-IN EFEKTİ:
        "transition-opacity duration-1000 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Video Container */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          className="absolute -top-[30%] left-0 h-[160%] w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
        />

        {/* Overlay (Hafif karartma) */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>
  );
}
