import { request } from '@/utils/request'

/**
 * @method getMenuList
 * @param {*} data
 * @returns
 */
export function getMenuList(data) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: data
  })
}

/**
 * @method addMenuCreate
 * @param {*} data
 * @returns
 */
export function addMenuCreate(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data
  })
}
