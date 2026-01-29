import gsap from "@/plugins/gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Tip Tanımlaması
interface GSAPExtended {
  to: (targets: unknown, vars: Record<string, unknown>) => void;
  set: (targets: unknown, vars: Record<string, unknown>) => void;
  killTweensOf: (targets: unknown) => void;
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const gsapSafe = gsap as unknown as GSAPExtended;

  // Template içindeki div'i hedef alıyoruz
  const target = document.getElementById("page-transition-container");

  // Eğer hedef bulunamazsa animasyonla vakit kaybetme, direkt git.
  if (!target) {
    router.push(href);
    return;
  }

  // Hızlı tıklamalarda animasyonlar üst üste binmesin
  gsapSafe.killTweensOf(target);

  // Çıkış Animasyonu
  gsapSafe.to(target, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.inOut",
    onComplete: () => {
      // Animasyon bittiğinde sayfayı değiştir.
      // Template yeni sayfada yeniden mount olacak ve opacity'yi 1 yapacak.
      router.push(href);
    },
  });
};
