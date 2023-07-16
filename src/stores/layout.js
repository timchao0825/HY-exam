import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => {
    return { navTab: 'following' }
  },
  actions: {
    toggleNavTab(tagName) {
      this.navTab = tagName
    }
  }
})
