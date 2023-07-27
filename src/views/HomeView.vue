<template>
  <HeaderNavTab />
  <div class="main-wrap">
    <swiper
      v-show="navTabActive === 'following'"
      class="followingSwiper h-full"
      :direction="'vertical'"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="list in followingData" :key="list.title">
        <VideoPlayer :videoState="list.videoState" :cover="list.cover" :source="list.play_url" />
        <span class="video-title">{{ list.title }}</span>
      </swiper-slide>
    </swiper>

    <swiper
      v-show="navTabActive === 'foryou'"
      class="foryouSwiper h-full"
      :direction="'vertical'"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="list in foryouData" :key="list.title">
        <VideoPlayer :videoState="list.videoState" :cover="list.cover" :source="list.play_url" />
        <span class="video-title">{{ list.title }}</span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import HeaderNavTab from '../components/layout/HeaderNavTab.vue'
import VideoPlayer from '../components/videoList/VideoPlayer.vue'
import { followingList, forYouList } from '../../api/videoList.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
// store
const store = useStore()

const followingData = ref([])
const foryouData = ref([])

const navTabActive = computed(() => store.state.navTab)

const recordFollowingList = ref([])
const recordForyouList = ref([])

watch(
  () => store.state.navTab,
  (newTab, oldTab) => {
    if (newTab === 'foryou') {
      // record following list play number
      followingData.value.forEach((el, idx) => {
        if (el.videoState === 'play') {
          recordFollowingList.value = ['following', idx]
          el.videoState = 'pause'
        }
      })
      // set for you list play
      if (recordForyouList.value.length !== 0) {
        const targetPlayerNum = recordForyouList.value[1]
        foryouData.value[targetPlayerNum].videoState = 'play'
      } else {
        // no data , start from 0
        const targetPlayerNum = 0
        foryouData.value[targetPlayerNum].videoState = 'play'
      }
    }

    if (newTab === 'following') {
      foryouData.value.forEach((el, idx) => {
        if (el.videoState === 'play') {
          recordForyouList.value = ['foryou', idx]
          el.videoState = 'pause'
        }
      })
      if (recordFollowingList.value.length !== 0) {
        const targetPlayerNum = recordFollowingList.value[1]
        followingData.value[targetPlayerNum].videoState = 'play'
      } else {
        // no data , start from 0
        const targetPlayerNum = 0
        followingData.value[targetPlayerNum].videoState = 'play'
      }
    }
  }
)

const onSlideChange = (swiper) => {
  const activeIndex = swiper.activeIndex
  const swiperClassName = swiper.el.className

  const videoData = getVideoData(swiperClassName)
  if (videoData) {
    updateVideoState(videoData, activeIndex)
  }
}

const getVideoData = (className) => {
  if (className.includes('followingSwiper')) {
    return followingData.value
  } else if (className.includes('foryouSwiper')) {
    return foryouData.value
  }
  return null
}

const updateVideoState = (data, idx) => {
  data.forEach((el, i) => {
    el.videoState = idx === i ? 'play' : 'pause'
  })
}

onMounted(async () => {
  try {
    const {
      data: { items }
    } = await followingList()
    items.forEach((el, idx) => {
      el.videoState = idx === 0 ? 'play' : 'pause'
    })

    followingData.value = items
  } catch (error) {
    throw new Error(error)
  }

  try {
    const {
      data: { items }
    } = await forYouList()
    items.forEach((el) => {
      el.videoState = 'pause'
    })

    foryouData.value = items
  } catch (error) {
    throw new Error(error)
  }
})
</script>

<style lang="scss" scoped>
.video-title {
  z-index: 3;
  position: absolute;
  left: 16px;
  bottom: 16px;
}
</style>
