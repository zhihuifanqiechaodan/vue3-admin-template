import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import defaultSettings from './src/settings'

function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default (mode) => {
  return defineConfig({
    base: '/vue3-admin-template/',
    // base: './',
    server: {
      open: true,
      host: '0.0.0.0',
      port: 9527,
      proxy: !defaultSettings.isMockData && {
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
      },
      extensions: ['.vue', '.js']
    },
    esbuild: {
      drop:
        loadEnv(mode, process.cwd()).VITE_NODE_ENV === 'production'
          ? ['console', 'debugger']
          : []
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
      }),
      defaultSettings.isMockData &&
        viteMockServe({
          // mockPath: path.resolve(process.cwd(), 'src/mock'),
          mockPath: './src/mock',
          // localEnabled:
          //   loadEnv(mode, process.cwd()).VITE_NODE_ENV === 'localhost', // 只在本地开发打开，正式使用的时候注释下面这条，打开当前这条
          localEnabled: true, // 设置是否启用本地模拟.ts文件，不要在生产环境中打开
          // prodEnabled:
          //   loadEnv(mode, process.cwd()).VITE_NODE_ENV === 'localhost', // 只在本地开发打开，正式使用的时候注释下面这条，打开当前这条
          prodEnabled: true, // 设置打包是否启用 mock 功能
          injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
          `
        })
    ]
  })
}
