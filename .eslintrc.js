module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
  ],
  parserOptions: {
    ecmaFeatures: {
      "jsx": true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
        "tsconfig.json"
    ]
  },
  plugins: [
    'react',
    "react-hooks",
    "@typescript-eslint",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
}
