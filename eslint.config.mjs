// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticTs from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@stylistic/ts': stylisticTs,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      '@stylistic/ts/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          functions: 'always-multiline',
          imports: 'always-multiline',
          objects: 'always-multiline',
          enums: 'always-multiline',
          generics: 'never',
        },
      ],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'signature',
              'static-field',
              'instance-field',
              'abstract-field',
              'constructor',
              'method',
            ],
          },
        },
      ],

      '@typescript-eslint/method-signature-style': ['error', 'method'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': ['error'],

      '@typescript-eslint/no-magic-numbers': 'off',

      'arrow-parens': ['error'],
      curly: ['error', 'all'],
      'default-param-last': ['error'],
      eqeqeq: ['error'],
      'lines-between-class-members': ['error', 'always'],

      'max-depth': ['error', 4],
      'no-else-return': ['error'],
      'no-console': ['warn'],
      'no-duplicate-imports': ['error'],
      'no-nested-ternary': ['error'],
      'no-return-await': ['error'],
      'require-await': ['error'],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@atlas/web',
              message:
                'Please import from ~framework instead of the direct package, this facilitates updates, framework extension and project handovers.',
            },
          ],

          patterns: [
            {
              group: ['@atlas/web/*'],
              message:
                'Please import from ~framework instead of the direct package, this facilitates updates, framework extension and project handovers.',
            },
          ],
        },
      ],
    },
  },
]
