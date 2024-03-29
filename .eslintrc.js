module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
  },
  'prettier/prettier': ['error', { singleQuote: true }],
  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true },
    },
  ],
};
