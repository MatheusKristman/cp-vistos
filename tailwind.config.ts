import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        caution: {
          DEFAULT: "hsl(var(--caution))",
          foreground: "hsl(var(--caution-foreground))",
        },
        confirm: {
          DEFAULT: "hsl(var(--confirm))",
          foreground: "hsl(var(--confirm-foreground))",
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
      backgroundImage: {
        "mobile-hero": "url('/assets/images/mobile-hero-bg.png')",
        "tablet-hero": "url('/assets/images/tablet-hero-bg.png')",
        "desktop-hero": "url('/assets/images/desktop-hero-bg.png')",
        "mobile-about": "url('/assets/images/mobile-about-bg.png')",
        "tablet-about": "url('/assets/images/tablet-about-bg.png')",
        "desktop-about": "url('/assets/images/desktop-about-bg.png')",
        "banner-1": "url('/assets/images/banner-1.png')",
        "banner-2": "url('/assets/images/banner-2.jpg')",
        "banner-3": "url('/assets/images/banner-3.jpg')",
        "mobile-services": "url('/assets/images/mobile-services.png')",
        "desktop-services": "url('/assets/images/desktop-services.png')",
        "mobile-testimonial": "url('/assets/images/mobile-testimonial-bg.png')",
        "tablet-testimonial": "url('/assets/images/tablet-testimonial-bg.png')",
        "desktop-testimonial": "url('/assets/images/desktop-testimonial-bg.png')",
        "login-1": "url('/assets/images/login-1.png')",
        "login-2": "url('/assets/images/login-2.png')",
        "login-3": "url('/assets/images/login-3.png')",
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
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
