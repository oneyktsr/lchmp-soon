"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLoading } from "@/context/loading-context";
import { MaskText } from "@/components/ui/mask-text";
import ArrowButton from "@/components/ui/arrow-button";
import { cn } from "@/lib/utils/cn";

// --- YEREL GSAP IMPORTLARI ---
import gsapCore from "@/plugins/gsap";
import { ScrollTrigger } from "@/plugins/gsap/ScrollTrigger";

// --- TYPESCRIPT DÜZELTMESİ ---
// GSAP metodları ve MatchMedia için gerekli tip tanımları
interface GSAPContext {
  conditions?: { [key: string]: boolean };
  revert(): void;
}

interface GSAPMatchMedia {
  add(
    conditions: string | object,
    func: (context: GSAPContext) => void | (() => void),
    scope?: unknown,
  ): GSAPMatchMedia;
  revert(): void;
}

interface GSAP {
  registerPlugin(...args: unknown[]): void;
  to(target: unknown, vars: unknown): GSAPAnimation;
  matchMedia(): GSAPMatchMedia; // MatchMedia eklendi
}

interface GSAPAnimation {
  kill(): void;
}

// İçe aktarılan gsapCore nesnesini, kendi tanımladığımız GSAP tipine dönüştürüyoruz.
const gsap = gsapCore as unknown as GSAP;

export default function Hero() {
  const { isLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);

  // Referanslar
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // 1. BUTON FADE-IN LOJİĞİ
  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // 2. PARALLAX SCROLL LOJİĞİ (Responsive)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // matchMedia oluştur
    const mm = gsap.matchMedia();

    // Responsive tanımlamaları ekle
    mm.add(
      {
        // Tailwind 'md' breakpoint'i (768px) baz alındı
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        // Context içindeki koşul durumlarını al (TypeScript için cast işlemi gerekebilir ama JS'de direkt çalışır)
        const { isMobile } = context.conditions as { isMobile: boolean };

        // Parallax değeri: Mobilde %160, Masaüstünde %120
        const parallaxStrength = isMobile ? "240%" : "120%";

        gsap.to(titleRef.current, {
          y: parallaxStrength,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      },
      containerRef, // Scope (Opsiyonel ama iyi pratik)
    );

    return () => mm.revert(); // matchMedia temizliği (Context'i de temizler)
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "px-page-margin relative flex h-[80svh] w-full flex-col justify-between",
        // MOBİL: Header ile simetrik hesaplanmış alt boşluk
        "pb-[calc(var(--page-margin)*2)]",
        // DESKTOP: Standart sayfa boşluğu
        "md:pb-page-margin",
      )}
      style={{
        // Üst boşluk: Header hizalaması için hesaplanmış değer
        paddingTop: "calc(var(--page-margin) * 2 + 1.5rem)",
      }}
    >
      {/* --- ÜST KISIM: BAŞLIK --- */}
      <div className="gap-x-grid-gutter grid grid-cols-12">
        {/* Parallax etkisi uygulanacak wrapper */}
        <div
          ref={titleRef}
          className="col-span-12 will-change-transform lg:col-span-8"
        >
          <MaskText
            tag="h1"
            className="text-display font-medium leading-[1.1] tracking-tighter"
          >
            Create. Connect. <br /> Cultivate.
          </MaskText>
        </div>
      </div>

      {/* --- ALT KISIM --- */}
      <div className="gap-x-grid-gutter grid w-full grid-cols-1 items-end gap-10 md:grid-cols-12">
        {/* BUTON */}
        <div
          className={cn(
            "order-2 flex justify-start md:order-1 md:col-span-4 lg:col-span-3",
            // Geçiş Efekti
            "transition-opacity duration-1000 ease-out",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <ArrowButton href="/works" label="View Selected Works" />
        </div>

        {/* AÇIKLAMA */}
        <div className="order-1 md:order-2 md:col-span-5 md:col-start-8">
          <MaskText
            tag="p"
            className="text-h4 font-medium leading-[1.1] tracking-tight"
            delay={0.3}
          >
            We create digital experiences that inspire engagement and deliver
            measurable impact for forward — thinking brands and businesses.
          </MaskText>
        </div>
      </div>
    </section>
  );
}
