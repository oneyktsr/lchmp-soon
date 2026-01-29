"use client";

import React from "react";
import TransitionLink from "@/components/ui/transition-link";
import { cn } from "@/lib/utils/cn";

interface ArrowButtonProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  /**
   * 'dark': Koyu metin (Varsayılan) -> Ok rengi açık olur (Daire dolunca görünmesi için)
   * 'light': Açık metin -> Ok rengi koyu olur
   */
  mode?: "light" | "dark";
  className?: string;
}

export default function ArrowButton({
  href,
  label,
  children,
  mode = "dark",
  className,
}: ArrowButtonProps) {
  // Özel Easing Tanımı (Vue kodundaki ease-flow)
  const easeFlow = "ease-[cubic-bezier(0.76,0,0.24,1)]";

  return (
    <TransitionLink
      href={href}
      className={cn(
        "group inline-flex cursor-pointer select-none items-center gap-3 align-middle",
        className,
      )}
    >
      {/* --- İKON ALANI --- */}
      <div
        className={cn(
          "relative h-2 w-2 transition-all duration-500 group-hover:w-8",
          easeFlow,
        )}
      >
        {/* Daire (Circle) */}
        <span
          className={cn(
            "absolute left-1/2 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-40 transition-all duration-500",
            "group-hover:h-8 group-hover:w-8 group-hover:bg-current group-hover:opacity-100",
            easeFlow,
          )}
        />

        {/* Ok İkonu (SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className={cn(
            "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-[150%] -translate-y-1/2 opacity-0 transition-all duration-500",
            "group-hover:-translate-x-1/2 group-hover:opacity-100",
            // Mode 'dark' ise (metin siyahsa), daire siyah dolar, ikon BEYAZ olmalı.
            // Mode 'light' ise (metin beyazsa), daire beyaz dolar, ikon SİYAH olmalı.
            mode === "dark" ? "text-background" : "text-foreground",
            easeFlow,
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      {/* --- METİN ALANI --- */}
      <div className="relative overflow-hidden pb-[4px]">
        <span className="text-h6 block font-normal leading-none tracking-tight">
          {children || label}
        </span>

        {/* Alt Çizgi (Underline) */}
        <span
          className={cn(
            "absolute bottom-0 left-0 h-[1px] w-full origin-right scale-x-100 bg-current transition-transform duration-500",
            "group-hover:scale-x-0",
            easeFlow,
          )}
        />
      </div>
    </TransitionLink>
  );
}
