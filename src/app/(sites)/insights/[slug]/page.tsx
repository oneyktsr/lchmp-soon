import { MaskText } from "@/components/ui/mask-text";
import TransitionLink from "@/components/ui/transition-link";

export default async function InsightDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  return (
    <main className="px-page-margin mx-auto flex min-h-screen w-full max-w-screen-xl flex-col items-start justify-center pb-20 pt-32">
      {/* Makale Başlığı */}
      <header className="border-current/10 mb-16 w-full border-b pb-12">
        <MaskText tag="span" className="text-ui mb-6 block opacity-50">
          Published on January 24, 2025
        </MaskText>
        <MaskText
          tag="h1"
          className="text-h2 max-w-4xl font-medium capitalize tracking-tighter"
        >
          {title}
        </MaskText>
      </header>

      {/* Makale İçeriği */}
      <article className="max-w-2xl space-y-8">
        <MaskText tag="p" className="text-body leading-relaxed" delay={0.2}>
          In the rapidly evolving world of web development, staying static is
          not an option. This article explores the nuances of{" "}
          <strong>{title}</strong> and how it impacts modern interface design.
        </MaskText>

        <MaskText
          tag="p"
          className="text-body leading-relaxed opacity-80"
          delay={0.3}
        >
          We believe that technology should be invisible, serving the
          user&apos;s intent without friction. By leveraging new browser
          capabilities, we can create experiences that feel more like native
          applications.
        </MaskText>

        <MaskText tag="h3" className="text-h5 pt-8 font-medium" delay={0.4}>
          The Core Concept
        </MaskText>

        <MaskText
          tag="p"
          className="text-body leading-relaxed opacity-80"
          delay={0.5}
        >
          Architecture is not just about code; it&apos;s about structure, flow,
          and emotion. When we build, we build for the human on the other side
          of the screen.
        </MaskText>
      </article>

      {/* Geri Dön */}
      <div className="mt-20">
        <MaskText delay={0.6}>
          <TransitionLink
            href="/insights"
            className="text-h6 underline decoration-1 underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
          >
            ← All Insights
          </TransitionLink>
        </MaskText>
      </div>
    </main>
  );
}
