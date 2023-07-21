import { createStore } from 'vuex'
const layoutStore = createStore({
  state() {
    return {
      navTab: 'following'
    }
  },
  mutations: {
    toggleNavTab(state, payload) {
      state.navTab = payload
    }
  }
})

export default layoutStore
