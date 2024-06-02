import eslint from "@eslint/js";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginQuery.configs.recommended,
];
