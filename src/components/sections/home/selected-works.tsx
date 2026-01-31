"use client";

import { useRef } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ui/project-card";
import { worksData } from "@/data/works-data";
import { cn } from "@/lib/utils/cn";

export default function SelectedWorks() {
  const containerRef = useRef<HTMLElement>(null);

  // TEST İÇİN: İlk projeyi 4 kez kopyalıyoruz
  // (Normalde slice(0, 4) kullanırdık ama layout testi için bunu yapıyoruz)
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
        {/* --- BAŞLIK ALANI --- */}
        <div className="mb-16 flex flex-col justify-between md:mb-24 md:flex-row md:items-end lg:mb-32">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#0e0f12]" />
              <span className="text-h6 font-medium tracking-tight">
                Selected Works
              </span>
            </div>

            <h2 className="text-h2 font-medium leading-[1.1] tracking-tighter">
              Showcasing a selection of our recent digital partnerships and
              craft.
            </h2>
          </div>

          {/* View All Butonu */}
          <div className="mt-8 shrink-0 md:mb-2 md:mt-0">
            <Link
              href="/works"
              className="text-h6 group flex items-center gap-2 font-medium transition-opacity hover:opacity-60"
            >
              View All Works
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* --- PROJE LİSTESİ (12 KOLONLU GRID) --- */}
        <div className="gap-x-grid-gutter grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-y-32">
          {displayedWorks.map((project, index) => (
            <div
              // Key'i index ile birleştiriyoruz çünkü hepsi aynı ID'ye sahip
              key={`${project.id}-${index}`}
              className={cn(
                "relative",

                // --- 1. SATIR ---
                // 1. Proje (Sol): 2-6. Kolonlar (5 Kolon Genişlik)
                index === 0 && "md:col-span-5 md:col-start-2",

                // 2. Proje (Sağ): 8-11. Kolonlar (4 Kolon Genişlik)
                // Asimetri için biraz yukarıdan başlar (pt-24)
                index === 1 && "md:col-span-4 md:col-start-8 md:pt-24",

                // --- 2. SATIR ---
                // 3. Proje (Sol): 2-5. Kolonlar (4 Kolon Genişlik - Üsttekinin Zıttı)
                index === 2 && "md:col-span-4 md:col-start-2",

                // 4. Proje (Sağ): 7-11. Kolonlar (5 Kolon Genişlik - Üsttekinin Zıttı)
                // Asimetri için biraz yukarıdan başlar (pt-32)
                index === 3 && "md:col-span-5 md:col-start-7 md:pt-32",
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
