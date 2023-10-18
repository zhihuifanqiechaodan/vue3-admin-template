import { defineStore } from 'pinia'
import {
  constantRoutes,
  asyncRoutes,
  defaultLayoutRoute,
  layoutRoutes
} from '@/router'
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
              path: `/${menuItem.cataloguePath}`,
              component: layoutRoutes.find(
                (item) => item.layout === menuItem.layout
              ).component,
              hidden: menuItem.hidden,
              alwaysShow: menuItem.show,
              redirect: defaultLayoutRoute.redirect,
              name: menuItem.cataloguePath,
              meta: {
                title: menuItem.title,
                icon: menuItem.icon
              },
              sort: menuItem.sort,
              type: menuItem.type
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
                path: `/${menuItem.cataloguePath}`,
                component: defaultLayoutRoute.component,
                hidden: false,
                alwaysShow: false,
                redirect: defaultLayoutRoute.redirect,
                name: menuItem.cataloguePath,
                children: [
                  {
                    path: menuItem.path,
                    component:
                      asyncRoutes.find((item) => item.path === menuItem.path)
                        ?.component || '',
                    hidden: menuItem.hidden,
                    name: asyncRoutes.find(
                      (item) => item.path === menuItem.path
                    ).name,
                    meta: {
                      title: menuItem.title,
                      icon: menuItem.icon,
                      noCache: menuItem.cache,
                      affix: menuItem.affix,
                      breadcrumb: menuItem.breadcrumb,
                      activeMenu: menuItem.activeMenu,
                      permissions: menuItem.permissions
                    },
                    sort: menuItem.sort,
                    type: menuItem.type
                  }
                ],
                sort: menuItem.sort,
                type: 0
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
                  cache: menuItem.cache,
                  affix: menuItem.affix,
                  breadcrumb: menuItem.breadcrumb,
                  activeMenu: menuItem.activeMenu,
                  permissions: menuItem.permissions
                },
                sort: menuItem.sort,
                type: menuItem.type
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

        // 如果为目录且没有子菜单，则总是展示目录，当然也可以隐藏该目录
        if (menuItem.type === 0 && !children.length) {
          route.alwaysShow = true
          // route.hidden = true
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
        const menuOrCatalogueList = menuList.filter((item) => item.type !== 2)

        const buttonList = menuList.filter((item) => item.type === 2)

        menuOrCatalogueList.forEach((menuOrCatalogueListItem) => {
          if (menuOrCatalogueListItem.type === 1) {
            menuOrCatalogueListItem.permissions = buttonList
              .filter(
                (buttonListItem) =>
                  buttonListItem.parentId === menuOrCatalogueListItem.id
              )
              .map((item) => item.buttonId)
          }
        })

        const accessedRoutes = convertToTree(menuOrCatalogueList)

        const sortSccessedRoutes = menuListSort(accessedRoutes)

        this.addRoutes = sortSccessedRoutes

        this.routes = constantRoutes.concat(sortSccessedRoutes)

        resolve(sortSccessedRoutes)
      })
    }
  }
})
