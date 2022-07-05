import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { setCookies, getCookies } from '@/utils/storage'
const { showSettings, tagsView, fixedHeader, sidebarStatus, sidebarLogo } = defaultSettings

export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            showSettings: showSettings, // 展示设置
            tagsView: tagsView, // tags展示状态
            fixedHeader: fixedHeader, // 固定头部
            sidebarLogo: sidebarLogo, // 侧边栏logo
            sidebarStatus: getCookies('sidebarStatus') ? !!+getCookies('sidebarStatus') : sidebarStatus // 侧边栏状态
        }
    },
    actions: {
        toggleSideBar() {
            this.sidebarStatus = !this.sidebarStatus
            if (this.sidebarStatus) {
                setCookies('sidebarStatus', 1)
            } else {
                setCookies('sidebarStatus', 0)
            }
        },
    }
})