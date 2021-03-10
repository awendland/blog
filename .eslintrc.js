module.exports = {
  extends: ['react-app', 'plugin:jsx-a11y/strict'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['react', 'jsx-a11y'],
  globals: {
    graphql: false,
    __PATH_PREFIX__: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
}
