import { createApp, nextTick } from 'vue'

import settings from '@/settings'
import { isString, isArray } from '@/utils/validate'

// fix: 自动导入函数式组件样式没有自动导入
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'

import 'normalize.css' // a modern alternative to CSS resets

import '@/styles/index.scss' // global css

import App from './App.vue'
import { createPinia } from 'pinia' // pinia
import router from './router'

import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

import './permission' // permission control

import { useErrorLogStore } from '@/store/errorLog'

const app = createApp(App)

app
  .component('SvgIcon', SvgIcon)
  .component('Pagination', Pagination)
  .use(createPinia())
  .use(router)
  .mount('#app')

const errorLogStore = useErrorLogStore()
// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings
/**
 * @method checkNeed 检查需要日志
 * @returns
 */
function checkNeed() {
  const env = import.meta.env.VITE_NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  app.config.errorHandler = (err, vm, info) => {
    console.log('🚀 ~ file: main.js:56 ~ err, vm, info:', err, vm, info)

    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    nextTick(() => {
      errorLogStore.addErrorLog({
        err,
        vm,
        info,
        url: window.location.href
      })
    })
  }
}
