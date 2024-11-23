import globals from 'globals';
import elsintJsPlugin from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config} */
const customConfig = {
    rules: {
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',
        'quotes': ['error', 'single'],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'eqeqeq': 'error',
        'max-len': 'off',
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always',
            },
        ],
        'no-console': 'error',
        'no-debugger': 'error',
        'no-case-declarations': 'error',
        'no-param-reassign': ['error', { 'props': false }],
        'no-underscore-dangle': ['error', { 'allowAfterThis': true, 'allow': ['_errors'] }],
        'no-constant-condition': ['error', { 'checkLoops': false }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }],
        'camelcase': 'off',
        'react/jsx-wrap-multilines': [
            'error',
            {
                'arrow': true,
                'return': true,
                'declaration': true,
            },
        ],
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-filename-extension': [1, { 'allow': 'as-needed', 'extensions': ['.tsx', '.jsx'] }],
        'import/prefer-default-export': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'no-use-before-define': 'off',
        'no-sequences': ['error', { 'allowInParentheses': true }],
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/no-unused-prop-types': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-shadow': 'off',
        'no-nested-ternary': 'off',
        'consistent-return': 'off',
        'default-case': 'off',
        'jsx-a11y/iframe-has-title': 'off',
        'array-callback-return': 'off',
        'no-restricted-syntax': 'off',
        'no-unused-expressions': 'off',
        'react/no-array-index-key': 'off',
        'no-return-await': 'off',
        'max-classes-per-file': 'off',
        'no-empty': 'off',
        'no-async-promise-executor': 'off',
        'no-useless-constructor': 'off',
        'no-restricted-properties': 'off',
        'class-methods-use-this': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/order': 'off',
        'import/extensions': 'off',
        'radix': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/no-this-in-sfc': 'off',
        'react/destructuring-assignment': 0,
        'react/default-props-match-prop-types': 'off',
        'prefer-destructuring': 'off',
        'import/no-unresolved': 'off',
        'no-alert': 'off',
        'react/function-component-definition': ['error', {
            'namedComponents': 'arrow-function',
            'unnamedComponents': 'arrow-function',
        }],
        '@typescript-eslint/no-explicit-any': 'off',
        'linebreak-style': 'off',
        'no-script-url': 0,
    },
    ignores: ['build/'],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { ignores: ['build/'] },
    { languageOptions: { globals: globals.browser } },
    elsintJsPlugin.configs.recommended,
    ...typescriptEslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    customConfig,
];
