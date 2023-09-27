import router, { defaultCreateMenuInfo } from './router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCookieItem } from './utils/storage'
import getPageTitle from './utils/get-page-title'
import { addSystemMenuGetMenuList, addSystemMenuAddMenu } from '@/api/system'
import { findItemWithPath } from './utils'

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
      const addRoutes = permissionStore.addRoutes

      if (addRoutes.length) {
        if (to.path === '/') {
          next(findItemWithPath(addRoutes))
        } else {
          next()
        }

        NProgress.done()
      } else {
        try {
          let menuList = await addSystemMenuGetMenuList()

          if (!menuList.length) {
            await addSystemMenuAddMenu(defaultCreateMenuInfo)

            menuList = await addSystemMenuGetMenuList()
          }

          const accessRoutes = await permissionStore.generateRoutes({
            menuList
          })

          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })

          next({ ...to, replace: true })
        } catch (error) {
          console.log(
            '🚀 ~ file: permission.js:77 ~ router.beforeEach ~ error:',
            error
          )

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
