<template>
  <div class="video-wrap relative w-full h-full">
    <video-player
      class="video-player w-full h-full"
      crossorigin="anonymous"
      playsinline
      :poster="props.cover"
      :src="props.source"
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
    <div class="progress-bar">
      <input
        ref="audioProgressBar"
        class="progress"
        type="range"
        min="0"
        max="100"
        step="0.001"
        :value="audioPercent"
        @input="audioInput"
        @mousedown="startAudioDrag"
        @mouseup="endAudioDrag"
      />
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
const audioPercent = ref(0)
const audioProgressBar = ref(null)

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
  player.value.on('timeupdate', function () {
    updateProgressBar()
  })
}

const updateProgressBar = () => {
  const currentTime = player.value.currentTime()
  const durationTime = player.value.duration()
  const percentTime = ((currentTime / durationTime) * 100).toFixed(2)
  audioPercent.value = percentTime
  audioProgressBar.value.style.background = `linear-gradient(to right, red 0%, red ${percentTime}%, #DDDDDD ${percentTime}%, #DDDDDD 100%)`
}

const audioInput = (e) => {
  const targetValue = e.target.value
  const duration = player.value.duration()
  const percentTime = (targetValue * duration) / 100
  player.value.currentTime(percentTime)
}

const startAudioDrag = () => {
  player.value.pause()
  isVideoPlay.value = false
}

const endAudioDrag = (e) => {
  const targetValue = e.target.value
  const duration = player.value.duration()
  const percentTime = ((targetValue * duration) / 100).toFixed(2)
  player.value.currentTime(percentTime)
  player.value?.play()
  isVideoPlay.value = true
}

const toggleVideo = () => {
  const playerValue = player.value

  if (playerValue) {
    const isPaused = playerValue.paused()

    if (isPaused) {
      playerValue.play()
      isVideoPlay.value = true
    } else {
      playerValue.pause()
      isVideoPlay.value = false
    }
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
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  .progress {
    -webkit-appearance: none;
    display: block;
    width: 100%;
    height: 10px;
    border: none;
    outline: none;
    transition: background 0.45s ease-in;
    cursor: pointer;
  }

  .progress::-webkit-slider-thumb {
    opacity: 0;
    outline: none;
    box-shadow: none;
    border: none;
  }
  .progress::-moz-range-thumb {
    opacity: 0;
    outline: none;
    box-shadow: none;
    border: none;
  }
}
</style>
