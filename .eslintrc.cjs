module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: ["react-refresh", "@typescript-eslint"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "always-multiline"],
        "no-unused-vars": "error",
        "no-debugger": "error",
    },
};
