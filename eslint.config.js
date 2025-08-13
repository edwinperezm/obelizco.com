import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksRecommended from 'eslint-plugin-react-hooks';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.next/**', '**/out/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [
          path.join(__dirname, 'tsconfig.json'),
          path.join(__dirname, 'client/tsconfig.json')
        ],
        tsconfigRootDir: __dirname,
      },
    },
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooksRecommended,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    },
  },
  // Apply recommended settings from plugins
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommended,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...reactRecommended,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...reactHooksRecommended.configs.recommended,
  },
];
