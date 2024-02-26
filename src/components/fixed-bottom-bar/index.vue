<template>
  <div class="w-full fixed bottom-0 right-0 flex justify-end items-center bg-white">
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  width: calc(100vw - var(--menu-width) * 1px);
  transition: width 0.3s;
}
</style>
