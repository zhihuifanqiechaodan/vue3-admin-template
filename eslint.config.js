import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  pluginVue.configs['flat/essential'],
  {
    rules: { 'vue/multi-word-component-names': 0, 'no-var': 2 }
  }
])
