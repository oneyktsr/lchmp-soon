"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkType } from "@/types/works-type";
import { cn } from "@/lib/utils/cn";

interface ProjectCardProps {
  project: WorkType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  // --- 1. VIDEO OTOMATİK OYNATMA (MOBİL) ---
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    // Mobilde video varsa otomatik oynat (sessiz)
    if (isTouch && project.videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Otomatik oynatma engellendiyse sessizce geç
      });
    }
  }, [project.videoUrl]);

  // --- 2. MOUSE EVENTLERİ ---
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Masaüstünde hover olunca videoyu oynat
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Videoyu durdur
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // --- 3. KART İÇERİĞİ ---
  const cardContentJSX = (
    <>
      {/* Medya Alanı */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-200">
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-opacity duration-500",
            // Video oynuyorsa görselin opaklığını düşür
            isHovered && project.videoUrl ? "opacity-0" : "opacity-100",
          )}
          priority={false}
          unoptimized
        />
        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            // Mobilde opacity-100 (görünür), Masaüstünde opacity-0 (hover ile görünür)
            className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100"
          />
        )}
      </div>

      {/* Metin Bilgileri */}
      <div className="text-h6 mt-4 flex w-full items-start justify-between font-medium leading-tight tracking-tight text-[#0e0f12]">
        {/* Sol: Başlık ve Slogan (Dikey Hizalama) */}
        <div className="flex max-w-[90%] flex-col items-start overflow-hidden">
          <span className="block whitespace-nowrap">{project.title}</span>

          {/* Slogan Animasyonu (Opacity: 0 -> 50) */}
          <span
            className={cn(
              "block text-[#0e0f12] transition-opacity duration-500",
              // Hover durumunda opacity-50, değilse opacity-0
              isHovered ? "opacity-50" : "opacity-0",
            )}
          >
            {project.tagline}
          </span>
        </div>

        {/* Sağ: Durum (Coming Soon) */}
        {!project.isActive && (
          <span className="ml-2 whitespace-nowrap text-right text-sm text-[#0e0f12]/40">
            Coming Soon
          </span>
        )}
      </div>
    </>
  );

  const commonClasses = "group relative w-full select-none block";

  // --- 4. RENDER ---
  return (
    <div
      ref={containerRef}
      className={commonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {project.isActive ? (
        <Link href={`/work/${project.slug}`} className="block w-full">
          {cardContentJSX}
        </Link>
      ) : (
        <div className="block w-full">{cardContentJSX}</div>
      )}
    </div>
  );
}
