import localFont from "next/font/local";

export const fontLausanne = localFont({
  src: [
    {
      path: "../assets/fonts/TWKLausanne-200.woff2",
      weight: "400", // 200 dosyasını 'Normal' ağırlık olarak atadık
      style: "normal",
    },
    {
      path: "../assets/fonts/TWKLausanne-250.woff2",
      weight: "500", // 250 dosyasını 'Medium' ağırlık olarak atadık
      style: "normal",
    },
  ],
  variable: "--font-lausanne", // Tailwind'de kullanacağımız CSS değişkeni
  display: "swap",
  preload: true,
});
