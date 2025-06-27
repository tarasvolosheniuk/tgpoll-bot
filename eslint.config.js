// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default await tseslint.config(
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["**/dev/*", "**/dist/*", "**/tests/*", "tsconfig.json"] },
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
);
