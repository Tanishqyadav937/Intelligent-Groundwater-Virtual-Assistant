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
        background: "#FFFFFF",
        card: {
          DEFAULT: "#F9FAFB",
          hover: "#F3F4F6",
          gradientStart: "rgba(219, 234, 254, 0.5)", // Soft groundwater blue
          gradientMid: "rgba(209, 250, 229, 0.5)",   // Mint green glow
          gradientEnd: "rgba(254, 226, 226, 0.3)",   // Subtle warm blush
        },
        primary: {
          DEFAULT: "#000000",       // High contrast obsidian black CTA
          hover: "#1F2937",
          accent: "#3B82F6",        // Groundwater blue highlight
          light: "#F0F7FF",
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
          main: "#000000",
          body: "#374151",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          border: "#E5E7EB",
          divider: "#F3F4F6",
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
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
      backgroundImage: {
        "fog-mesh":
          "radial-gradient(at 0% 0%, rgba(219, 234, 254, 0.7) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(209, 250, 229, 0.7) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(254, 226, 226, 0.4) 0px, transparent 50%)",
        "fog-card":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.85) 100%)",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        glow: "0 8px 32px 0 rgba(59, 130, 246, 0.08)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        elevated: "0 12px 40px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};

export default config;
