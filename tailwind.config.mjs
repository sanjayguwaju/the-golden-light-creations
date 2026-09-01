/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "var(--color-gold, #F5B301)",
          light: "var(--color-gold-light, #FFD04A)",
          dark: "var(--color-gold-dark, #C8920A)",
        },
        black: {
          DEFAULT: "var(--color-black, #0A0A0A)",
          soft: "var(--color-black-soft, #111111)",
          mid: "var(--color-black-mid, #1A1A1A)",
        },
        white: {
          DEFAULT: "var(--color-white, #FFFFFF)",
          soft: "var(--color-white-soft, #F5F5F5)",
        },
        gray: {
          DEFAULT: "var(--color-gray, #888888)",
          light: "var(--color-gray-light, #CCCCCC)",
        },
        brand: {
          primary: "var(--color-gold, #F5B301)",
          secondary: "var(--color-gold-light, #FFD04A)",
          accent: "var(--color-gold-dark, #C8920A)",
          surface: "var(--color-black-soft, #111111)",
          neutral: "var(--color-gray, #888888)",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        nepali: ["var(--font-mukta)", "sans-serif"],
        sans: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
        display: ["var(--font-bebas)", "var(--font-outfit)", "sans-serif"],
      },
      boxShadow: {
        soft: "none",
        hover: "none",
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
      },
      borderRadius: {
        brand: "0",
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              "--tw-prose-body": "var(--text)",
              "--tw-prose-headings": "var(--text)",
              h1: {
                fontWeight: "normal",
                marginBottom: "0.25em",
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: "2.5rem",
              },
              h2: {
                fontSize: "1.25rem",
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: "4.5rem",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              },
              h2: {
                fontSize: "2rem",
              },
            },
          ],
        },
      }),
    },
  },
};

export default config;
