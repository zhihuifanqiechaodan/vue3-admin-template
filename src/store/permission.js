import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
import { useUserStore } from '@/store/user'

/**
 * 检查用户是否有权限访问该路由
 * @param {Array} userPermissions 用户权限列表
 * @param {Object} route 路由对象
 */
function hasPermission(userPermissions, route) {
  if (!route.meta) {
    return true
  }

  // 检查页面权限
  if (route.meta.pageId) {
    if (userPermissions.includes(route.meta.pageId)) {
      return true
    }
  }

  // 检查按钮权限
  if (route.meta.buttonIds) {
    if (
      route.meta.buttonIds.some((button) =>
        userPermissions.includes(button.buttonId)
      )
    ) {
      return true
    }
  }

  return false
}

/**
 * 递归过滤异步路由表
 * @param routes asyncRoutes
 * @param permissionIds 用户权限 {pageIds: [], buttonIds: []}
 */
export function filterAsyncRoutes(routes, permissionIds) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }

    // 检查是否有子路由有权限
    const hasChildPermission =
      tmp.children && filterAsyncRoutes(tmp.children, permissionIds).length > 0

    // 如果当前路由有权限或者子路由有权限，都应该保留当前路由
    if (hasPermission(permissionIds, tmp) || hasChildPermission) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissionIds)
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
     * @method generateRoutes
     */
    generateRoutes() {
      const userStore = useUserStore()
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRoutes(
          asyncRoutes,
          userStore.userInfo.permissionIds
        )
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
