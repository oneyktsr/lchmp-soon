"use client";

import { useEffect } from "react";
import gsap from "@/plugins/gsap";

interface GSAPExtended {
  set: (targets: unknown, vars: Record<string, unknown>) => void;
}

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const gsapSafe = gsap as unknown as GSAPExtended;

    // DÜZELTME: Sadece içerik alanının opacity'sini sıfırla (1 yap).
    const target = document.getElementById("page-transition-container");

    if (target) {
      gsapSafe.set(target, { opacity: 1 });
    }
  }, []);

  return <>{children}</>;
}
