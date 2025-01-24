module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    /**
     * "off" or 0 - 关闭规则
     * "warn" or 1 - 将规则视为一个警告
     * "error" or 2 - 将规则视为一个错误
     */

    // 需要使用 === 和 !==
    eqeqeq: 2,
    // 要求组件名称始终为多字
    'vue/multi-word-component-names': 0,
    // 禁止使用var声明变量
    'no-var': 2
  }
}
