import { MaskText } from "@/components/ui/mask-text";
import TransitionLink from "@/components/ui/transition-link";

export default function NotFound() {
  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center text-center">
      {/* Büyük 404 Yazısı */}
      <MaskText
        tag="h1"
        className="text-[15vw] font-medium leading-[0.8] tracking-tighter"
      >
        404
      </MaskText>

      {/* Açıklama Metni */}
      <MaskText tag="p" className="text-h6 mt-6 opacity-60" delay={0.2}>
        Bu sayfa evrende kaybolmuş gibi görünüyor.
      </MaskText>

      {/* Ana Sayfaya Dönüş Butonu (MaskText içinde sarmaladık ki o da animasyonla gelsin) */}
      <div className="mt-10 overflow-hidden">
        <MaskText delay={0.4}>
          <TransitionLink
            href="/"
            className="text-h6 group relative inline-block font-medium"
          >
            <span className="relative z-10">Ana Sayfaya Dön</span>
            {/* Alt Çizgi Animasyonu */}
            <span className="ease-expo absolute bottom-0 left-0 h-[1px] w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
          </TransitionLink>
        </MaskText>
      </div>
    </main>
  );
}
