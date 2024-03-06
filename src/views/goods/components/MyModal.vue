<template>
  <a-modal v-model:visible="myShow">
    <div class="p-4">MyModal</div>
  </a-modal>
</template>

<script setup>
import { ref, watch } from 'vue'

// 接收
const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['update:show'])
watch(
  () => props.show,
  (val) => {
    myShow.value = val
  }
)

// 中转
const myShow = ref(false)
watch(myShow, (val) => {
  emit('update:show', val)
})
</script>
