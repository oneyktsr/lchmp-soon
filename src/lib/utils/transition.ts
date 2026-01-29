import gsap from "@/plugins/gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Tip Tanımlaması
interface GSAPExtended {
  to: (targets: unknown, vars: Record<string, unknown>) => void;
  set: (targets: unknown, vars: Record<string, unknown>) => void;
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const gsapSafe = gsap as unknown as GSAPExtended;

  // DÜZELTME: document.body yerine sadece içerik kapsayıcısını seçiyoruz.
  // Header bu kapsayıcının DIŞINDA olduğu için etkilenmeyecek.
  const target = document.getElementById("page-transition-container");

  // Eğer target bulunamazsa (güvenlik önlemi) direkt yönlendir.
  if (!target) {
    router.push(href);
    return;
  }

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
