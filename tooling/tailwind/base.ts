import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "src/**/*.{ts,tsx}",
    "../../apps/ui/src/components/**/*.{ts,tsx}",
    "../../apps/ui/.storybook/**/*.{ts,tsx}",
    "../../apps/ui/stories/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-gray": "#050505",
        "theme-gray-light": "#343531",
        "bright-yellow": "#FBE1BB",
        "medium-dark-green": "#4D4E46",
        "dark-green": "#2A2B24",
        flamingo: "#FF93BA",
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
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      fontFamily: {
        sans: ["var(--font-bebas-neue)", ...fontFamily.sans],
        "sans-serif": ["var(--font-space-mono)", ...fontFamily.serif],
      },
    },
  },
} satisfies Config;
