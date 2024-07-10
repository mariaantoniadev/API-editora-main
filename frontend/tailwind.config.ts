import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./globals.css", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-bottom': 'linear-gradient(to bottom, #EEE5E9, #EEE5E9, #EEE5E9)',  
      },
      colors: {
        'custom-color': '#fffae5',
      },
    },
  },
  plugins: [],
};

export default config;
