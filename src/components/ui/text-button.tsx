"use client";

import React from "react";
import TransitionLink from "@/components/ui/transition-link";
import { cn } from "@/lib/utils/cn";

interface TextButtonProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function TextButton({
  href,
  label,
  children,
  className,
}: TextButtonProps) {
  // Nuxt örneğindeki ease-link ayarı
  const easeLink = "ease-[cubic-bezier(0.76,0,0.24,1)]";

  return (
    <TransitionLink
      href={href}
      className={cn(
        // LAYOUT: Header itemlarına uyum sağlaması için relative ve inline-block
        // 'pb-1': Çizgi için metnin altında çok az boşluk bırakır
        "group relative inline-block cursor-pointer select-none overflow-hidden pb-1 align-middle",

        // TİPOGRAFİ: Header'daki itemlarla birebir aynı (text-h6 ve font-medium)
        "text-h6 font-medium leading-none",

        className,
      )}
    >
      {/* Metin Katmanı */}
      <span className="relative z-10 block">{children || label}</span>

      {/* Çizgi Katmanı */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1.5px] w-full transform bg-current transition-transform duration-500",
          easeLink,
          // 1. Varsayılan (Leave) Durumu:
          // scale-x-0: Görünmez.
          // origin-right: Büyürken/Küçülürken sağ tarafı baz alır.
          // Sonuç: Mouse çekilince çizgi SAĞA doğru büzülerek kaybolur.
          "origin-right scale-x-0",

          // 2. Hover Durumu:
          // scale-x-100: Tam boy.
          // origin-left: Büyürken sol tarafı baz alır.
          // Sonuç: Mouse gelince çizgi SOLDAN SAĞA doğru büyür.
          "group-hover:origin-left group-hover:scale-x-100",
        )}
      />
    </TransitionLink>
  );
}
