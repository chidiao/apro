<template>
  <div class="p-4 relative">
    <div class="space-y-4 p-4 bg-white">
      <div>普通vmodel封装: {{ show1 }}</div>
      <div>definemodel: {{ show2 }}</div>
    </div>

    <my-modal v-model:show="show1" />
    <my-de-modal v-model:show="show2" />

    <FixedBottomBar>
      <div class="w-full flex justify-center space-x-4 p-4">
        <a-button type="primary">back</a-button>
        <a-button type="primary" @click="toggleShow1">toggle1</a-button>
        <a-button type="primary" @click="toggleShow2">toggle2</a-button>
      </div>
    </FixedBottomBar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MyModal from './components/MyModal.vue'
import MyDeModal from './components/MyDeModal.vue'

const show1 = ref(false)
const toggleShow1 = () => {
  show1.value = !show1.value
}

const show2 = ref(false)
const toggleShow2 = () => {
  show2.value = !show2.value
}
</script>
