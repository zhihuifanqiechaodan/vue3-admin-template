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

export const findItemWithPath = (data) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]

    if (item.type === 1) {
      return item.path
    } else if (item.children && item.children.length > 0) {
      const foundPath = findItemWithPath(item.children)

      if (foundPath) {
        return item.path + '/' + foundPath
      }
    }
  }
}
