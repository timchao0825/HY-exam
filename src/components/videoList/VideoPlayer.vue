<template>
  <div class="video-wrap relative w-full h-full">
    <video-player
      class="video-player w-full h-full"
      crossorigin="anonymous"
      playsinline
      :poster="props.cover"
      :sources="props.source"
      :control-bar="{
        progressControl: false,
        currentTimeDisplay: false,
        remainingTimeDisplay: false
      }"
      :html5="{
        vhs: {
          overrideNative: !isSafari,
          maxPlaylistRetries: Infinity
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false
      }"
      @mounted="handleMounted"
      @ready="handleReady"
    />
    <div class="cover" @click="toggleVideo">
      <div
        class="video-hit w-full h-full flex justify-center items-center"
        :class="{ hidden: isVideoPlay === true }"
      >
        <img class="w-[50px] h-[50px]" :src="playIcon" alt="" srcset="" />
      </div>
    </div>
    <!-- TODO: safari vue bind style not reactive -->
    <div class="progress-bar" @click="toggleProgressBar($event)">
      <div class="length" :style="`width: ${progressBar}%`"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, watch } from 'vue'
import playIcon from '../../images/play-icon.png'
import videojs from 'video.js'
const props = defineProps(['cover', 'source', 'videoState'])
const player = shallowRef()
const isSafari = videojs.browser.IS_SAFARI
const isVideoPlay = ref(false)
const progressBar = ref(0)

watch(
  () => props.videoState,
  (state) => {
    if (state === 'pause') {
      player.value?.pause()
      isVideoPlay.value = false
    } else {
      player.value?.play()
      isVideoPlay.value = true
    }
  }
)

const handleMounted = (payload) => {
  player.value = payload.player
}

const handleReady = () => {
  // https://github.com/videojs/http-streaming#vhsxhr
  const { vhs } = player.value?.tech()
  vhs.xhr.beforeRequest = (options) => {
    return options
  }

  player.value.on('timeupdate', function () {
    updateProgressBar()
  })
}

const updateProgressBar = () => {
  const currentTime = player.value.currentTime()
  const durationTime = player.value.duration()
  progressBar.value = (currentTime / durationTime) * 100
}

const toggleProgressBar = (e) => {
  const barWidth = e.target.clientWidth

  const elRect = e.target.getBoundingClientRect()
  const offsetX = isSafari ? e.clientX + elRect.left : e.clientX - elRect.left
  const duration = player.value.duration()
  const targetTime = (offsetX / barWidth) * duration
  player.value.currentTime(targetTime)
}

const toggleVideo = () => {
  const playerPaused = player.value?.paused()
  if (playerPaused) {
    player.value?.play()
    isVideoPlay.value = true
  } else {
    player.value?.pause()
    isVideoPlay.value = false
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  .cover {
    position: absolute;
    z-index: 1;
    background-color: transparent;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .video-hit {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
  }
}
.progress-bar {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background: #eee;
  .length {
    width: 0;
    height: 100%;
    background: red;
  }
}
</style>
