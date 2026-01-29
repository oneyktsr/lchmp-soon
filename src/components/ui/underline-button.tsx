"use client";

import React from "react";
import TransitionLink from "@/components/ui/transition-link";
import { cn } from "@/lib/utils/cn";

interface UnderlineButtonProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function UnderlineButton({
  href,
  label,
  children,
  className,
}: UnderlineButtonProps) {
  // Akışkan Easing
  const easeLink = "ease-[cubic-bezier(0.76,0,0.24,1)]";

  return (
    <TransitionLink
      href={href}
      className={cn(
        // LAYOUT & TIPOGRAFI: Header menü itemlarıyla uyumlu ayarlar
        "group relative inline-block cursor-pointer select-none pb-1 align-middle",
        "text-h6 font-medium leading-none",
        className,
      )}
    >
      {/* Metin Katmanı */}
      <span className="relative z-10 block">{children || label}</span>

      {/* Çizgi 1: MEVCUT OLAN (Gidiş Animasyonu)
         - Default: Görünür, soldan dayalı.
         - Hover: Sağa büzülerek kaybolur.
      */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1.5px] w-full transform bg-current transition-transform duration-500",
          easeLink,
          "origin-left scale-x-100",
          "group-hover:origin-right group-hover:scale-x-0",
        )}
      />

      {/* Çizgi 2: YENİ GELEN (Giriş Animasyonu)
         - Default: Gizli, sağda bekler.
         - Hover: Soldan büyüyerek gelir (Gecikmeli).
      */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1.5px] w-full transform bg-current transition-transform duration-500",
          easeLink,
          "origin-right scale-x-0",
          "group-hover:origin-left group-hover:scale-x-100 group-hover:delay-100",
        )}
      />
    </TransitionLink>
  );
}
