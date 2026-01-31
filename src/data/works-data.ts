import { WorkType } from "@/types/works-type";

export const worksData: WorkType[] = [
  {
    id: "01",
    order: 1,
    title: "Vogue Collection",
    slug: "vogue-collection",
    client: "Vogue Magazine",
    location: "Milan / Italy",
    services: ["Web Design", "Development", "Art Direction"],
    isActive: true,

    // Kart Görselleri (Çalışan Gerçek Linkler)
    thumbnailUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",

    // Hover Videosu (Google Storage - Hızlı ve Sorunsuz)
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",

    // Stil
    themeColor: "#b8a690",

    // İçerik
    tagline: "Redefining Fashion Digital Experience",
    shortDescription:
      "A modern approach to fashion e-commerce combining luxury aesthetics with high performance.",
    description:
      "Here goes the long description text about the project process, challenges and solutions...",
    liveUrl: "https://vogue.com",

    // Galeri
    gallery: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop",
      }, // 1
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1509631179647-b849103626a3?q=80&w=1887&auto=format&fit=crop",
      }, // 2
      {
        type: "video",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        poster:
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
      }, // 3
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1886&auto=format&fit=crop",
      }, // 4
    ],

    // SEO
    seo: {
      title: "Vogue Collection - Digital Experience",
      description: "Web design and development project for Vogue Magazine.",
      keywords: ["fashion", "web design", "luxury", "ecommerce"],
    },
  },
];
