import type { Config } from "tailwindcss";

import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";

export default {
  content: ["../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [heroui(), typography()],
  theme: {
    extend: {},
  },
} satisfies Config;
