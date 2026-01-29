"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "@/plugins/gsap";
import { usePathname } from "next/navigation";

interface GSAPExtended {
  set: (targets: unknown, vars: Record<string, unknown>) => void;
  killTweensOf: (targets: unknown) => void;
}

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const gsapSafe = gsap as unknown as GSAPExtended;

    if (containerRef.current) {
      // 1. Önceki tüm animasyonları durdur (Çakışma önlemi)
      gsapSafe.killTweensOf(containerRef.current);

      // 2. Elementin üzerindeki tüm inline stilleri (opacity: 0 dahil) temizle
      gsapSafe.set(containerRef.current, { clearProps: "all" });

      // 3. Garanti olsun diye Opacity 1 yap
      gsapSafe.set(containerRef.current, { opacity: 1 });
    }
  }, [pathname]); // Path her değiştiğinde bu kod çalışır

  return (
    // ID'yi BURAYA verdik. animatePageOut fonksiyonu bu ID'yi bulacak.
    <div ref={containerRef} id="page-transition-container" className="w-full">
      {children}
    </div>
  );
}
