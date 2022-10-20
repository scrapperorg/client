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
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
}
