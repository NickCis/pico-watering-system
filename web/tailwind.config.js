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

