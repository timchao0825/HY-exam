<template>
  <nav class="header-nav-tag flex items-center text-base font-medium">
    <div
      class="nav-tag relative cursor-pointer font-black text-[18px] mr-5 transition-all duration-300"
      @click="toggleNavTab('following')"
      :class="{ active: navTabActive === 'following' }"
    >
      Following
    </div>
    <div
      class="nav-tag relative cursor-pointer font-black text-[18px] transition-all duration-300"
      @click="toggleNavTab('foryou')"
      :class="{ active: navTabActive === 'foryou' }"
    >
      For You
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
const store = useLayoutStore()
// following or foryou list
const navTabActive = computed(() => store.navTab)
const toggleNavTab = (tabName) => {
  store.toggleNavTab(tabName)
}
</script>

<style lang="scss" scoped>
.header-nav-tag {
  position: fixed;
  z-index: 5;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);

  .nav-tag {
    color: var(--color-gray);

    &:first-child:after {
      content: '';
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 50%;
      background-color: var(--color-gray);
    }

    &.active {
      color: var(--color-white);
    }
  }
}
</style>
