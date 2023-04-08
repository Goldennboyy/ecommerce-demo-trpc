import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
} satisfies Config;
