import { ElMessageBox } from 'element-plus'
import settings from '@/settings'

const { unAutoUpdateEnv } = settings

let lastSrcs //上一次获取到的script地址
let needTip = true // 默认开启提示

const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm

const extractNewScripts = async () => {
  const html = await fetch('/?_timestamp=' + Date.now()).then((resp) =>
    resp.text()
  )
  scriptReg.lastIndex = 0
  let result = []
  let match
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups?.src)
  }
  return result
}

const needUpdate = async () => {
  const newScripts = await extractNewScripts()
  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }
  let result = false
  if (lastSrcs.length !== newScripts.length) {
    result = true
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true
      break
    }
  }
  lastSrcs = newScripts
  return result
}
const DURATION = 10000

const autoRefresh = () => {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      // 延时更新，防止部署未完成用户就刷新空白
      setTimeout(() => {
        ElMessageBox.confirm(
          '检测到页面有内容更新，为了功能的正常使用，是否立即刷新？',
          '更新提示',
          {
            confirmButtonText: '确认',
            showCancelButton: false,
            type: 'warning'
          }
        )
          .then(() => {
            location.reload()
          })
          .catch(() => {
            needTip = true // 开启更新提示，防止重复提醒
          })
      }, 1000 * 30)
      needTip = false // 关闭更新提示，防止重复提醒
    }
    if (needTip) {
      autoRefresh()
    }
  }, DURATION)
}

export default {
  install() {
    if (unAutoUpdateEnv.includes(import.meta.env.VITE_NODE_ENV)) return

    autoRefresh()
  }
}
