import { ElMessageBox } from 'element-plus'
import settings from '@/settings'

const { unAutoUpdateEnv } = settings

let lastSrcs
let lastSrcsCopy
let needTip = true
const trainTime = 10
const delayTime = 30
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
  lastSrcsCopy = lastSrcs
  lastSrcs = newScripts
  return result
}

const autoRefresh = () => {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
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
            needTip = true
            lastSrcs = lastSrcsCopy
            autoRefresh()
          })
      }, 1000 * delayTime)
      needTip = false
    }
    if (needTip) {
      autoRefresh()
    }
  }, 1000 * trainTime)
}

export default {
  install() {
    if (unAutoUpdateEnv.includes(import.meta.env.VITE_NODE_ENV)) return

    autoRefresh()
  }
}
