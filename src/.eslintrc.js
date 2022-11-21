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
  rules: {
    quotes: 2,
    semi: 2,
    "comma-dangle": 2
  },
  globals: {
    Uint8Array: true
  }
};
