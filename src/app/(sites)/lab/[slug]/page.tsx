import { MaskText } from "@/components/ui/mask-text";
import TransitionLink from "@/components/ui/transition-link";

export default async function LabDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  // DÜZELTME 1: Math.random() yerine slug tabanlı sabit sayı üretimi.
  // Bu sayede hydration hatası oluşmaz.
  const experimentId = (slug.charCodeAt(0) % 9) + 1;

  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center bg-[#0e0f12] pb-20 pt-32 text-[#ebe7e1]">
      {/* Lab Başlığı (Koyu Tema) */}
      <div className="mb-12 text-center">
        <MaskText tag="div">
          <span className="text-ui mb-4 inline-block rounded-full border border-current px-2 py-1 font-mono text-xs opacity-70">
            EXPERIMENT_0{experimentId}
          </span>
        </MaskText>
        <MaskText
          tag="h1"
          className="text-h1 font-medium capitalize tracking-tighter"
        >
          {title}
        </MaskText>
      </div>

      {/* Simülasyon / Görsel Alanı (Placeholder) */}
      <div className="mb-12 flex h-[50vh] w-full items-center justify-center rounded-sm border border-white/10 bg-white/5">
        <MaskText
          tag="span"
          className="font-mono text-sm opacity-50"
          delay={0.2}
        >
          [ Interactive Canvas Placeholder ]
        </MaskText>
      </div>

      {/* Teknik Açıklama */}
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-12 border-t border-white/10 pt-12 md:grid-cols-2">
        <div>
          <MaskText tag="h3" className="text-h6 mb-4 font-mono" delay={0.3}>
            TECH_STACK
          </MaskText>

          {/* DÜZELTME 2: 'ul' yerine div yapısı kullanıldı */}
          <div className="space-y-2 font-mono text-sm opacity-60">
            <MaskText tag="div" delay={0.4}>
              - WebGL / Three.js
            </MaskText>
            <MaskText tag="div" delay={0.42}>
              - GLSL Shaders
            </MaskText>
            <MaskText tag="div" delay={0.44}>
              - React Fiber
            </MaskText>
            <MaskText tag="div" delay={0.46}>
              - GSAP Custom Ease
            </MaskText>
          </div>
        </div>

        <div>
          <MaskText
            tag="p"
            className="text-body leading-relaxed opacity-80"
            delay={0.5}
          >
            This experiment, <strong>{title}</strong>, pushes the boundaries of
            browser performance. We utilize compute shaders to handle particle
            physics on the GPU, leaving the main thread free for UI
            interactions.
          </MaskText>
        </div>
      </div>

      <div className="mt-16 flex w-full justify-center">
        <MaskText delay={0.6}>
          <TransitionLink
            href="/lab"
            className="border border-white/20 px-4 py-2 font-mono text-sm transition-colors hover:bg-white hover:text-black"
          >
            RETURN_TO_LAB
          </TransitionLink>
        </MaskText>
      </div>
    </main>
  );
}
