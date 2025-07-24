/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false, // Elimina el modo oscuro
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Outfit', 'sans-serif'],
        title: ['Changa', 'sans-serif'],
      },
      colors: {
        brand: {
          background: "#000000", // fondo principal
          text: "#ffffff",      // texto principal y secundario
          accent: "yellow",    // verde neón (botones, acentos, enlaces activos)
          subtitle: "#cccccc",  // gris claro (subtítulos, texto menos importante)
          block: "#ffffff",     // azul vibrante (bloques destacados)
          white: "#ffffff", // blanco puro (texto y elementos destacados)
          turquoise: "#00e0d0", // turquesa brillante (detalles decorativos)
        },
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
  },
  plugins: [],
}