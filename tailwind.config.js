/** @type {import('tailwindcss').Config} */
import path from "path";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg0: "var(--bg-0)",
        bg1: "var(--bg-1)",
        bg2: "var(--bg-2)",
        line0: "var(--line-0)",
        line1: "var(--line-1)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",
        accent: "var(--accent)",
        accentHover: "var(--accent-hover)",
        accentActive: "var(--accent-active)",
        successAux: "var(--success-aux)",
        danger: "var(--danger)",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
      },
      borderRadius: {
        card: "12px",
        field: "10px",
        pill: "999px",
      },
      boxShadow: {
        plyn: "0 1px 0 rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.02)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
