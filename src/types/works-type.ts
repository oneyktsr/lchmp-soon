// Galeri içindeki her bir parça (Resim veya Video)
export type WorkGalleryItem = {
  type: "image" | "video"; // Medyanın türü
  url: string; // Dosya yolu
  poster?: string; // Video ise kapak görseli (opsiyonel)
};

export interface WorkType {
  // --- Kimlik ve Sıralama ---
  id: string; // Benzersiz ID (örn: "01")
  order: number; // Sıralama Numarası

  // --- Temel Bilgiler ---
  title: string; // Proje Adı
  slug: string; // URL Uzantısı (örn: "moda-markasi-web")
  client: string; // Müşteri Adı
  location: string; // Lokasyon (örn: "Paris / France")
  services: string[]; // Hizmetler (["Web Design", "UI/UX"] gibi)
  isActive: boolean; // Proje Aktif mi? (False ise girilemez)

  // --- Görsel Materyaller (Kapak) ---
  thumbnailUrl: string; // Kart Kapak Görseli
  videoUrl?: string; // Kart Kapak Videosu (Opsiyonel - Hover için)

  // --- Stil ---
  themeColor?: string; // Proje Tema Rengi (örn: "#FF5733")

  // --- İçerik ---
  tagline: string; // Slogan
  shortDescription: string; // Kısa Açıklama (Listeleme için)
  description: string; // Uzun Açıklama (Detay sayfası için)
  liveUrl?: string; // Canlı Proje Linki (Varsa buton çıkar)

  // --- Galeri (Sıralı Medya) ---
  gallery: WorkGalleryItem[];

  // --- SEO Ayarları ---
  seo: {
    title: string; // Tarayıcı Başlığı
    description: string; // Google Açıklaması
    keywords: string[]; // Anahtar Kelimeler
  };
}
