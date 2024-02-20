<template>
  <div class="p-4">
    <a-card title="用户列表">
      <a-table
        :columns="cols"
        :data="table"
        :loading="loading"
        :pagination="pagination"
        @pageChange="(p) => getList(p)"
      />
    </a-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUserList } from '@/api/user'

const cols = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'uid',
    dataIndex: 'uid'
  },
  {
    title: '用户名',
    dataIndex: 'user_realname'
  },
  {
    title: '昵称',
    dataIndex: 'user_nickname'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render({ record }) {
      return record.gender === 1 ? '男' : '女'
    }
  }
]
const table = ref([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const getList = async (page = pagination.value.current) => {
  loading.value = true
  const { data } = await getUserList(page, pagination.value.pageSize)
  loading.value = false
  if (data) {
    let { list } = data
    table.value = list
    pagination.value.current = page
    pagination.value.total = 50
  }
}

onMounted(() => {
  getList()
})
</script>
