import { request } from '@/utils/request'

/**
 * @method addSystemLogin
 * @param {*} data
 * @returns
 */
export const addSystemLogin = (data) => {
  return request({ url: '/system/login', method: 'post', data })
}

/**
 * @method addSystemUserAddUser
 * @param {*} data
 * @returns
 */
export const addSystemUserAddUser = (data) => {
  return request({ url: '/system/user/add_user', method: 'post', data })
}

/**
 * @method addSystemMenuAddMenu
 * @param {*} data
 * @returns
 */
export const addSystemMenuAddMenu = (data) => {
  return request({ url: '/system/menu/add_menu', method: 'post', data })
}

/**
 * @method addSystemMenuGetMenuList
 * @param {*} data
 * @returns
 */
export const addSystemMenuGetMenuList = (data) => {
  return request({ url: '/system/menu/get_menu_list', method: 'post', data })
}

/**
 * @method addSystemMenuGetAllMenuList
 * @param {*} data
 * @returns
 */
export const addSystemMenuGetAllMenuList = (data) => {
  return request({
    url: '/system/menu/get_all_menu_list',
    method: 'post',
    data
  })
}

/**
 * @method addSystemRoleAddRole
 * @param {*} data
 * @returns
 */
export const addSystemRoleAddRole = (data) => {
  return request({ url: '/system/role/add_role', method: 'post', data })
}

/**
 * @method addSystemRoleGetRoleList
 * @param {*} data
 * @returns
 */
export const addSystemRoleGetRoleList = (data) => {
  return request({ url: '/system/role/get_role_list', method: 'post', data })
}
