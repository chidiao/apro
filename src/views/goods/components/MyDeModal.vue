<template>
  <a-modal v-model:visible="show">
    <div class="p-4">MyModal</div>
  </a-modal>
</template>

<script setup>
const show = defineModel('show')
</script>
