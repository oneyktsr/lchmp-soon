import gsap from "@/plugins/gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface GSAPExtended {
  to: (targets: unknown, vars: Record<string, unknown>) => void;
  set: (targets: unknown, vars: Record<string, unknown>) => void;
  killTweensOf: (targets: unknown) => void;
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const gsapSafe = gsap as unknown as GSAPExtended;
  const target = document.getElementById("page-transition-container");

  // Hedef yoksa direkt yönlendir
  if (!target) {
    router.push(href);
    return;
  }

  // Varsa üzerindeki eski animasyonları durdur (Hızlı tıklama önlemi)
  gsapSafe.killTweensOf(target);

  // Çıkış Animasyonu
  gsapSafe.to(target, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      router.push(href);
    },
  });
};
