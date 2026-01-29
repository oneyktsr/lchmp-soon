"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export default function GridDebugger() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shift + G kombinasyonu
      if (event.shiftKey && event.key.toLowerCase() === "g") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] select-none">
      <div className="container mx-auto h-full">
        {/* Grid Container:
            Mobil: 4 kolon
            Tablet: 8 kolon
            Desktop: 12 kolon
        */}
        <div className="gap-grid-gutter grid h-full grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-full border-x border-red-500/15 bg-red-500/10",
                // 1. KURAL: 5. ve sonraki tüm sütunlar varsayılan olarak (mobilde) gizli.
                i >= 4 && "hidden",

                // 2. KURAL: 5, 6, 7, 8. sütunlar Tablette (md) görünür olsun.
                // (Ama 9 ve sonrasına md:block VERMİYORUZ, böylece tablette gizli kalıyorlar)
                i >= 4 && i < 8 && "md:block",

                // 3. KURAL: 9, 10, 11, 12. sütunlar Sadece Desktopta (lg) görünür olsun.
                i >= 8 && "lg:block",
              )}
            >
              <div className="flex justify-center pt-2 font-mono text-[10px] text-red-500 opacity-50">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
