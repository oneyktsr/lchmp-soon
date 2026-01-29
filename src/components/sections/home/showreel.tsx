"use client";

import { useRef, useLayoutEffect } from "react";
// --- YEREL GSAP IMPORTLARI ---
import gsapCore from "@/plugins/gsap";
import { ScrollTrigger } from "@/plugins/gsap/ScrollTrigger";

// --- TYPESCRIPT DÜZELTMESİ (Showreel için) ---
interface GSAP {
  registerPlugin(...args: unknown[]): void;
  // Parallax için fromTo metodunu ekliyoruz
  fromTo(target: unknown, fromVars: unknown, toVars: unknown): GSAPAnimation;
  context(
    func: () => void | (() => void),
    scope?: unknown,
  ): { revert: () => void };
}

interface GSAPAnimation {
  kill(): void;
}

// Güvenli tip dönüşümü
const gsap = gsapCore as unknown as GSAP;

export default function Showreel() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // --- VIDEO PARALLAX EFEKTİ ---
      // Video, container viewport'a girdiği andan çıktığı ana kadar
      // y ekseninde hareket eder.
      // "Belirgin" olması için aralığı arttırdık (-25% -> 25%)
      gsap.fromTo(
        videoRef.current,
        {
          yPercent: -25, // Başlangıç: Yukarıda
        },
        {
          yPercent: 25, // Bitiş: Aşağıda
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Section ekranın altına girdiğinde başla
            end: "bottom top", // Section ekranın üstünden çıktığında bitir
            scrub: true, // Scroll'a pürüzsüz bağla
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Video Container */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          // YÜKSEKLİK ve KONUM GÜNCELLEMESİ:
          // h-[160%] -> Daha geniş hareket alanı.
          // -top-[30%] -> (160 - 100) / 2 = 30. Videoyu dikeyde ortalar.
          // Böylece parallax hareketi sırasında alttan/üstten boşluk görünmez.
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
