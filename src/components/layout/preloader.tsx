"use client";

import { useLayoutEffect, useRef, useState } from "react";
import TransitionLink from "@/components/ui/transition-link"; // DEĞİŞİKLİK: Link yerine TransitionLink
import gsap from "@/plugins/gsap";
import { cn } from "@/lib/utils/cn";
import { useLoading } from "@/context/loading-context";

const brandName = "Le Champ™";

export default function Preloader() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  const [isCurtainVisible, setIsCurtainVisible] = useState(true);
  const [isInteractionEnabled, setIsInteractionEnabled] = useState(false);

  // Context'ten durumu güncelleme fonksiyonunu alıyoruz
  const { setIsLoading } = useLoading();

  useLayoutEffect(() => {
    // 1. SCROLL KİLİDİ
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // --- HESAPLAMA ---
      const logoEl = logoRef.current;
      if (!logoEl) return;

      const logoRect = logoEl.getBoundingClientRect();
      const logoCenterY = logoRect.top + logoRect.height / 2;
      const screenCenterY = window.innerHeight / 2;
      const distanceToCenter = screenCenterY - logoCenterY;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsCurtainVisible(false);
          setIsInteractionEnabled(true);
          document.body.style.overflow = "";

          // GLOBAL LOADING BİTİŞ SİNYALİ
          setIsLoading(false);
        },
      });

      // --- BAŞLANGIÇ (SET) ---
      tl.set(".line-anim", {
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0.5,
      });

      tl.set(logoRef.current, {
        y: distanceToCenter,
      });

      tl.set(textRef.current, {
        scale: 1.5,
        transformOrigin: "left center",
      });

      // --- ANİMASYON ---

      // 1. Harfler
      tl.to(".char", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        stagger: {
          amount: 0.8,
          from: "random",
        },
      });

      // 2. Çizgi Giriş
      tl.to(
        ".line-anim",
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power4.inOut",
        },
        "-=1.0",
      );

      // 3. Çizgi Çıkış
      tl.to(".line-anim", {
        scaleX: 0,
        transformOrigin: "right",
        duration: 1.2,
        ease: "power4.inOut",
      });

      // --- LIFT OFF ---
      const label = "liftOff";
      tl.addLabel(label);

      // 4A. Perde Kalkışı
      tl.to(
        curtainRef.current,
        {
          yPercent: -100,
          duration: 1.5,
          ease: "expo.inOut",
        },
        label,
      );

      // 4B. Logo Yerleşimi
      tl.to(
        logoRef.current,
        {
          y: 0,
          duration: 1.5,
          ease: "expo.inOut",
        },
        label,
      );

      // 4C. Metin Normale Dönüş
      tl.to(
        textRef.current,
        {
          scale: 1,
          duration: 1.5,
          ease: "expo.inOut",
        },
        label,
      );
    }, wrapperRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [setIsLoading]);

  return (
    <div ref={wrapperRef}>
      {/* KATMAN 1: LOGO (KALICI) */}
      <div
        ref={logoRef}
        className="pointer-events-none fixed left-0 z-50 w-full text-[#ebe7e1] mix-blend-difference"
        style={{ top: "var(--page-margin)" }}
      >
        <div className="container mx-auto">
          <div className="gap-grid-gutter grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-full">
              {/* DEĞİŞİKLİK BURADA: Link -> TransitionLink */}
              <TransitionLink
                href="/"
                className={cn(
                  "inline-block",
                  isInteractionEnabled
                    ? "pointer-events-auto cursor-pointer"
                    : "pointer-events-none",
                )}
              >
                <h3
                  ref={textRef}
                  className="text-h3 -mt-[0.05em] whitespace-nowrap font-medium leading-none tracking-tighter"
                >
                  {brandName.split("").map((char, index) => (
                    <span key={index} className="char opacity-0">
                      {char}
                    </span>
                  ))}
                </h3>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>

      {/* KATMAN 2: PERDE (GEÇİCİ) */}
      {isCurtainVisible && (
        <div
          ref={curtainRef}
          className="fixed inset-0 z-40 flex items-center bg-[#0e0f12] text-[#ebe7e1]"
        >
          <div className="container mx-auto w-full">
            <div className="gap-grid-gutter grid grid-cols-4 items-center md:grid-cols-8 lg:grid-cols-12">
              {/* 1. BOŞLUK ALANI */}
              <div className="col-span-2 md:col-span-5 lg:col-span-7"></div>

              {/* 2. ÇİZGİ ALANI */}
              <div className="col-span-2 md:col-span-3 lg:col-span-5">
                <div className="line-anim h-[1px] w-full origin-left scale-x-0 bg-[#ebe7e1]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
