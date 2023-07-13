<template>
  <footer class="fixed w-full h-[50px] flex justify-around items-center">
    <RouterLink
      to="/"
      class="cursor-pointer w-full h-full flex justify-center items-center transition-all duration-300"
      :class="{ active: routeName === 'home' }"
    >
      Home
    </RouterLink>
    <RouterLink
      to="/discover"
      class="cursor-pointer w-full h-full flex justify-center items-center transition-all duration-300"
      :class="{ active: routeName === 'discover' }"
    >
      Discover
    </RouterLink>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const routeName = computed(() => router.currentRoute.value.name)
</script>

<style lang="scss" scoped>
footer {
  left: 0;
  bottom: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  a {
    color: var(--color-gray);
    &.active {
      color: var(--color-white);
      font-weight: 900;
    }
  }
}
</style>
