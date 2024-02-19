<template>
  <div class="p-4">
    <a-card title="商品列表">
      <a-table :columns="cols" :data="table" />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
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
  const { data } = await getGoodsList()
  if (data) {
    let { list } = data
    table.value = list
  }
})
</script>
