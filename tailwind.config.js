/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "var(--page-margin)",
      screens: {
        "2xl": "2560px",
      },
    },
    extend: {
      fontFamily: {
        // Düzenleme: letterSpacing ayarı kaldırıldı, sadece font ailesi tanımlı.
        sans: ["var(--font-lausanne)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
      },
      fontSize: {
        display: "var(--text-display)",
        h1: "var(--text-h1)",
        h2: "var(--text-h2)",
        h3: "var(--text-h3)",
        h4: "var(--text-h4)",
        h5: "var(--text-h5)",
        h6: "var(--text-h6)",
        body: "var(--text-body)",
        small: "var(--text-small)",
        quote: "var(--text-quote)",
        overline: "var(--text-overline)",
        ui: "var(--text-ui)",
        caption: "var(--text-caption)",
      },
      spacing: {
        "page-margin": "var(--page-margin)",
        "grid-gutter": "var(--grid-gutter)",
        "section-gap": "var(--section-gap)",
      },
    },
  },
  plugins: [],
};
