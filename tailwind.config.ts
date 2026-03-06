import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nucleus: {
          black: "#0A0A0F",
          dark: "#12121A",
          surface: "#1A1A24",
          "surface-hover": "#22222E",
          border: "#2A2A38",
          accent: "#3B82F6",
          "accent-hover": "#2563EB",
          "accent-muted": "#1E3A5F",
          "accent-glow": "rgba(59, 130, 246, 0.15)",
          signal: "#10B981",
          "signal-muted": "#064E3B",
          alert: "#F59E0B",
          "text-primary": "#F1F1F3",
          "text-secondary": "#9CA3AF",
          "text-muted": "#6B7280",
        },
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["Satoshi", "DM Sans", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        tag: "6px",
        input: "8px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        md: "0 4px 12px rgba(0, 0, 0, 0.4)",
        lg: "0 8px 32px rgba(0, 0, 0, 0.5)",
        glow: "0 0 24px rgba(59, 130, 246, 0.15)",
      },
      maxWidth: {
        content: "1200px",
        reading: "720px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
        page: "300ms",
        reveal: "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
