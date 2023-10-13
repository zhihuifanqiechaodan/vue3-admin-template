import { cloneDeep as _cloneDeep } from 'lodash-es'

/**
 * @method menuListSort
 * @param {*} data
 * @returns
 */
export const menuListSort = (data) => {
  const sortedList = _cloneDeep(data)

  sortedList.sort((a, b) => b.sort - a.sort)

  sortedList.forEach((item) => {
    if (item.children) {
      item.children = menuListSort(item.children)
    }
  })

  return sortedList
}

/**
 * @method findItemWithPath
 * @param {*} data
 * @returns
 */
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

/**
 * @method convertToTree
 * @param {*} nodes
 * @param {*} parentId
 * @returns
 */
export const convertToTree = (nodes, parentId = 0) => {
  const result = []

  for (const node of nodes) {
    if (node.parentId === parentId) {
      const newNode = { ...node }

      const children = convertToTree(nodes, node.id)

      newNode.children = children

      result.push(newNode)
    }
  }
  return result
}
