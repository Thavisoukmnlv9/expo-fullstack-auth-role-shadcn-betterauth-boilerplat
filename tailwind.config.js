/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  plugins: [],
  theme: {
    extend: {
      colors: {
        border: "rgb(228 228 231)",
        input: "rgb(228 228 231)",
        ring: "rgb(23 23 23)",
        background: "rgb(255 255 255)",
        foreground: "rgb(23 23 23)",
        primary: { DEFAULT: "rgb(23 23 23)", foreground: "rgb(255 255 255)" },
        secondary: { DEFAULT: "rgb(244 244 245)", foreground: "rgb(23 23 23)" },
        muted: { DEFAULT: "rgb(244 244 245)", foreground: "rgb(113 113 122)" },
        accent: { DEFAULT: "rgb(244 244 245)", foreground: "rgb(23 23 23)" },
        destructive: { DEFAULT: "rgb(239 68 68)", foreground: "rgb(255 255 255)" },
        card: { DEFAULT: "rgb(255 255 255)", foreground: "rgb(23 23 23)" },
        orange: {
          500: "#FF6B00"
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem"
      }
    },
  }
};