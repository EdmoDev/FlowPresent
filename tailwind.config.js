/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "background-card": "var(--background-card)",
        "background-dark": "var(--background-dark)",
        "background-glass": "var(--background-glass)",
        "background-elevated": "var(--background-elevated)",
        "border-subtle": "var(--border-subtle)",
        "accent-blue": "var(--accent-blue)",
        "accent-purple": "var(--accent-purple)",
        "accent-green": "var(--accent-green)",
        "accent-orange": "var(--accent-orange)",
        "accent-red": "var(--accent-red)",
        neutral: {
          800: "#1f1f1f",
          700: "#2e2e2e",
          600: "#3d3d3d",
          500: "#6b6b6b",
          400: "#9e9e9e",
          300: "#cfcfcf",
          200: "#e1e1e1",
          100: "#f5f5f5",
        },
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
        card: "var(--card-shadow)",
        subtle:
          "0px 1px 1px 0px rgba(0, 0, 0, 0.03), 0px 0px 2px 0px rgba(0, 0, 0, 0.1), 0px 5px 5px 0px rgba(0, 0, 0, 0.03)",
        standard:
          "0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 10px 10px 0px rgba(0, 0, 0, 0.1)",
        strong:
          "0px 1px 0px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.1), 0px 10px 10px 0px rgba(0, 0, 0, 0.15), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1)",
        large:
          "0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.15), 0px 20px 40px 0px rgba(0, 0, 0, 0.25), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.1)",
        "large-strong":
          "0px 5px 10px 0px rgba(0, 0, 0, 0.2), 0px 15px 30px 0px rgba(0, 0, 0, 0.3), 0px 20px 40px 0px rgba(0, 0, 0, 0.5), inset 0px -1px 0px 0px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite",
        "scale-pulse": "scale-pulse 3s ease-in-out infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "spin-slow": "spin-slow 100s linear infinite",
        "spin-medium": "spin-medium 60s linear infinite",
        "spin-fast": "spin-fast 20s linear infinite",
        ticker: "ticker 30s linear infinite",
        blurUp: "blurUp 0.5s ease-out forwards",
        blurDown: "blurDown 0.5s ease-out forwards",
        blurDownInfinite: "blurDownInfinite 5s ease-out infinite",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        scaleIn: "scaleIn 0.5s ease-out forwards",
        strikethrough: "strikethrough 0.5s ease-out forwards",
      },
      animationDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
      },
      backgroundImage: {
        "glass-gradient": "var(--glass-gradient)",
        "button-gradient":
          "linear-gradient(180deg, rgba(235, 235, 235, 0.1) -27.27%, rgba(196, 196, 196, 0.15) 127.27%)",
        "shine-gradient":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0))",
        "shine-large-gradient":
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
        "gradient-to-r-white":
          "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
        "gradient-to-t-white":
          "linear-gradient(to top, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 0.8 },
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-medium": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-fast": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        blurUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px) scale(0.9)",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
          },
        },
        blurDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px) scale(0.9)",
            filter: "blur(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
          },
        },
        blurDownInfinite: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px) scale(0.9)",
            filter: "blur(10px)",
          },
          "20%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
          },
          "80%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-20px) scale(0.9)",
            filter: "blur(10px)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95) translateY(20px)", opacity: "0" },
          "100%": { transform: "scale(1) translateY(0px)", opacity: "1" },
        },
        strikethrough: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        sm: "var(--border-radius-sm)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
        "2xl": "var(--border-radius-xxl)",
        "3xl": "24px",
        "4xl": "32px",
      },
      height: {
        header: "var(--header-height)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
      },
      fontFamily: {
        "space-grotesk": ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  safelist: [
    { pattern: /bg-background-glass/ },
    { pattern: /bg-background-card/ },
    { pattern: /bg-background-elevated/ },
    { pattern: /text-accent-blue/ },
    { pattern: /text-accent-purple/ },
    { pattern: /text-accent-green/ },
    { pattern: /text-accent-orange/ },
    { pattern: /text-accent-red/ },
    { pattern: /border-border-subtle/ },
    { pattern: /shadow-glass/ },
    { pattern: /shadow-card/ },
    { pattern: /shadow-subtle/ },
    { pattern: /shadow-standard/ },
    { pattern: /shadow-strong/ },
    { pattern: /shadow-large/ },
    { pattern: /shadow-large-strong/ },
    { pattern: /rounded-xl/ },
    { pattern: /rounded-2xl/ },
    { pattern: /rounded-3xl/ },
    { pattern: /rounded-4xl/ },
    { pattern: /backdrop-blur-glass/ },
    { pattern: /font-space-grotesk/ },
    { pattern: /font-mono/ },
    { pattern: /shine/ },
    { pattern: /shine-large/ },
    { pattern: /animation-delay-\d+/ },
    { pattern: /animate-blurUp/ },
    { pattern: /animate-blurDown/ },
    { pattern: /animate-blurDownInfinite/ },
    { pattern: /animate-fadeIn/ },
    { pattern: /animate-scaleIn/ },
    { pattern: /animate-strikethrough/ },
  ],
  plugins: [
    function ({ addUtilities, theme }) {
      const animationDelays = theme("animationDelay");
      const newUtilities = Object.entries(animationDelays).map(
        ([key, value]) => {
          return {
            [`.animation-delay-${key}`]: { animationDelay: value },
          };
        },
      );
      addUtilities(newUtilities);
    },
  ],
};
