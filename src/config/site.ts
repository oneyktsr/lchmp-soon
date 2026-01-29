export const siteConfig = {
  name: "Le Champ™ | An Interactive Development Studio",
  description: "Interactive Development Studio",
  url: "https://le-champ.com",
  ogImage: "https://le-champ.com/og-image.jpg", // Opsiyonel: Sosyal medya önizleme görseli
  defaultLocale: "en",
  keywords: ["Development", "Interactive", "Studio", "Web Design"],
} as const;

export type SiteConfig = typeof siteConfig;
