import { MaskText } from "@/components/ui/mask-text";

export default function StudioPage() {
  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pb-20 pt-32">
      {/* 1. Sayfa Başlığı */}
      <MaskText
        tag="h1"
        className="text-h1 text-center font-medium leading-[0.9] tracking-tighter"
      >
        The Studio
      </MaskText>

      {/* 2. Alt Başlık - Gecikmeli */}
      <MaskText
        tag="h2"
        className="text-h4 mt-6 max-w-3xl text-center font-normal opacity-60"
        delay={0.2}
      >
        Where creativity meets engineering precision.
      </MaskText>

      {/* 3. İki Kolonlu İçerik Alanı */}
      <div className="gap-x-grid-gutter mt-20 grid w-full max-w-screen-xl grid-cols-1 gap-y-12 md:grid-cols-2">
        {/* Kolon 1 */}
        <div className="space-y-6">
          <MaskText tag="h3" className="text-h5 font-medium" delay={0.4}>
            Our Philosophy
          </MaskText>
          <MaskText
            tag="p"
            className="text-body leading-relaxed opacity-80"
            delay={0.5}
          >
            We believe that great software is born from the harmony of design
            and logic. Our studio is a playground for ideas, where we push the
            boundaries of what&apos;s possible on the web.
          </MaskText>
        </div>

        {/* Kolon 2 */}
        <div className="space-y-6">
          <MaskText tag="h3" className="text-h5 font-medium" delay={0.6}>
            The Process
          </MaskText>
          <MaskText
            tag="p"
            className="text-body leading-relaxed opacity-80"
            delay={0.7}
          >
            Every project begins with a conversation. We dive deep into the core
            of the problem, crafting bespoke solutions that are as functional as
            they are beautiful. Innovation is our standard.
          </MaskText>
        </div>
      </div>
    </main>
  );
}
