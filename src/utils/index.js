import { cloneDeep as _cloneDeep } from 'lodash-es'

export const menuListSort = (menuList) => {
  const sortedList = _cloneDeep(menuList)

  sortedList.sort((a, b) => b.sortIndex - a.sortIndex)

  sortedList.forEach((item) => {
    if (item.children) {
      item.children = menuListSort(item.children)
    }
  })

  return sortedList
}
