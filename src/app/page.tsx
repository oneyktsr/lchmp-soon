import { MaskText } from "@/components/ui/mask-text";
import ArrowButton from "@/components/ui/arrow-button";
import TextButton from "@/components/ui/text-button";
import UnderlineButton from "@/components/ui/underline-button";

export default function Home() {
  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* 1. Kısım: Marka */}
      <MaskText
        tag="h1"
        className="text-h1 text-center font-medium leading-[0.9] tracking-tighter"
      >
        Le Champ™
      </MaskText>

      {/* 2. Kısım: Alt Başlık */}
      <MaskText
        tag="h2"
        className="text-h4 mt-4 text-center font-normal opacity-60"
        delay={0.2}
      >
        Interactive Development Studio
      </MaskText>

      {/* 3. Kısım: Açıklama ve Butonlar */}
      <div className="mt-12 flex max-w-2xl flex-col items-center space-y-8 text-center">
        <MaskText tag="p" className="text-body leading-relaxed" delay={0.4}>
          We craft digital experiences that merge art with technology. Based in
          the intersection of design and code, we build immersive web
          applications that leave a lasting impression.
        </MaskText>

        <MaskText
          tag="p"
          className="text-body leading-relaxed opacity-70"
          delay={0.6}
        >
          Our approach is rooted in precision, performance, and a deep
          understanding of user interaction. Every pixel serves a purpose, every
          animation tells a story.
        </MaskText>

        {/* BUTONLAR ALANI */}
        <div className="flex flex-col items-center gap-8 pt-8">
          {/* 1. Arrow Button (Daireli & Ok'lu) */}
          <ArrowButton href="/works" label="View Selected Works" />

          {/* 2. Text Button (Çizgi Hover'da Gelir) */}
          <TextButton href="/approach" label="Read Our Methodology" />

          {/* 3. Underline Button (Çizgi Var, Hover'da Gider) */}
          <UnderlineButton href="/lab" label="Explore the Lab" />
        </div>
      </div>
    </main>
  );
}
