import globals from "globals";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: { stylistic },
    ignores: ["dist/**", "eslint.config.mjs"],
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/linebreak-style": ["error", "unix"],
      "stylistic/quotes": ["error", "single"],
      "stylistic/semi": ["error", "never"],
      'eqeqeq': "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      'no-console': 0
    },
  },
];
