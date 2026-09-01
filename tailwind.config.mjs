/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--color-reliance-navy)",
          secondary: "var(--color-reliance-gold)",
          accent: "var(--color-reliance-red)",
          surface: "var(--color-reliance-offwhite)",
          neutral: "var(--color-reliance-grey)",
        },
      },
      fontFamily: {
        nepali: ["var(--font-mukta)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
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
