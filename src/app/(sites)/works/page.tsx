import type { Metadata } from "next";
import ProjectCard from "@/components/ui/project-card";
import { worksData } from "@/data/works-data";
import { cn } from "@/lib/utils/cn";

// Sayfa Metadata Ayarları
export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected Works - A selection of our recent digital partnerships and craft.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen w-full bg-[#ebe7e1] pb-32 pt-24 text-[#0e0f12] lg:pb-40 lg:pt-32">
      <div className="px-page-margin">
        {/* --- BAŞLIK ALANI --- */}
        <div className="mb-16 md:mb-24 lg:mb-32">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#0e0f12]" />
            <span className="text-h6 font-medium tracking-tight">
              Selected Works
            </span>
          </div>

          <h1 className="text-h2 max-w-4xl font-medium leading-[1.1] tracking-tighter">
            Showcasing a selection of our recent digital partnerships and craft.
          </h1>
        </div>

        {/* --- PROJE LİSTESİ (GRID) --- */}
        <div className="gap-x-grid-gutter grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-y-24 lg:gap-y-32">
          {worksData.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                // 2. kolondaki elemanları (tek sayılar) yukarı kaydırarak asimetrik (parallax görünümlü) grid oluşturur
                // Mobilde normal sıralama, Tablet ve Masaüstünde kaydırma
                index % 2 === 1 ? "md:pt-24 lg:pt-32" : "",
              )}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
