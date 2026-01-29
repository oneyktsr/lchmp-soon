"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "@/plugins/gsap";
import ScrollTrigger from "@/plugins/gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// ScrollTrigger için beklediğimiz tipi tanımlıyoruz.
// Bu sayede 'any' kullanmadan TypeScript'i tatmin ediyoruz.
interface ScrollTriggerStatic {
  update: () => void;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Plugin Kaydı
    gsap.registerPlugin(ScrollTrigger);

    // 2. Lenis Başlatma
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // 3. ScrollTrigger Senkronizasyonu (DÜZELTİLDİ)
    // 'any' yerine 'unknown' -> 'ScrollTriggerStatic' dönüşümü yapıyoruz.
    // Bu, ESLint kurallarına %100 uyumlu, güvenli bir yöntemdir.
    lenis.on(
      "scroll",
      (ScrollTrigger as unknown as ScrollTriggerStatic).update,
    );

    // 4. GSAP Ticker Entegrasyonu
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Titremeyi önlemek için lagSmoothing kapatılır
    gsap.ticker.lagSmoothing(0);

    // Temizlik
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // 5. Sayfa Geçişinde Scroll Reset
  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
