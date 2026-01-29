import { MaskText } from "@/components/ui/mask-text";

export default function LabPage() {
  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pb-20 pt-32">
      <MaskText
        tag="h1"
        className="text-h1 text-center font-medium leading-[0.9] tracking-tighter"
      >
        The Lab
      </MaskText>

      <MaskText
        tag="p"
        className="text-h4 mt-6 max-w-3xl text-center font-normal opacity-60"
        delay={0.2}
      >
        Our playground for creative coding and R&D.
      </MaskText>
    </main>
  );
}
