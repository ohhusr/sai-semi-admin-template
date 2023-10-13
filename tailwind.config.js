/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,js,tsx,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 添加这一行
  },
}