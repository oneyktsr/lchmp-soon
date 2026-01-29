"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "@/plugins/gsap";
import ScrollTrigger from "@/plugins/gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useLoading } from "@/context/loading-context"; // EKLENDİ

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

  // Loading durumunu çekiyoruz
  const { isLoading } = useLoading();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on(
      "scroll",
      (ScrollTrigger as unknown as ScrollTriggerStatic).update,
    );

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // --- YENİ EKLENEN KISIM: SCROLL KİLİT MEKANİZMASI ---
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isLoading) {
      // Yükleme devam ediyorsa Lenis'i ve native scroll'u durdur
      lenisRef.current.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Yükleme bittiyse başlat
      lenisRef.current.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}
