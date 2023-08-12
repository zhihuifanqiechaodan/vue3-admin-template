import router from './router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCookieItem } from './utils/storage'
import getPageTitle from './utils/get-page-title'
import { getUserMenuList } from '@/api/user'
import { addMenuCreate } from '@/api/menu'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getCookieItem('token')

  const userStore = useUserStore()

  const permissionStore = usePermissionStore()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })

      NProgress.done()
    } else {
      const hasRoutes = permissionStore.addRoutes.length

      if (hasRoutes) {
        next()

        NProgress.done()
      } else {
        try {
          let { menuList } = await getUserMenuList()

          if (!menuList.length) {
            await addMenuCreate({
              type: 1,
              layout: 'layout',
              title: '菜单',
              icon: 'menu',
              hidden: false,
              noCache: true,
              breadcrumb: true,
              path: 'menu'
            })

            let { menuList: newMenuList } = await getUserMenuList()

            menuList = newMenuList
          }

          const accessRoutes = await permissionStore.generateRoutes({
            menuList
          })

          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })

          next({ ...to, replace: true })
        } catch (error) {
          await userStore.resetToken()

          ElMessage.error(error || 'Has Error')

          next(`/login?redirect=${to.path}`)

          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)

      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
