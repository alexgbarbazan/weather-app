import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint';

export default {
  parser: '@typescript-eslint/parser',
  extends: [
    js.configs.recommended, 
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended', // TypeScript-specific rules
    ...reactHooks.configs.recommended, // React Hooks recommended rules
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Allow `any` type
    'no-unused-vars': 'off', // Disable the base ESLint rule for unused vars
    '@typescript-eslint/no-unused-vars': 'warn', // Use TypeScript-specific rule to warn about unused vars
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Ensure `any` is allowed for TypeScript files
      },
    },
  ],
};
