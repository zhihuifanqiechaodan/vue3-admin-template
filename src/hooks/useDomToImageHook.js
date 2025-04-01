import domToImage from 'dom-to-image'

/**
 * @typedef {Object} DomToImageOptions
 * @property {number} [quality] - JPEG 图片质量 0-1
 * @property {number} [width] - 输出图片宽度
 * @property {number} [height] - 输出图片高度
 * @property {string} [bgcolor] - 背景颜色
 * @property {boolean} [skipAutoScale] - 是否跳过自动缩放
 */

/**
 * DOM 节点转换为图片并下载
 */
export default () => {
  /**
   * 检查节点是否有效
   * @param {HTMLElement} node - DOM 节点
   * @throws {Error} 如果节点无效则抛出错误
   */
  const validateNode = (node) => {
    if (!node || !(node instanceof HTMLElement)) {
      throw new Error('无效的 DOM 节点')
    }
  }

  /**
   * 处理转换选项
   * @param {DomToImageOptions} options - 原始选项
   * @returns {DomToImageOptions} 处理后的选项
   */
  const processOptions = (options) => {
    const defaultOptions = {
      quality: 0.95,
      bgcolor: '#ffffff'
    }
    return { ...defaultOptions, ...options }
  }

  /**
   * 转换并下载图片的通用方法
   * @param {Function} converter - 转换方法
   * @param {HTMLElement} node - DOM 节点
   * @param {DomToImageOptions} options - 配置选项
   * @param {string} fileName - 文件名
   * @param {string} ext - 文件扩展名
   * @returns {Promise<string>} 返回图片的 data URL
   */
  const convertAndDownload = async (
    converter,
    node,
    options,
    fileName,
    ext
  ) => {
    try {
      validateNode(node)
      const processedOptions = processOptions(options)

      // 如果没有设置尺寸且不跳过自动缩放，则使用节点的实际尺寸
      if (!processedOptions.width && !processedOptions.skipAutoScale) {
        const rect = node.getBoundingClientRect()
        processedOptions.width = rect.width
        processedOptions.height = rect.height
      }

      const dataUrl = await converter(node, processedOptions)
      downloadImage(dataUrl, fileName, ext)
      return dataUrl
    } catch (error) {
      console.error(`转换${ext}图片失败:`, error)
      throw error
    }
  }

  /**
   * 下载图片
   * @param {HTMLElement} node - DOM 节点
   * @param {Object} options - 配置选项
   * @param {string} [options.type='png'] - 图片格式，支持 'png'、'jpeg'、'svg'
   * @param {string} [options.fileName='domToImage'] - 文件名
   * @param {DomToImageOptions} [options.imageOptions] - 图片转换配置
   * @returns {Promise<string>} 返回图片的 data URL
   */
  const downloadImage = async (node, options = {}) => {
    const { type = 'png', fileName = 'domToImage', imageOptions = {} } = options

    const converters = {
      png: domToImage.toPng,
      jpeg: domToImage.toJpeg,
      svg: domToImage.toSvg
    }

    const converter = converters[type.toLowerCase()]
    if (!converter) {
      throw new Error('不支持的图片格式')
    }

    return convertAndDownload(converter, node, imageOptions, fileName, type)
  }

  /**
   * 获取图片 URL
   * @param {HTMLElement} node - DOM 节点
   * @param {Object} options - 配置选项
   * @param {string} [options.type='png'] - 图片格式，支持 'png'、'jpeg'、'svg'
   * @param {DomToImageOptions} [options.imageOptions] - 图片转换配置
   * @returns {Promise<string>} 图片的 data URL
   */
  const getUrl = async (node, options = {}) => {
    const { type = 'png', imageOptions = {} } = options

    const converters = {
      png: domToImage.toPng,
      jpeg: domToImage.toJpeg,
      svg: domToImage.toSvg
    }

    const converter = converters[type.toLowerCase()]
    if (!converter) {
      throw new Error('不支持的图片格式')
    }

    try {
      validateNode(node)
      const processedOptions = processOptions(imageOptions)
      return await converter(node, processedOptions)
    } catch (error) {
      console.error('获取图片 URL 失败:', error)
      throw error
    }
  }

  return {
    downloadImage,
    getUrl
  }
}
