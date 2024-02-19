const { nextui } = require("@nextui-org/react");

const gridTemplateColumns = Array.from({ length: 24 }).reduce((acc, _, i) => {
  const col = i + 1;
  acc[col] = `repeat(${col}, minmax(0, 1fr))`;
  return acc;
}, {});

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        ...gridTemplateColumns,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
