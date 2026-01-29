"use client";

import { useEffect } from "react";
import { MaskText } from "@/components/ui/mask-text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hatayı console'a bas (Production'da log servisine gönderilebilir)
    console.error(error);
  }, [error]);

  return (
    <main className="px-page-margin flex min-h-screen w-full flex-col items-center justify-center text-center">
      {/* Hata Başlığı */}
      <MaskText tag="h1" className="text-h2 font-medium tracking-tighter">
        Beklenmedik Bir Hata
      </MaskText>

      {/* Açıklama */}
      <MaskText
        tag="p"
        className="text-body mt-4 max-w-md opacity-60"
        delay={0.2}
      >
        Sistemde teknik bir aksaklık oluştu. Endişelenmeyin, bu geçici bir durum
        olabilir.
      </MaskText>

      {/* Reset Butonu */}
      <div className="mt-10 overflow-hidden">
        <MaskText delay={0.4}>
          <button
            onClick={
              // Segmenti yeniden render etmeyi dener
              () => reset()
            }
            className="text-h6 group relative inline-block cursor-pointer font-medium"
          >
            <span className="relative z-10">Tekrar Dene</span>
            <span className="ease-expo absolute bottom-0 left-0 h-[1px] w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
          </button>
        </MaskText>
      </div>
    </main>
  );
}
