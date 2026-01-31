"use client";

import { useRef } from "react";
import ProjectCard from "@/components/ui/project-card";
import { worksData } from "@/data/works-data";
import { cn } from "@/lib/utils/cn";

export default function SelectedWorks() {
  const containerRef = useRef<HTMLElement>(null);

  // TEST İÇİN: İlk projeyi 4 kez kopyalıyoruz
  const firstProject = worksData[0];
  const displayedWorks = [
    firstProject,
    firstProject,
    firstProject,
    firstProject,
  ];

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#ebe7e1] pb-32 pt-24 text-[#0e0f12] lg:pb-40 lg:pt-32"
    >
      <div className="px-page-margin">
        {/* --- BAŞLIK ALANI (Revize Edildi) --- */}
        <div className="mb-16 md:mb-24 lg:mb-32">
          <div className="gap-x-grid-gutter grid grid-cols-1 md:grid-cols-12">
            <h2 className="text-display leading-tighter col-span-12 font-medium tracking-tighter md:col-start-2">
              Featured Works
            </h2>
          </div>
        </div>

        {/* --- PROJE LİSTESİ (12 KOLONLU GRID) --- */}
        <div className="gap-x-grid-gutter grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-y-32">
          {displayedWorks.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className={cn(
                "relative",

                // --- 1. SATIR ---

                // 1. Proje (Büyük - Sol): 5 Kolon
                index === 0 && "md:col-span-5 md:col-start-2",

                // 2. Proje (Küçük - Sağ): Şelale efekti (Aşağıda)
                index === 1 && "md:col-span-3 md:col-start-9 md:pt-[36rem]",

                // --- 2. SATIR ---

                // 3. Proje (Küçük - Sol): Şelale efekti (Aşağıda)
                index === 2 && "md:col-span-3 md:col-start-2 md:pt-[36rem]",

                // 4. Proje (Büyük - Sağ): 5 Kolon
                index === 3 && "md:col-span-5 md:col-start-6",
              )}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
