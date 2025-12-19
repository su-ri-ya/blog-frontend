/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'lgPlus': '1200px',
      'xl': '1280px',
      '2xl': '1400px',
      '3xl': '1920px',
    },
    extend: {
      fontFamily: {
        sans: ["Archivo", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
        '26': 'repeat(26, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-14': 'span 14 / span 14',
        'span-16': 'span 16 / span 16',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-26': 'span 26 / span 26',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
