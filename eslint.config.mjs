import globals from 'globals';
import elsintJsPlugin from '@eslint/js';
import typescriptEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
const customConfig = {
    rules: {
        'prefer-const': 'error',
        'no-debugger': 'error',
        'no-console': 'error',
        'prefer-arrow-callback': 'error',
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
    },
    ignores: ['build/'],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { ignores: [ 'build/' ] },
    { languageOptions: { globals: globals.browser } },
    elsintJsPlugin.configs.recommended,
    ...typescriptEslint.configs.recommended,
    customConfig,
];
