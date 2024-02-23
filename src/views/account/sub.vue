<template>
  <div class="p-4">
    <a-card title="子用户列表">
      <a-table
        :columns="cols"
        :data="table"
        :stripe="stripe"
        :loading="loading"
        :pagination="pagination"
        @pageChange="(p) => getList(p)"
      />
    </a-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getSubList } from '@/api/account'

const cols = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '账户类型',
    dataIndex: 'user_type'
  },
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'ID',
    dataIndex: 'id'
  },
]
const table = ref([])
const loading = ref(false)
const stripe = ref(true)
const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0
})

const getList = async (page = pagination.value.current) => {
  loading.value = true
  const { data } = await getSubList(page, pagination.value.pageSize)
  loading.value = false
  if (data) {
    let { list, current_page, page_size, total } = data
    table.value = list
    pagination.value.current = current_page
    pagination.value.total = total
  }
}

onMounted(() => {
  getList()
})
</script>
