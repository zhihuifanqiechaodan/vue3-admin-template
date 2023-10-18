import { createApp } from 'vue'

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

import directives from '@/directives/index'
import errorLog from '@/utils/error-log'

const app = createApp(App)

app
  .component('SvgIcon', SvgIcon)
  .component('Pagination', Pagination)
  .use(createPinia())
  .use(router)
  .use(directives)
  .use(errorLog)
  .mount('#app')
