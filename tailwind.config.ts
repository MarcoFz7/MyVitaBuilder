import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotate360minus: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'rotate-360': 'rotate360 0.5s linear',
        'rotate-360-minus': 'rotate360minus 0.5s linear',
      },
      colors: {
        'c-light-green': '#BED932',
        'c-green' : '#74CC52',
        'c-green-bluish': '#049977',
        'c-dark-green': '#45523E',
        'c-sidebar-dark-green': '#7A8674',
        'c-light-smoke': '#F5ECE5',     
        'c-dark-smoke': '#B0ACA2',
        'c-lemon-green': '#BFF47B',
        'c-light-dark': '#383838',
      },
    },
  },
  plugins: [],
};
export default config;