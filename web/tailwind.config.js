/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{html,ts,js}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true,
  },
}

// Try to minify template literals: https://github.com/gatsbylabs/vite-plugin-minify-template-literals/blob/main/src/index.ts
