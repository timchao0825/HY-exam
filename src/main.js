import './assets/main.css'

import { createApp } from 'vue'
import layoutStore from './stores/layout'

import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createPinia())
app.use(layoutStore)
app.use(router)
app.use(VueVideoPlayer)

app.mount('#app')
