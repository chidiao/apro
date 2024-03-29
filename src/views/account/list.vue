<template>
  <div class="p-4">
    <a-card title="用户列表">
      <a-table
        :columns="cols"
        :data="table"
        :stripe="stripe"
        :loading="loading"
        :scroll="scroll"
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
    dataIndex: 'id',
    width: 120
  },
  {
    title: 'uid',
    dataIndex: 'uid',
    width: 120
  },
  {
    title: '用户名',
    dataIndex: 'user_realname',
    width: 120
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    render: ({ record }: any) => {
      return <a-image shape="square" src={record.avatar_text} width="50" height="50" />
    }
  },
  {
    title: '昵称',
    dataIndex: 'user_nickname',
    width: 170
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 150
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    render({ record }: any) {
      //0未知,1男,2女
      const obj_explain: any = {
        0: { color: 'gray' },
        1: { color: 'blue' },
        2: { color: 'red' },
        default: { color: 'gray' }
      }
      let field = record.gender
      let text = record.gender_text || '-'
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']

      return <a-tag color={color}>{text}</a-tag>
    }
  },
  {
    title: '状态',
    dataIndex: 'user_status',
    width: 120,
    render({ record }: any) {
      const obj_explain: any = {
        1: { color: 'green' },
        2: { color: 'gold' },
        3: { color: 'magenta' },
        default: { color: 'gray' }
      }
      let field = record.user_status
      let text = record.user_status_text || '-'
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']

      return <a-tag color={color}>{text}</a-tag>
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
const pagination = ref({
  current: 1,
  pageSize: 20,
  total: 0
})
const scroll = {
  x: 1000
}

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
