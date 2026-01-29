import { MaskText } from "@/components/ui/mask-text";

export default function Home() {
  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* 1. Kısım: Marka - Hemen gelir */}
      <MaskText
        tag="h1"
        className="text-display text-center font-medium leading-[0.9] tracking-tighter"
      >
        Create. Connect. Cultivate.
      </MaskText>

      {/* 2. Kısım: Alt Başlık - 0.2sn gecikmeli */}
      <MaskText
        tag="h2"
        className="text-h4 mt-4 text-center font-normal opacity-60"
        delay={0.2}
      >
        Interactive Development Studio
      </MaskText>

      {/* 3. Kısım: Açıklama Paragrafı 1 - 0.4sn gecikmeli */}
      <div className="mt-12 max-w-2xl space-y-8 text-center">
        <MaskText tag="p" className="text-body leading-relaxed" delay={0.4}>
          We craft digital experiences that merge art with technology. Based in
          the intersection of design and code, we build immersive web
          applications that leave a lasting impression.
        </MaskText>

        {/* 4. Kısım: Açıklama Paragrafı 2 - 0.6sn gecikmeli */}
        <MaskText
          tag="p"
          className="text-body leading-relaxed opacity-70"
          delay={0.6}
        >
          Our approach is rooted in precision, performance, and a deep
          understanding of user interaction. Every pixel serves a purpose, every
          animation tells a story.
        </MaskText>
      </div>
    </main>
  );
}
