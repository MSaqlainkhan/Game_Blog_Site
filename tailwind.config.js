/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090a0f",
        surface: {
          DEFAULT: "#11131c",
          elevated: "#171a27",
          border: "#202538",
          subtle: "#1c2030",
        },
        pulse: {
          DEFAULT: "#00f0ff",
          hover: "#38bdf8",
          dark: "#0284c7",
          glow: "rgba(0, 240, 255, 0.2)",
          dim: "rgba(0, 240, 255, 0.08)",
        },
        editorial: {
          subtle: "#94a3b8",
          muted: "#64748b",
          dark: "#334155",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        'pulse-glow': '0 0 25px -5px rgba(0, 240, 255, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
