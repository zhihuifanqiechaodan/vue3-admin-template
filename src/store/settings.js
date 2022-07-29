import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { setCookies, getCookies } from '@/utils/storage'
const { layoutMode, menuWidth, showSettings, tagsView, fixedHeader, menuLogo, menuCollapse, size, menuBackgroundColor, menuTextColor, menuActiveBackgroundColor, menuActiveTextColor, menuDefaultIcon } = defaultSettings
export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            /**
             * 全局
             */
            // 布局方式
            layoutMode: getCookies('layoutMode') || layoutMode,
            // 默认全局尺寸, 可选值 large / default /small
            size: getCookies('size') || size,
            // 展示设置
            showSettings,
            // 是否固定header
            fixedHeader: getCookies('fixedHeader') !== undefined ? getCookies('fixedHeader') : fixedHeader,
            // 是否展示tagsView
            tagsView: getCookies('tagsView') !== undefined ? getCookies('tagsView') : fixedHeader,
            // 是否显示Logo
            menuLogo: getCookies('menuLogo') !== undefined ? getCookies('menuLogo') : menuLogo,

            /**
             * 侧边栏菜单
             */
            //菜单宽度(展开时)，单位px
            menuWidth: getCookies('menuWidth') !== undefined ? getCookies('menuWidth') : menuWidth,
            // 是否水平折叠收起菜单
            menuCollapse: getCookies('menuCollapse') ? JSON.parse(getCookies('menuCollapse')) : menuCollapse,
            menuBackgroundColor: getCookies('menuBackgroundColor') !== undefined ? getCookies('menuBackgroundColor') : menuBackgroundColor,
            menuTextColor: getCookies('menuTextColor') !== undefined ? getCookies('menuTextColor') : menuTextColor,
            menuActiveBackgroundColor: getCookies('menuActiveBackgroundColor') !== undefined ? getCookies('menuActiveBackgroundColor') : menuActiveBackgroundColor,
            menuActiveTextColor: getCookies('menuActiveTextColor') !== undefined ? getCookies('menuActiveTextColor') : menuActiveTextColor,
            menuDefaultIcon
        }
    },
    actions: {
        toggleSideBar() {
            this.menuCollapse = !this.menuCollapse
            if (this.menuCollapse) {
                this.menuWidth = 64
                setCookies('menuCollapse', true)
                setCookies('menuWidth', 64)
            } else {
                this.menuWidth = 210
                setCookies('menuCollapse', false)
                setCookies('menuWidth', 210)
            }
        },
        setSize(size) {
            this.size = size
            setCookies('size', size)
        },
        changeSetting({ key, value }) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.hasOwnProperty(key)) {
                this[key] = value
            }
        }
    }
})