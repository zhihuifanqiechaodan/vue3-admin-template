import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { getCookieItem, setCookieItem } from '@/utils/storage'
const {
  layoutMode,
  menuWidth,
  showSettings,
  tagsView,
  menuLogo,
  menuCollapse,
  size,
  menuBackgroundColor,
  menuTextColor,
  menuActiveBackgroundColor,
  menuActiveTextColor,
  menuDefaultIcon,
  menuUniqueOpened,
  locale
} = defaultSettings

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      /**
       * 全局
       */
      // 展示设置
      showSettings,
      // 布局方式 Classic 经典布局 Default默认布局 Streamline 精简布局
      layoutMode: getCookieItem('layoutMode', layoutMode),
      // 默认全局尺寸, 可选值 large / default /small
      size: getCookieItem('size', size),
      // 是否展示tagsView
      tagsView: getCookieItem('tagsView', tagsView),
      // 是否显示Logo
      menuLogo: getCookieItem('menuLogo', menuLogo),
      locale: getCookieItem('locale', locale),
      /**
       * 侧边栏菜单
       */
      // 菜单项默认图标
      menuDefaultIcon,
      //菜单宽度(展开时)，单位px
      menuWidth: getCookieItem('menuWidth', menuWidth),
      // 是否水平折叠收起菜单
      menuCollapse: getCookieItem('menuCollapse', menuCollapse),
      // 背景色
      menuBackgroundColor: getCookieItem(
        'menuBackgroundColor',
        menuBackgroundColor
      ),
      // 文字颜色
      menuTextColor: getCookieItem('menuTextColor', menuTextColor),
      // 激活项背景色
      menuActiveBackgroundColor: getCookieItem(
        'menuActiveBackgroundColor',
        menuActiveBackgroundColor
      ),
      // 激活项文字色
      menuActiveTextColor: getCookieItem(
        'menuActiveTextColor',
        menuActiveTextColor
      ),
      // 是否只保持一个子菜单的展开(手风琴)
      menuUniqueOpened: getCookieItem('menuActiveTextColor', menuUniqueOpened)
    }
  },
  actions: {
    changeSetting({ key, value }) {
      this[key] = value
      setCookieItem(key, value)
    },
    restoreDefault() {
      this.changeSetting({ key: 'layoutMode', value: layoutMode })
      this.changeSetting({ key: 'size', value: size })
      this.changeSetting({ key: 'tagsView', value: tagsView })
      this.changeSetting({ key: 'menuLogo', value: menuLogo })
      this.changeSetting({ key: 'menuWidth', value: menuWidth })
      this.changeSetting({ key: 'menuCollapse', value: menuCollapse })
      this.changeSetting({
        key: 'menuBackgroundColor',
        value: menuBackgroundColor
      })
      this.changeSetting({ key: 'menuTextColor', value: menuTextColor })
      this.changeSetting({
        key: 'menuActiveBackgroundColor',
        value: menuActiveBackgroundColor
      })
      this.changeSetting({
        key: 'menuActiveTextColor',
        value: menuActiveTextColor
      })
      this.changeSetting({ key: 'menuUniqueOpened', value: menuUniqueOpened })
    }
  }
})
