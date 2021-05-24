module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:import/typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', { endOfLine: 'auto' }, { usePrettierrc: true }],
    'react/jsx-filename-extension': ['off', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'max-len': [2, 100],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
  ],
};
