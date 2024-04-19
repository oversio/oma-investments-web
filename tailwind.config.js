const { nextui } = require("@nextui-org/react");

const cols = Array.from({ length: 24 }).map((_, i) => i + 1);
const gridTemplateColumns = cols.reduce((acc, col) => {
  acc[col] = `repeat(${col}, minmax(0, 1fr))`;
  return acc;
}, {});
const gridSpanColumns = cols.reduce((acc, col) => {
  acc[`span-${col}`] = `span ${col} / span ${col}`;
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
      gridColumn: {
        ...gridSpanColumns,
        "span-full": `1 / ${cols.length + 1}`,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
