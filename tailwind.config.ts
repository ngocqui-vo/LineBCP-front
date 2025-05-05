const { over } = require("lodash");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        md: "640px",
        "2xl": "1400px",
      },
      colors: {
        gray: "#F3F3F3",
        textGray: "#C4C4C4",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        header: "red",
        footer: "red",
        bgLoadingApp: "rgba(255, 255, 255, 0.1)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          color: "#0062cc",
        },
        backgroundColor: {
          qaBackground: "#f5f5f5",
        },
        borderColor: {
          gray: "#e5e5e5",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          secondary100: "rgba(243, 243, 243, 1)",
          secondary200: "rgba(243, 243, 243, 1)",
          secondary300: "rgba(102, 102, 102, 1)",
          secondary400: "#999999",
          secondary500: "#828282",
          secondary600: "#4D4D4D",
          secondary700: "#777777",
        },
        error: {
          DEFAULT: "hsl(var(--red))",
          foreground: "hsl(var(--red-foreground))",
          error100: "rgba(255, 106, 106, 1)",
          error200: "#c45a5a",
          error300: "#fdeaeb",
          error400: "#7a3939",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
          foreground: "hsl(var(--blue-foreground))",
          blue: "rgba(0, 122, 255, 1)",
          blueLight100: "#0870da",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          color: "#F57170",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        disable: {
          disable100: "rgba(229, 229, 229, 1)",
          disable200: "rgba(153, 153, 153, 1)",
          disable300: "#999",
        },
        dark: {
          dark100: "rgba(26, 26, 26, 1)",
          dark200: "#1B1B1B",
          dark300: "#000000",
          dark400: "#1A1A1A",
        },
        success: {
          success100: "#7ec29d",
          success200: "#e5eae7",
          success300: "#507a62",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        // "sf-pro-text": ['"SF Pro Text"', "sans-serif"],
        "sf-pro-text": ["Hiragino Sans"],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
