module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        semi: 0,
        jsxBracketSameLine: 0,
        indent: ['off'],
        singleQuote: 0,
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never' }
        ]
    }
}
