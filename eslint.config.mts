import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, includeIgnoreFile } from 'eslint/config';

const gitignorePath = new URL('.gitignore', import.meta.url).pathname;

export default defineConfig([
    includeIgnoreFile(gitignorePath),

    tseslint.configs.recommended,

    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: globals.browser
        },
        rules: {
            'no-console': 'warn',
            indent: [
                'error',
                4
            ],
            quotes: [
                'error',
                'single'
            ],
            semi: [
                'error',
                'always'
            ],
            'comma-dangle': [
                'warn',
                'never'
            ],
            'no-constant-condition': ['off'],
            'no-unassigned-vars': ['warn'],
            'no-useless-assignment': ['warn'],
            'no-unused-vars': ['off'],
            '@typescript-eslint/no-unused-vars': ['off'],
            '@typescript-eslint/no-unused-expressions': ['off']
        }
    }

]);
