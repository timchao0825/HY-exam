<template>
  <div class="header-nav-tag flex items-center text-base font-medium">
    <a
      class="nav-tag relative cursor-pointer font-black text-[18px] mr-5 transition-all duration-300"
      :class="{ active: navTab === 'following' }"
      @click="toggleNavTab('following')"
    >
      Following
    </a>
    <a
      class="nav-tag relative cursor-pointer font-black text-[18px] transition-all duration-300"
      :class="{ active: navTab === 'foryou' }"
      @click="toggleNavTab('foryou')"
    >
      For You
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const navTab = computed(() => store.state.navTab)
const toggleNavTab = (tabName) => {
  store.commit('toggleNavTab', tabName)
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
