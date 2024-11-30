import js from "@eslint/js";
import globals from "globals";
import pluginPlaywright from "eslint-plugin-playwright";

export default [
  {
    ignores: ["node_modules/**", "dist/**"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      playwright: pluginPlaywright
    },
    rules: {
      "require-await": "error", // Enforce 'await' in async functions
      "no-unused-vars": "warn" // Warn on unused variables
    }
  }
];
