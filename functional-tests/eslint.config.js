import playwright from 'eslint-plugin-playwright'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.spec.ts', '**/*.test.ts'],
  },
  prettierConfig,
)
