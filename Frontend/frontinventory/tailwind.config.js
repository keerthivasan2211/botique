/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust this path as needed
  theme: {
    extend: {
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },  // Start visible
          '10%': { transform: 'translateX(0%)' }, // Pause momentarily
          '100%': { transform: 'translateX(-100%)' } 
        },
      },
    },
  },
  plugins: [],
};
