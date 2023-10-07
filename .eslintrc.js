//  generated with $ npm init @eslint/config

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended", // add recommend config https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "react/display-name": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
