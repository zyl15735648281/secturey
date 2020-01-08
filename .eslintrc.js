module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/standard"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    rules: {
        quotes: [2, "double"],
        semi: [2, "always"],
        "linebreak-style": "off",
        "comma-dangle": "off",
        "prefer-const": "off",
        "import/no-unresolved": 0,
        "no-return-await": 0,
        "no-empty-pattern": 0,
        "no-param-reassign": 0,
        "space-before-function-paren": 0,
        indent: "off",
        "vue/script-indent": [
            "error",
            {
                baseIndent: 1
            }
        ],
        "eol-last": 0
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};