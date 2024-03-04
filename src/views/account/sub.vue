<template>
  <div class="p-4">
    <a-card title="子用户列表">
      <a-table
        :columns="cols"
        :data="table"
        :stripe="stripe"
        :loading="loading"
        :scroll="scroll"
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
import { TableColumnData } from '@arco-design/web-vue/es/table/interface'

const cols: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80
  },
  {
    title: '账户类型',
    dataIndex: 'user_type',
    width: 100,
    render({ record }: any) {
      //1主账户,2子账户
      let field = record.user_type
      let text = record.user_type_text || '-'
      const obj_explain: any = {
        1: { color: 'green' },
        2: { color: 'blue' },
        default: { color: 'gray' }
      }
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']

      return <a-tag color={color}>{text}</a-tag>
    }
  },
  {
    title: '所属用户',
    dataIndex: 'account_realname',
    width: 100
  },
  {
    title: '真实姓名',
    dataIndex: 'user_realname',
    width: 100
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 70,
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
    title: '关系',
    dataIndex: 'relationship',
    width: 80,
    render({ record }: any) {
      //1父母,2兄妹,3子女
      const obj_explain: any = {
        1: { color: 'red' },
        2: { color: 'green' },
        3: { color: 'orange' },
        default: { color: 'gray' }
      }
      let field = record.relationship
      let text = record.relationship_text || '-'
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']

      return <a-tag color={color}>{text}</a-tag>
    }
  },
  {
    title: '身份证',
    dataIndex: 'id_card',
    width: 150
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '头像',
    dataIndex: 'avatar_text',
    width: 80,
    render: ({ record }: any) => {
      return <a-image shape="square" src={record.avatar_text} width="50" height="50" />
    }
  },
  {
    title: 'c_time',
    dataIndex: 'c_time',
    width: 180,
  },
  {
    title: 'm_time',
    dataIndex: 'm_time',
    width: 180,
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
