import { defineStore } from 'pinia'
import {
  constantRoutes,
  asyncRoutes,
  layoutRoutesMap,
  defaultLayoutRoute
} from '@/router'

/**
 * @method convertToTree
 * @param menuList
 * @param parentId
 */
export function convertToTree(menuList, parentId = 0) {
  const routes = []

  for (const menuItem of menuList) {
    if (menuItem.parentId === parentId) {
      let route

      let path

      let component

      let name

      if (menuItem.type === 0 && menuItem.parentId === 0) {
        path = `/${menuItem.path}`
      } else {
        path = menuItem.path
      }

      if (menuItem.type === 0) {
        const route = layoutRoutesMap.find(
          (item) => item.layout === menuItem.layout
        )

        component = route.component

        name = route.name
      } else {
        const route = asyncRoutes.find((item) => item.path === menuItem.path)

        component = route.component

        name = route.name
      }

      if (menuItem.type === 1 && menuItem.parentId === 0) {
        route = {
          path: '/',
          component: defaultLayoutRoute.component,
          redirect: defaultLayoutRoute.redirect,
          name: '1111',
          children: [
            {
              path,
              component,
              hidden: menuItem.hidden,
              alwaysShow: menuItem.alwaysShow,
              name,
              meta: {
                title: menuItem.title,
                icon: menuItem.icon,
                noCache: menuItem.noCache,
                breadcrumb: menuItem.breadcrumb
              }
            }
          ]
        }
      } else {
        route = {
          path,
          component,
          hidden: menuItem.hidden,
          alwaysShow: menuItem.alwaysShow,
          name,
          meta: {
            title: menuItem.title,
            icon: menuItem.icon,
            noCache: menuItem.noCache,
            breadcrumb: menuItem.breadcrumb
          }
        }
      }

      const children = convertToTree(menuList, menuItem.id)

      if (children.length > 0) {
        route.children = children
      }

      routes.push(route)
    }
  }

  return routes
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [],
      addRoutes: []
    }
  },
  actions: {
    /**
     * @method generateRoutes 生成路由
     */
    generateRoutes({ menuList }) {
      return new Promise((resolve) => {
        const accessedRoutes = convertToTree(menuList)

        this.addRoutes = accessedRoutes

        this.routes = constantRoutes.concat(accessedRoutes)

        resolve(accessedRoutes)
      })
    }
  }
})
