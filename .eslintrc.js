module.exports = {
  env: {
    "jest/globals": true,
  },
  root: true,
  extends: ["@react-native-community"],
  plugins: ["jest"],
  rules: {
    quotes: ["warn", "double"],
    "prettier/prettier": 0,
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "react/require-default-props": ["error"],
    "react/default-props-match-prop-types": ["error"],
    "react/sort-prop-types": ["error"],
  },
  settings: {
    "import/resolver": {
      "babel-module": {},
    },
  },
};
