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
      >
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
import { getSubList } from '@/api/account'
import { useRouter } from 'vue-router'

const cols = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '账户类型',
    dataIndex: 'user_type',
    render({ record }: any) {
      let user_type_text = record.user_type == 1 ? '主账户' : '子账户'
      let color = record.user_type == 1 ? 'green' : 'gray'
      return <a-tag color={color}>{user_type_text}</a-tag>
    }
  },
  {
    title: '所属用户',
    dataIndex: 'account_realname'
  },
  {
    title: '真实姓名',
    dataIndex: 'user_realname'
  },
  {
    title: '身份证',
    dataIndex: 'id_card'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render({ record }: any) {
      let gender_text, color
      switch (record.gender) {
        case 1:
          gender_text = '男'
          color = 'blue'
          break
        case 2:
          gender_text = '女'
          color = 'red'
          break
        default:
          gender_text = '-'
          color = 'gray'
          break
      }
      return <a-tag color={color}>{gender_text}</a-tag>
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday'
  },
  // {
  //   title: '头像',
  //   dataIndex: 'avatar_text',
  //   render: ({ record }: any) => {
  //     return <a-image shape="square" ssrc={record.avatar_text} width="50" height="50" />
  //   }
  // },
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

const router = useRouter()
const toDetail = (record: any) => {
  const sub_data = { sub_data: Object.assign({}, record) }
  router.push({ name: 'accountSubDetail', state: sub_data })
  // router.push({ path: `main/detail`, query: record })//参数暴露于url,且数据过大时受url限制
  // https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
  // router.push({ name: 'accountMainDetail', params: record })//接收不到params参数;动态路由可配合使用
}
</script>
