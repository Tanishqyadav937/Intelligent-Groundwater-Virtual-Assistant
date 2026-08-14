import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFFFFF",
          card: "#F9FAFB",
          hover: "#F3F4F6",
          input: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#3B82F6",
          light: "#DBEAFE",
          dark: "#1E40AF",
          hover: "#2563EB",
          active: "#1E3A8A",
        },
        status: {
          safe: "#10B981",
          "safe-light": "#D1FAE5",
          warning: "#F59E0B",
          "warning-light": "#FEF3C7",
          critical: "#EF4444",
          "critical-light": "#FEE2E2",
        },
        neutral: {
          primary: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          border: "#E5E7EB",
          divider: "#F3F4F6",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};

export default config;
