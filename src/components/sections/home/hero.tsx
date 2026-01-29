"use client";

import { MaskText } from "@/components/ui/mask-text";
import ArrowButton from "@/components/ui/arrow-button";

export default function Hero() {
  return (
    <section
      className="px-page-margin pb-page-margin relative flex h-[80svh] w-full flex-col justify-between"
      style={{ paddingTop: "calc(var(--page-margin) * 2 + 1.5rem)" }}
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
        {/* BUTON:
            Mobile: order-2 (Altta)
            Desktop: md:order-1 (Solda/İlk sırada)
        */}
        <div className="order-2 flex justify-start md:order-1 md:col-span-4 lg:col-span-3">
          <ArrowButton href="/works" label="View Selected Works" />
        </div>

        {/* AÇIKLAMA:
            Mobile: order-1 (Üstte)
            Desktop: md:order-2 (Sağda/İkinci sırada)
        */}
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
