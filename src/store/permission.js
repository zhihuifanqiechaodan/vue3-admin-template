import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param asyncRoutes
 * @param routes
 */
export function filterAsyncRoutes(asyncRoutes, routes) {
  const res = []
  asyncRoutes.forEach((route) => {
    const tmp = { ...route }
    const findRoute = routes.find((item) => item.path === route.path)
    if (findRoute) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, findRoute.children)
      }
      res.push(tmp)
    }
  })

  return res
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
    generateRoutes({ roles, routes }) {
      return new Promise((resolve) => {
        const accessedRoutes = roles.includes('admin')
          ? asyncRoutes || []
          : filterAsyncRoutes(asyncRoutes, routes)

        accessedRoutes.push(
          // 404 page must be placed at the end !!!
          { path: '/:pathchMatch(.*)', redirect: '/404' }
        )
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
