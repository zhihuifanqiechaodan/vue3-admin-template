export const base64ToFile = (
  base64Data,
  fileName = `${new Date().getTime()}.jpg`,
  mimeType = 'image/jpeg'
) => {
  try {
    if (!base64Data) {
      throw new Error('base64Data 不能为空')
    }

    // 将 Base64 字符串转换为 Uint8Array
    const binaryData = atob(base64Data)
    const arrayBuffer = new ArrayBuffer(binaryData.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i)
    }

    // 创建 Blob 对象
    const blob = new Blob([uint8Array], { type: mimeType })

    // 创建 File 对象
    const file = new File([blob], fileName, { type: mimeType })
    return file
  } catch (error) {
    console.error('Base64转File失败:', error)
    throw error
  }
}
