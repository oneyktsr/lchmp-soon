"use client";

import { useLayoutEffect } from "react";
import gsap from "@/plugins/gsap";

// Tip Tanımlaması
interface GSAPExtended {
  set: (targets: unknown, vars: Record<string, unknown>) => void;
  killTweensOf: (targets: unknown) => void;
}

export default function Template({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const gsapSafe = gsap as unknown as GSAPExtended;
    const target = document.getElementById("page-transition-container");

    if (target) {
      // 1. Önceki animasyonları öldür (Çakışmayı önler)
      gsapSafe.killTweensOf(target);

      // 2. Opacity stilini tamamen sil (Browser default'a döner, yani görünür olur)
      // Bu işlem boyama (paint) öncesi yapıldığı için kullanıcı yanıp sönme görmez.
      gsapSafe.set(target, { clearProps: "opacity" });
    }
  }, []);

  return <>{children}</>;
}
