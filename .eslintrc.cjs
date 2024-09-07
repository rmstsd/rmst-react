const stylistic = require('@stylistic/eslint-plugin')

const customized = stylistic.configs.customize({ indent: 2, quotes: 'single', semi: false, jsx: true })

module.exports = {
  ignorePatterns: [
    'node_modules',
    '.eslintrc.cjs',
    'postcss.config.js',
    'rsbuild.config.ts',
    'tailwind.config.ts',
    'glslang-master-windows-Release',
    'dist',
    'public'
  ],
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic'
    // 'plugin:perfectionist/recommended-alphabetical-legacy',
    // 'plugin:perfectionist/recommended-natural-legacy'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@stylistic', '@typescript-eslint', 'perfectionist'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    ...customized.rules,
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/brace-style': ['error'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/jsx-self-closing-comp': ['error'],
    '@stylistic/jsx-one-expression-per-line': ['off'],
    '@stylistic/operator-linebreak': ['error', 'after'],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/multiline-ternary': ['error', 'never'],
    '@stylistic/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'none', requireLast: false },
        singleline: { delimiter: 'comma', requireLast: false }
      }
    ],
    '@stylistic/jsx-curly-newline': ['off'],
    '@stylistic/template-curly-spacing': 'error',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',

    'prefer-template': 'error',

    'perfectionist/sort-imports': ['error']
  }
}
