import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Unified ESLint configuration with core extends and all specified rules turned off
const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript'
    ],
    rules: {
      // Disable specific rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-anonymous-default-export': 'off',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  }),
];

export default eslintConfig;
