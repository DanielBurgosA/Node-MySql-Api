module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    env: {
      node: true,
    },
    rules: {
      'no-console': 'off',
    },
  };