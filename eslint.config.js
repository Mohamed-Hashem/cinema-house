import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ["src/**/*.{js,jsx}"],
        plugins: {
            prettier,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                localStorage: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                fetch: "readonly",
                process: "readonly",
                React: "readonly",
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            "prettier/prettier": "error",
            "no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^(React|_)",
                    argsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            "no-console": "off",
        },
    },
];
