import { MaskText } from "@/components/ui/mask-text";
import TransitionLink from "@/components/ui/transition-link";

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Slug'ı okunabilir başlığa çevir (örn: "selected-work" -> "Selected Work")
  const title = slug.replace(/-/g, " ");

  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center pb-20 pt-32">
      {/* Üst Başlık */}
      <div className="text-center">
        <MaskText
          tag="span"
          className="text-h6 mb-4 block uppercase tracking-widest opacity-50"
        >
          Case Study
        </MaskText>
        <MaskText
          tag="h1"
          className="text-h1 font-medium capitalize leading-[0.9] tracking-tighter"
        >
          {title}
        </MaskText>
      </div>

      {/* İçerik */}
      <div className="mt-20 max-w-2xl space-y-8 text-center">
        <MaskText tag="p" className="text-body leading-relaxed" delay={0.2}>
          This is a detailed view for the project <strong>{title}</strong>. We
          approach every challenge with a clean slate, reimagining what digital
          interaction can be.
        </MaskText>

        <MaskText
          tag="p"
          className="text-body leading-relaxed opacity-70"
          delay={0.3}
        >
          Through rigorous testing and creative iteration, we delivered a
          solution that not only meets the client&apos;s needs but elevates
          their brand presence in the digital landscape.
        </MaskText>
      </div>

      {/* Geri Dön Butonu */}
      <div className="mt-16">
        <MaskText delay={0.4}>
          <TransitionLink
            href="/works"
            className="text-h6 underline decoration-1 underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
          >
            Back to Works
          </TransitionLink>
        </MaskText>
      </div>
    </main>
  );
}
