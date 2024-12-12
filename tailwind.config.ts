import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle at 50% 50%, #93ddff, #73c0e6, #53a3cd, #2f88b4, #0072ab, #0062af, #004faf, #2639a8)',
      },
      animation: {
        walk: "walk 10s linear infinite", // Adjust duration for smooth animation
      },
      keyframes: {
        walk: {
          "0%": { transform: "translateX(-100%)" }, // Start off-screen to the left
          "100%": { transform: "translateX(100vw)" }, // End off-screen to the right
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
