<template>
  <div class="p-4">
    <a-card title="用户列表">
      <a-table
        :columns="cols"
        :data="table"
        :stripe="stripe"
        :loading="loading"
        :sticky-header="sticky_header"
        :pagination="pagination"
        @pageChange="(p) => getList(p)"
      >
        <!-- 头像 -->
        <template #user_avatar="{ record }">
          <a-image shape="square" :src="record.avatar_text" width="50" height="50" />
        </template>

        <!-- 操作 -->
        <template #action="{ record }">
          <div class="space-x-2">
            <a-button type="primary" @click="toDetail(record)">查看</a-button>
          </div>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="tsx" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAccountList } from '@/api/account'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'

const cols: TableColumnData[] = [
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
    title: '头像',
    dataIndex: 'avatar',
    slotName: 'user_avatar'
  },
  {
    title: '昵称',
    dataIndex: 'user_nickname'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render({ record }: any) {
      return record.gender === 1 ? '男' : '女'
    }
  },
  {
    title: '状态',
    dataIndex: 'status_text',
    render({ record }: any) {
      const obj_color: any = {
        1: 'green',
        2: 'gold',
        3: 'magenta'
      }
      let color = obj_color[record.user_status] ?? 'gray'
      return (
        <a-tag color={color} bordered>
          {record.status_text}
        </a-tag>
      )
    }
  },
  {
    title: '操作',
    slotName: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
]

const table = ref([])
const loading = ref(false)
const stripe = ref(true)
const sticky_header = ref(true)
const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0
})

const getList = async (page = pagination.value.current) => {
  loading.value = true
  const { data } = await getAccountList(page, pagination.value.pageSize)
  loading.value = false
  if (data) {
    let { list, current_page, page_size, total }: any = data
    table.value = list
    pagination.value.current = current_page
    pagination.value.total = total
  }
}

onMounted(() => {
  getList()
})

const router = useRouter()
const toDetail = (record: any) => {
  const user_data = { user_data: Object.assign({}, record) }
  router.push({ name: 'accountMainDetail', state: user_data })
  // router.push({ path: `main/detail`, query: record })//参数暴露于url,且数据过大时受url限制
  // https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
  // router.push({ name: 'accountMainDetail', params: record })//接收不到params参数;动态路由可配合使用
}
</script>
