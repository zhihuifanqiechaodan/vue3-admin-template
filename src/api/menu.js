import { request } from '@/utils/request'

export default {
  /**
   * @method getMenuList
   * @param {*} data
   * @returns
   */
  getMenuList: (data) => {
    return request({
      url: '/menu/list',
      method: 'get',
      params: data
    })
  },

  /**
   * @method addMenuCreate
   * @param {*} data
   * @returns
   */
  addMenuCreate: (data) => {
    return request({
      url: '/menu/create',
      method: 'post',
      data
    })
  },

  /**
   * @method addMenuUpdateSort
   * @param {*} data
   * @returns
   */
  addMenuUpdateSort: (data) => {
    return request({
      url: '/menu/update_sort',
      method: 'post',
      data
    })
  }
}
