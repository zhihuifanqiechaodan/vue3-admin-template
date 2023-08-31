import { defineStore } from 'pinia'
import {
  constantRoutes,
  asyncRoutes,
  defaultLayoutRoute,
  layoutRoutes
} from '@/router'
import { v4 as uuidv4 } from 'uuid'
import { menuListSort } from '@/utils/index'

/**
 * @method convertToTree
 * @param menuList
 * @param parentId
 */
export function convertToTree(menuList, parentId = 0) {
  try {
    const routes = []

    for (const menuItem of menuList) {
      if (menuItem.parentId === parentId) {
        let route

        if (menuItem.type === 0) {
          if (layoutRoutes.find((item) => item.layout === menuItem.layout)) {
            route = {
              path: '/',
              component: layoutRoutes.find(
                (item) => item.layout === menuItem.layout
              ).component,
              hidden: menuItem.hidden,
              alwaysShow: menuItem.alwaysShow,
              redirect: defaultLayoutRoute.redirect,
              name: uuidv4(),
              meta: {
                title: menuItem.title,
                icon: menuItem.icon
              },
              sortIndex: menuItem.sortIndex
            }
          } else {
            console.log(
              '🚀 ~ file: permission.js:42 ~ convertToTree ~ :',
              '不存在当前layout'
            )
          }
        } else if (menuItem.type === 1) {
          if (asyncRoutes.find((item) => item.path === menuItem.path)) {
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
                    name: asyncRoutes.find(
                      (item) => item.path === menuItem.path
                    ).name,
                    meta: {
                      title: menuItem.title,
                      icon: menuItem.icon,
                      noCache: menuItem.noCache,
                      affix: menuItem.affix,
                      breadcrumb: menuItem.breadcrumb,
                      activeMenu: menuItem.activeMenu
                    },
                    sortIndex: menuItem.sortIndex
                  }
                ],
                sortIndex: menuItem.sortIndex
              }
            } else {
              route = {
                path: menuItem.path,
                component: asyncRoutes.find(
                  (item) => item.path === menuItem.path
                ).component,
                hidden: menuItem.hidden,
                name: asyncRoutes.find((item) => item.path === menuItem.path)
                  .name,
                meta: {
                  title: menuItem.title,
                  icon: menuItem.icon,
                  noCache: menuItem.noCache,
                  affix: menuItem.affix,
                  breadcrumb: menuItem.breadcrumb,
                  activeMenu: menuItem.activeMenu
                },
                sortIndex: menuItem.sortIndex
              }
            }
          } else {
            console.log(
              '🚀 ~ file: permission.js:102 ~ convertToTree ~ :',
              '不存在当前path'
            )
          }
        }

        const children = convertToTree(menuList, menuItem.id)

        if (route && children.length > 0) {
          route.children = children
        }

        if (menuItem.type === 0 && !children.length) {
          route.hidden = true
        }

        route && routes.push(route)
      }
    }

    return routes
  } catch (error) {
    console.log('🚀 ~ file: permission.js:103 ~ convertToTree ~ error:', error)
  }
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

        const sortSccessedRoutes = menuListSort(accessedRoutes)

        this.addRoutes = sortSccessedRoutes

        this.routes = constantRoutes.concat(sortSccessedRoutes)

        resolve(sortSccessedRoutes)
      })
    }
  }
})
