import globals from "globals";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "eslint.config.js"],
  },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    semi: true,
  }),
  {
    rules: {
      indent: ["error", 2], // 2 表示使用 2 个空格
      "@typescript-eslint/no-explicit-any": 1,
      "@typescript-eslint/no-empty-object-type": 1, // 自定义接口不能为空
    }
  },
];