import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes, defaultLayoutRoute } from '@/router'
import { v4 as uuidv4 } from 'uuid'

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

      if (menuItem.type === 0) {
        route = {
          path: '/',
          component: defaultLayoutRoute.component,
          hidden: menuItem.hidden,
          alwaysShow: menuItem.alwaysShow,
          redirect: defaultLayoutRoute.redirect,
          name: uuidv4(),
          meta: {
            title: menuItem.title,
            icon: menuItem.icon
          }
        }
      } else if (menuItem.type === 1) {
        if (menuItem.parentId === 0) {
          route = {
            path: '/',
            component: defaultLayoutRoute.component,
            hidden: false,
            alwaysShow: false,
            redirect: defaultLayoutRoute.redirect,
            name: uuidv4(),
            children: [
              {
                path: menuItem.path,
                component: asyncRoutes.find(
                  (item) => item.path === menuItem.path
                ).component,
                hidden: menuItem.hidden,
                alwaysShow: menuItem.alwaysShow,
                name: asyncRoutes.find((item) => item.path === menuItem.path)
                  .name,
                meta: {
                  title: menuItem.title,
                  icon: menuItem.icon,
                  noCache: menuItem.noCache,
                  affix: menuItem.affix,
                  breadcrumb: menuItem.breadcrumb,
                  activeMenu: menuItem.activeMenu
                }
              }
            ]
          }
        } else {
          route = {
            path: menuItem.path,
            component: asyncRoutes.find((item) => item.path === menuItem.path)
              .component,
            hidden: menuItem.hidden,
            alwaysShow: menuItem.alwaysShow,
            name: asyncRoutes.find((item) => item.path === menuItem.path).name,
            meta: {
              title: menuItem.title,
              icon: menuItem.icon,
              noCache: menuItem.noCache,
              affix: menuItem.affix,
              breadcrumb: menuItem.breadcrumb,
              activeMenu: menuItem.activeMenu
            }
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
     * @method generateRoutes
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
