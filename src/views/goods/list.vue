<template>
  <div class="p-4">
    <div class="p-4 bg-white">
      <a-table :columns="cols" :data="table" />
    </div>
  </div>
</template>

<script setup>
import { getGoodsList } from '@/api/goods'
import { onMounted, ref } from 'vue'

const cols = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '名称',
    dataIndex: 'goods_name'
  },
  {
    title: '价格',
    dataIndex: 'price'
  }
]
const table = ref([])

onMounted(async () => {
  const { data, error } = await getGoodsList()
  if (data) {
    let { list } = data
    table.value = list
  }
})
</script>
