import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#F5533D',
      },
      screens: {
        'min-h-640': { 'raw': '(min-height: 640px)' },
        'min-h-768': { 'raw': '(min-height: 768px)' },
      },
    },
  },
  plugins: [],
} satisfies Config;
