module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  plugins: ["react"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["eslint:recommended", "react-app", "prettier"],
  globals: {
    Uint8Array: true
  }
};
