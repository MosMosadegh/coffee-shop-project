import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next"; // پلاگین مخصوص Next.js
import pluginImport from "eslint-plugin-import"; // پلاگین برای مدیریت importها

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }, // globals برای browser و node
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // پشتیبانی از JSX
        },
        ecmaVersion: "latest", // استفاده از آخرین نسخه ECMAScript
        sourceType: "module", // استفاده از ماژول‌ها
      },
    },
  },
  pluginJs.configs.recommended, // قوانین پیش‌فرض ESLint
  pluginReact.configs.flat.recommended, // قوانین پیش‌فرض React
  pluginNext.configs.recommended, // قوانین پیش‌فرض Next.js
  {
    plugins: {
      import: pluginImport, // فعال‌سازی پلاگین import
    },
    rules: {
      // قوانین سفارشی
      "react/react-in-jsx-scope": "off", // نیازی به import React در Next.js نیست
      "import/extensions": "off", // برای پشتیبانی از import بدون پسوند
      "import/no-unresolved": "off", // برای پشتیبانی از aliasها در Next.js
    },
  },
];