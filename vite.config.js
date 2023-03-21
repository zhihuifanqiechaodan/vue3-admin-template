import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-admin-template/',
  server: {
    open: true,
    host: '0.0.0.0',
    port: 9527,
    proxy: {
      '/api': {
        // target: 'https://xxxx', // 开发环境
        target: 'https://xxxx', // 测试环境
        // target: 'https://xxxx', // 预发环境
        // target: 'https://xxxx', // 生产环境
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/gitee': {
        target: 'https://raw.githubusercontent.com/zhihuifanqiechaodan',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gitee/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    vue(),
    vitePluginVueSetupExtend(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
