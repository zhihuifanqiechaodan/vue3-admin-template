import { base64ToFile } from '@/utils/index'
import html2canvas from 'html2canvas'

export default () => {
  const toJpegFile = (node, options = {}) => {
    return new Promise((resolve) => {
      html2canvas(node, {
        useCORS: true,
        ...options
      }).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png')
        const file = base64ToFile(dataUrl.replace('data:image/png;base64,', ''))
        resolve(file)
      })
    })
  }

  return { toJpegFile }
}
