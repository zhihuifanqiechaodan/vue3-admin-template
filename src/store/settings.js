import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { setCookies, getCookies } from '@/utils/storage'
const { showSettings, tagsView, fixedHeader, sidebarOpenStatus, sidebarLogo } = defaultSettings


export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            showSettings: showSettings, // 展示设置
            tagsView: tagsView, // tags展示状态
            fixedHeader: fixedHeader, // 固定头部
            sidebarLogo: sidebarLogo, // 侧边栏logo
            sidebarOpenStatus: getCookies('sidebarOpenStatus') ? !!+getCookies('sidebarOpenStatus') : sidebarOpenStatus, // 侧边栏状态
            size: getCookies('sidebarOpenStatus') || 'small' // 组件默认大小
        }
    },
    actions: {
        toggleSideBar() {
            this.sidebarOpenStatus = !this.sidebarOpenStatus
            if (this.sidebarOpenStatus) {
                setCookies('sidebarOpenStatus', 1)
            } else {
                setCookies('sidebarOpenStatus', 0)
            }
        },
        setSize(size) {
            this.size = size
            setCookies('size', size)
        },
    }
})