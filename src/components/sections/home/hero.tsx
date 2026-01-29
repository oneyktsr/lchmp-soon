"use client";

import { useState, useEffect } from "react";
import { useLoading } from "@/context/loading-context"; // Preloader durumunu çekiyoruz
import { MaskText } from "@/components/ui/mask-text";
import ArrowButton from "@/components/ui/arrow-button";
import { cn } from "@/lib/utils/cn";

export default function Hero() {
  const { isLoading } = useLoading(); // Loading state'i aldık
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Eğer hala yükleniyorsa (Preloader varsa) hiçbir şey yapma.
    if (isLoading) return;

    // Yükleme bittiği AN sayaç başlasın.
    // Metin animasyonları da bu sırada başladığı için onlara ayak uydurur.
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600); // 600ms gecikme (Metinlerin ardından zarifçe belirmesi için)

    return () => clearTimeout(timer);
  }, [isLoading]); // isLoading değiştiğinde (true -> false) burası tetiklenir.

  return (
    <section
      className={cn(
        "px-page-margin relative flex h-[80svh] w-full flex-col justify-between",
        // MOBİL: Header ile simetrik hesaplanmış boşluk
        "pb-[calc(var(--page-margin)*2)]",
        // DESKTOP: Standart sayfa boşluğu
        "md:pb-page-margin",
      )}
      style={{
        paddingTop: "calc(var(--page-margin) * 2 + 1.5rem)",
      }}
    >
      {/* --- ÜST KISIM: BAŞLIK --- */}
      <div className="gap-x-grid-gutter grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <MaskText
            tag="h1"
            className="text-display font-medium leading-[1.1] tracking-tighter"
          >
            Create. Connect. <br /> Cultivate.
          </MaskText>
        </div>
      </div>

      {/* --- ALT KISIM --- */}
      <div className="gap-x-grid-gutter grid w-full grid-cols-1 items-end gap-10 md:grid-cols-12">
        {/* BUTON */}
        <div
          className={cn(
            "order-2 flex justify-start md:order-1 md:col-span-4 lg:col-span-3",
            // CSS TRANSITION: Opaklık geçişi 1 saniye sürsün
            "transition-opacity duration-1000 ease-out",
            // isVisible true olana kadar (Preloader bitip süre dolana kadar) görünmez.
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <ArrowButton href="/works" label="View Selected Works" />
        </div>

        {/* AÇIKLAMA */}
        <div className="order-1 md:order-2 md:col-span-5 md:col-start-8">
          <MaskText
            tag="p"
            className="text-h4 font-medium leading-[1.2] tracking-tight"
            delay={0.3}
          >
            We create digital experiences that inspire engagement and deliver
            measurable impact for forward — thinking brands and businesses.
          </MaskText>
        </div>
      </div>
    </section>
  );
}
