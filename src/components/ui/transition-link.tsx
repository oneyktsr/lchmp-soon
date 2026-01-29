"use client";

import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { animatePageOut } from "@/lib/utils/transition";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function TransitionLink({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Eğer gidilecek sayfa zaten bulunduğumuz sayfaysa hiçbir şey yapma (gereksiz reload önlemi)
    if (pathname === href) {
      e.preventDefault();
      return;
    }

    // Standart geçişi engelle
    e.preventDefault();

    // Çıkış animasyonunu başlat -> Bitince yönlendir
    animatePageOut(href, router);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
