<template>
  <main class="max-w-[414px] w-full fixed">
    <Header />
    <RouterView />
    <Footer />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

onMounted(() => {
  window.addEventListener('resize', documentHeight)
  documentHeight()
})

const documentHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
}
</script>

<style lang="scss" scoped>
main {
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: var(--color-gray) 0px 1px 16px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  height: var(--doc-height);
}
</style>
