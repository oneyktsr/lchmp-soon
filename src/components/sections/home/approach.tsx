"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { MaskText } from "@/components/ui/mask-text";
import ArrowButton from "@/components/ui/arrow-button";
import { cn } from "@/lib/utils/cn";

// --- GSAP IMPORTLARI ---
import gsapCore from "@/plugins/gsap";
import { ScrollTrigger } from "@/plugins/gsap/ScrollTrigger";

// --- TYPESCRIPT TANIMLAMALARI ---
interface GSAPContext {
  revert(): void;
}
interface GSAPAnimation {
  kill(): void;
}
interface GSAP {
  registerPlugin(...args: unknown[]): void;
  context(func: () => void | (() => void), scope?: unknown): GSAPContext;
  to(target: unknown, vars: unknown): GSAPAnimation;
  set(target: unknown, vars: unknown): void;
}
interface ScrollTriggerStatic {
  create(vars: Record<string, unknown>): unknown;
}

const gsap = gsapCore as unknown as GSAP;
const Trigger = ScrollTrigger as unknown as ScrollTriggerStatic;

export default function Approach() {
  const containerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. BUTON GÖRÜNÜRLÜK
      Trigger.create({
        trigger: buttonRef.current,
        start: "top 80%",
        onEnter: () => setIsVisible(true),
      });

      // 2. ÇİZGİ ANİMASYONU
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="md:pt-page-margin w-full bg-[#0e0f12] pb-32 pt-[calc(var(--page-margin)*2)] text-[#ebe7e1] lg:pb-40"
    >
      <div className="px-page-margin">
        <div className="gap-x-grid-gutter grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
          {/* --- 1. SATIR: PASSION & ANA METİN --- */}
          <div className="col-span-4 mb-[calc(var(--page-margin)*2)] flex items-start md:col-span-2 md:mb-0 md:pt-5 lg:col-span-3 lg:mb-0 lg:pt-5">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#ebe7e1]" />
              <span className="text-h6 font-medium tracking-tight">
                Passion
              </span>
            </div>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-9 lg:col-start-4">
            <MaskText
              tag="h2"
              className="text-h1 font-medium leading-[1.1] tracking-tighter"
            >
              <span
                className="float-left hidden h-[10px] md:block md:w-[calc(100%/6)] lg:w-[calc((100%/9)*2)]"
                aria-hidden="true"
              />
              We&apos;re a visionary team producing innovative work in design
              and technology. For us, this is more than just work.
            </MaskText>
          </div>

          {/* --- ARA ÇİZGİ --- */}
          {/* GÜNCELLEME:
              - py-[calc(var(--page-margin)*3)]: Mobil için 3 birim boşluk.
              - md:py-[calc(var(--page-margin)*2)]: Tablet ve üzeri için 2 birim (Eski hali korundu).
          */}
          <div className="col-span-4 py-[calc(var(--page-margin)*3)] md:col-span-8 md:py-[calc(var(--page-margin)*2)] lg:col-span-12">
            <div
              ref={lineRef}
              className="h-[1px] w-full bg-[#ebe7e1]/10 will-change-transform"
            />
          </div>

          {/* --- 2. SATIR: WHAT DRIVES US --- */}
          <div
            className="col-span-4 md:col-span-2 md:col-start-3 lg:col-span-3 lg:col-start-5"
            style={{ opacity: 0.4 }}
          >
            <MaskText
              tag="p"
              className="text-h6 font-medium leading-[1.4] tracking-tight"
              delay={0.2}
            >
              / What Drives Us
            </MaskText>
          </div>

          <div className="col-span-4 pt-4 md:col-span-4 md:col-start-5 md:pt-0 lg:col-span-3 lg:col-start-8 lg:pt-0">
            <MaskText
              tag="p"
              className="text-h6 font-medium leading-[1.4] tracking-tight"
              delay={0.2}
            >
              It’s a passion for creating the next generation of digital
              experiences. Every project is an opportunity to explore new ideas,
              push boundaries, and create solutions that truly connect with
              audiences.
            </MaskText>
          </div>

          {/* --- 3. SATIR: OUR APPROACH --- */}
          <div
            className="md:pt-page-margin col-span-4 pt-[calc(var(--page-margin)*2)] md:col-span-2 md:col-start-3 lg:col-span-3 lg:col-start-5"
            style={{ opacity: 0.4 }}
          >
            <MaskText
              tag="p"
              className="text-h6 font-medium leading-[1.4] tracking-tight"
              delay={0.2}
            >
              / Our Approach
            </MaskText>
          </div>

          <div className="md:pt-page-margin lg:pt-page-margin col-span-4 pt-4 md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-8">
            <MaskText
              tag="p"
              className="text-h6 font-medium leading-[1.4] tracking-tight"
              delay={0.2}
            >
              By combining creativity, technology, and strategic thinking, we
              deliver work that is not only visually compelling but also
              meaningful and effective, helping brands grow and resonate in an
              ever — changing digital landscape.
            </MaskText>
          </div>

          {/* --- 4. SATIR: BUTON --- */}
          <div
            ref={buttonRef}
            className={cn(
              "col-span-4 md:col-start-5 lg:col-start-8",
              "pt-[calc(var(--page-margin)*4)] md:pt-[calc(var(--page-margin)*3)]",
              "transition-opacity duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <ArrowButton
              href="/approach"
              label="Explore the Method"
              mode="light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
