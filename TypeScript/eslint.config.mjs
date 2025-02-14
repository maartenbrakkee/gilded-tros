import path from "node:path";
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, "../.gitignore");

/** @type {import('eslint').Linter.Config[]} */
export default [
  includeIgnoreFile(gitignorePath),
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
  },
  /*
   * Recommended configuration for the @eslint/js plugin.
   */
  pluginJs.configs.recommended,
  /*
   * Recommended configuration for the typescript-eslint plugin.
   */
  ...tseslint.configs.recommended,
  /*
   * Recommended configuration from the eslint-config-prettier plugin.
   * NOTE: should be placed as last imported config and optional rule
   * overwrites should be placed after.
   */
  eslintConfigPrettier,
  {
    rules: {
      // automatically sort imports
      "simple-import-sort/imports": "error",
    },
  },
];
