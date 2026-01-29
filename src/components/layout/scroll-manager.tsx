"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react"; // Lenis hook'u

export default function ScrollManager() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // 1. Tarayıcının varsayılan "scroll hatırlama" özelliğini kapatıyoruz.
    // Bu sayede "Geri" tuşuna basıldığında tarayıcı aşağı inmeye çalışmaz.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Her sayfa değişiminde (pathname değiştiğinde) tepeye çık.
    window.scrollTo(0, 0);

    // 3. Eğer Lenis aktifse, onu da anında (immediate: true) tepeye ışınla.
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null; // Görsel bir şey render etmez, sadece mantık çalıştırır.
}
