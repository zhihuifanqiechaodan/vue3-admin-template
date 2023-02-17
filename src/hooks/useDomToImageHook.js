import domToImage from 'dom-to-image'

export default () => {
  /**
   * @method toJpeg dom 转 jpeg
   * @param {*} node dom 节点
   * @param {*} options 配置
   * @param {string} fileName 文件名称 默认 domToImage
   */
  const toJpeg = async (node, options = {}, fileName = 'domToImage') => {
    domToImage.toJpeg(node, options).then(function (dataUrl) {
      const link = document.createElement('a')
      link.download = `${fileName}.jpeg`
      link.href = dataUrl
      link.click()
    })
  }
  /**
   * @method toPng dom 转 png
   * @param {*} node dom 节点
   * @param {*} options 配置
   * @param {string} fileName 文件名称 默认 domToImage
   */
  const toPng = async (node, options = {}, fileName = 'domToImage') => {
    domToImage.toPng(node, options).then(function (dataUrl) {
      const link = document.createElement('a')
      link.download = `${fileName}.png`
      link.href = dataUrl
      link.click()
    })
  }

  // 更多模式和方法查看文档添加

  return { toJpeg, toPng }
}
