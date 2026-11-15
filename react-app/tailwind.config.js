/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-light": "#f4f7fb",
        "glass-border": "rgba(255, 255, 255, 0.8)",
        "accent": "#3b82f6",
        "accent-dim": "#6366f1",
        "text-primary": "#1e293b",
        "text-secondary": "#64748b",
      },
      borderRadius: {
        "xl": "16px",
        "2xl": "24px",
        "3xl": "32px",
        "full": "9999px"
      },
      fontFamily: {
        "sans": ["Outfit", "sans-serif"],
        "headline-md": ["Outfit", "sans-serif"],
        "body-lg": ["Outfit", "sans-serif"],
        "label-sm": ["Outfit", "sans-serif"],
        "display-metrics": ["Outfit", "sans-serif"],
        "metric-unit": ["Outfit", "sans-serif"],
        "body-md": ["Outfit", "sans-serif"],
        "headline-lg": ["Outfit", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
