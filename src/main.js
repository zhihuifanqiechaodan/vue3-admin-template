import { createApp } from 'vue'

import { getToken } from './utils/storage'

import 'normalize.css' // a modern alternative to CSS resets

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import { createPinia } from 'pinia' // pinia
import router from './router'

const app = createApp(App)


import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

import './permission' // permission control

app
    .component('svg-icon', svgIcon)
    .use(ElementPlus, {
        size: getToken('size') || 'medium' // set element-ui default size
    })
    .use(createPinia())
    .use(router)
    .mount('#app')