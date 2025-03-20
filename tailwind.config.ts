import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-duration": (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme("transitionDuration") }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-delay": (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme("transitionDelay") }
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animate-ease": (value) => ({
            animationTimingFunction: value,
          }),
        },
        { values: theme("transitionTimingFunction") }
      );
    }),
  ],
};
