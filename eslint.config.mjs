import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist", "tailwind.config.ts", "vite.config.ts"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    prettier: prettier,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "react-refresh/only-export-components": "off",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: true,
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        printWidth: 120,
      },
    ],
  },
});
