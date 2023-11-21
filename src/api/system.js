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
 * @method addSystemUserGetUserList
 * @param {*} data
 * @returns
 */
export const addSystemUserGetUserList = (data) => {
  return request({ url: '/system/user/get_user_list', method: 'post', data })
}

/**
 * @method addSystemUserUpdateUser
 * @param {*} data
 * @returns
 */
export const addSystemUserUpdateUser = (data) => {
  return request({ url: '/system/user/update_user', method: 'post', data })
}

/**
 * @method addSystemUserUpdateUserMenu
 * @param {*} data
 * @returns
 */
export const addSystemUserUpdateUserMenu = (data) => {
  return request({ url: '/system/user/update_user_menu', method: 'post', data })
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
 * @method addSystemMenuMenuSort
 * @param {*} data
 * @returns
 */
export const addSystemMenuMenuSort = (data) => {
  return request({
    url: '/system/menu/menu_sort',
    method: 'post',
    data
  })
}

/**
 * @method addSystemMenuUpdateMenu
 * @param {*} data
 * @returns
 */
export const addSystemMenuUpdateMenu = (data) => {
  return request({
    url: '/system/menu/update_menu',
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
 * @method addSystemRoleUpdateRole
 * @param {*} data
 * @returns
 */
export const addSystemRoleUpdateRole = (data) => {
  return request({ url: '/system/role/update_role', method: 'post', data })
}

/**
 * @method addSystemRoleGetRoleList
 * @param {*} data
 * @returns
 */
export const addSystemRoleGetRoleList = (data) => {
  return request({ url: '/system/role/get_role_list', method: 'post', data })
}
