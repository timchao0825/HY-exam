<template>
  <nav class="header-nav-tag flex items-center text-base font-medium">
    <div class="nav-tag cursor-pointer font-black text-[18px] mr-5 transition-all duration-300">
      Following
    </div>
    <div class="nav-tag cursor-pointer font-black text-[18px] transition-all duration-300">
      For You
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.header-nav-tag {
  position: fixed;
  z-index: 5;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  .nav-tag {
    color: var(--color-gray);
    &:hover {
      color: var(--color-white);
    }
  }
}
</style>
