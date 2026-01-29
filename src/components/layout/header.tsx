"use client";

import TransitionLink from "@/components/ui/transition-link";
import { useState, useRef, useEffect } from "react";
import { useLoading } from "@/context/loading-context";
import gsap from "@/plugins/gsap";

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
    // DÜZELTME: 'any' yerine spesifik bir tip tanımı yapıldı.
    let ctx: { revert: () => void } | undefined;

    // Preloader bittiğinde (isLoading: false) çalışır
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

    // Cleanup: Bileşen silinirse animasyonu temizle
    return () => {
      if (ctx) ctx.revert();
    };
  }, [isLoading]);

  return (
    <header
      ref={headerRef}
      // Başlangıçta opacity-0 (Gizli)
      className="fixed left-0 z-40 w-full text-[#ebe7e1] opacity-0 mix-blend-difference"
      style={{ top: "var(--page-margin)" }}
    >
      <div className="container mx-auto">
        <div className="gap-grid-gutter grid grid-cols-4 items-center md:grid-cols-8 lg:grid-cols-12">
          {/* --- DESKTOP NAV (Kolon 8-11) --- */}
          <nav className="hidden items-center justify-start gap-[14px] lg:col-span-4 lg:col-start-8 lg:flex">
            {navItems.map((item, index) => (
              <TransitionLink
                key={index}
                href={item.href}
                className="text-h6 font-medium transition-opacity duration-300 hover:opacity-50"
              >
                {item.title}
              </TransitionLink>
            ))}
          </nav>

          {/* --- DESKTOP CTA (Kolon 12) --- */}
          <div className="hidden justify-end lg:col-start-12 lg:flex">
            <TransitionLink
              href="/contact"
              className="text-h6 whitespace-nowrap font-medium transition-opacity duration-300 hover:opacity-50"
            >
              Let&apos;s Talk
            </TransitionLink>
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
