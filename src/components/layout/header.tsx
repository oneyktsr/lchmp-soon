"use client";

import { useState, useRef, useEffect } from "react";
import { useLoading } from "@/context/loading-context";
import gsap from "@/plugins/gsap";
import TextButton from "@/components/ui/text-button"; // Navigasyon linkleri için
import UnderlineButton from "@/components/ui/underline-button"; // Let's Talk için

const navItems = [
  { title: "Studio", href: "/studio" },
  { title: "Works", href: "/works" },
  { title: "Approach", href: "/approach" },
  { title: "Insights", href: "/insights" },
  { title: "Lab", href: "/lab" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const { isLoading } = useLoading();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    if (!isLoading && headerRef.current) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(headerRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
        });
      }, headerRef);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isLoading]);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 z-40 w-full text-[#ebe7e1] opacity-0 mix-blend-difference"
      style={{ top: "var(--page-margin)" }}
    >
      <div className="container mx-auto">
        <div className="gap-grid-gutter grid grid-cols-4 items-center md:grid-cols-8 lg:grid-cols-12">
          {/* --- DESKTOP NAV (Kolon 8-11) --- */}
          <nav className="hidden items-center justify-start gap-[14px] lg:col-span-4 lg:col-start-8 lg:flex">
            {navItems.map((item, index) => (
              // Menü elemanları: TextButton (Hover'da çizgi gelir)
              <TextButton key={index} href={item.href} label={item.title} />
            ))}
          </nav>

          {/* --- DESKTOP CTA (Kolon 12) --- */}
          <div className="hidden justify-end lg:col-start-12 lg:flex">
            {/* CTA Butonu: UnderlineButton (Çizgili, Hover'da değişir) */}
            <UnderlineButton href="/contact" label="Let's Talk" />
          </div>

          {/* --- MOBILE & TABLET HAMBURGER (Kolon 4 veya 8) --- */}
          <div className="col-start-4 flex justify-end md:col-start-8 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group -mr-2 flex cursor-pointer flex-col items-end gap-[6px] p-2"
              aria-label="Menu"
            >
              <span className="h-[2px] w-6 bg-current transition-all duration-300 group-hover:w-8" />
              <span className="h-[2px] w-8 bg-current transition-all duration-300 group-hover:w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
