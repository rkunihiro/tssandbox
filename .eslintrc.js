/** @type {import("eslint").Linter.Config} */
module.exports = {
    env: {
        commonjs: true,
        es2020: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ],
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    rules: {
        "curly": "error",
        "no-else-return": "warn",
    },
};
