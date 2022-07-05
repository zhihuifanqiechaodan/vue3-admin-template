import { defineStore } from 'pinia'

export const useTagsViewStore = defineStore('tagsView', {
    state: () => {
        return {
            visitedViews: [],
            cachedViews: []
        }
    },
    actions: {
    }
})