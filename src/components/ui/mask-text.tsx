"use client";

import { useRef, useLayoutEffect, ElementType } from "react";
import gsap from "@/plugins/gsap";
import SplitText from "@/plugins/gsap/SplitText";
import ScrollTrigger from "@/plugins/gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";
import { useLoading } from "@/context/loading-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

// --- TİP TANIMLAMALARI ---
interface SplitTextInstance {
  lines: HTMLElement[];
  words: HTMLElement[];
  chars: HTMLElement[];
  masks: HTMLElement[];
  revert: () => void;
}

interface SplitTextOptions {
  type: string;
  mask?: string;
  autoSplit?: boolean;
  onSplit?: (self: SplitTextInstance) => void;
}

interface SplitTextConstructor {
  new (target: HTMLElement, options: SplitTextOptions): SplitTextInstance;
}

interface GSAPTimeline {
  from: (targets: unknown, vars: Record<string, unknown>) => this;
}

interface GSAPExtended {
  set: (target: unknown, vars: Record<string, unknown>) => void;
  timeline: (vars?: Record<string, unknown>) => GSAPTimeline;
  context: (
    func: () => void | (() => void),
    scope?: React.RefObject<HTMLElement | null> | HTMLElement | null,
  ) => { revert: () => void };
}

interface MaskTextProps {
  children: React.ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div" | "span";
  triggerStart?: string;
  stagger?: number;
  delay?: number;
}

export function MaskText({
  children,
  className,
  tag = "div",
  triggerStart = "top 85%",
  stagger = 0.1,
  delay = 0,
}: MaskTextProps) {
  const Component = tag as ElementType;
  const targetRef = useRef<HTMLElement>(null);

  const { isLoading } = useLoading();

  useLayoutEffect(() => {
    if (isLoading) return;

    let split: SplitTextInstance | null = null;
    const gsapSafe = gsap as unknown as GSAPExtended;

    const ctx = gsapSafe.context(() => {
      if (!targetRef.current) return;

      const SplitTextType = SplitText as unknown as SplitTextConstructor;

      // SplitText'i başlat
      split = new SplitTextType(targetRef.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self: SplitTextInstance) => {
          const lines = self.lines;
          const masks = self.masks;

          // Kuyrukların kesilmemesi için padding hilesi
          gsapSafe.set(masks, {
            paddingBottom: "0.2em",
            marginBottom: "-0.2em",
          });

          const tl = gsapSafe.timeline({
            scrollTrigger: {
              trigger: targetRef.current,
              start: triggerStart,
              toggleActions: "play none none none",
              once: true, // Sadece bir kez tetikle
            },
          });

          // ANIMASYON
          tl.from(lines, {
            yPercent: 100,
            duration: 1.05,
            ease: "power3.out",
            stagger: stagger,
            delay: delay,
            force3D: true,
            // KRİTİK NOKTA: Animasyon bittiğinde SplitText'i temizle
            onComplete: () => {
              // 1. SplitText yapısını geri al (div'leri sil, saf metne dön)
              // Bu sayede resize işleminde hata vermez ve metin doğal akar.
              if (split) split.revert();

              // 2. Metnin görünür olduğundan emin ol (revert sonrası)
              gsapSafe.set(targetRef.current, { autoAlpha: 1 });
            },
          });

          // Başlangıçta görünür yap
          gsapSafe.set(targetRef.current, { autoAlpha: 1 });
        },
      });
    }, targetRef);

    return () => {
      // Cleanup: Component unmount olursa yine de temizle
      if (split) split.revert();
      ctx.revert();
    };
  }, [triggerStart, stagger, delay, isLoading]);

  return (
    <Component
      ref={targetRef as unknown as React.Ref<HTMLElement>}
      className={cn("kerning-none", className)}
      // FOUC önlemek için başlangıçta gizli
      style={{ fontKerning: "none", visibility: "hidden" }}
    >
      {children}
    </Component>
  );
}
