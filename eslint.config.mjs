import antfu from '@antfu/eslint-config'
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
// import react from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const customized = stylistic.configs.customize({ indent: 2, quotes: 'single', semi: false, jsx: true })

export default antfu({
  rules: {
    'style/jsx-curly-newline': 'off',

    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/brace-style': ['error', '1tbs'],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/jsx-one-expression-per-line': ['off']
  }
})

const cusss = {
  files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true }
    },
    globals: {
      ...globals.browser
    }
  },
  plugins: {
    '@stylistic': stylistic,
    perfectionist
    // react
  },
  rules: {
    ...customized.rules,
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/brace-style': 'error',
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/jsx-self-closing-comp': 'error',
    '@stylistic/jsx-one-expression-per-line': 'off',
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
    '@stylistic/jsx-curly-newline': 'off',
    '@stylistic/template-curly-spacing': 'error',
    '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: false, includeTabs: true }],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',

    'perfectionist/sort-imports': 'error',
    'prefer-template': 'error'
  }
}

// export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, cusss)
