<template>
  <div class="p-4">
    <a-card :title="title">
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
import { useRouter } from 'vue-router'
import { getWholeResult } from '@/api/analysis'
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface'

const cols: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80
  },
  {
    title: 'sub_sn',
    dataIndex: 'sub_sn',
    width: 190
  },
  {
    title: '主账户',
    dataIndex: 'user_realname',
    width: 100
  },
  {
    title: '子账户',
    dataIndex: 'sub_realname',
    width: 100
  },
  {
    title: '虹膜图像',
    dataIndex: 'image',
    width: 100,
    render: ({ record }: any) => {
      return <a-image shape="square" src={record.image_text} width="50" height="50" />
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 70,
    render({ record }: any) {
      let field = record.gender
      const obj_explain: any = {
        0: { text: '-', color: 'gray' },
        1: { text: '男', color: 'blue' },
        2: { text: '女', color: 'red' },
        default: { text: '-', color: 'gray' }
      }
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']
      let text = obj_explain?.[field]?.text ?? obj_explain['default']['text']

      return <a-tag color={color}>{text}</a-tag>
    }
  },
  {
    title: '眼侧',
    dataIndex: 'eye_side',
    width: 70,
    render({ record }: any) {
      let field = record.eye_side
      const obj_explain: any = {
        0: { text: '-', color: 'gray' },
        1: { text: '左', color: 'green' },
        2: { text: '右', color: 'red' },
        default: { text: '-', color: 'gray' }
      }
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']
      let text = obj_explain?.[field]?.text ?? obj_explain['default']['text']

      return <a-tag color={color}>{text}</a-tag>
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    render({ record }: any) {
      let field = record.status
      const obj_explain: any = {
        0: { text: '已上传', color: 'blue' },
        1: { text: '分析成功', color: 'green' },
        2: { text: '分析失败', color: 'red' },
        default: { text: '-', color: 'gray' }
      }
      let color = obj_explain?.[field]?.color ?? obj_explain['default']['color']
      let text = obj_explain?.[field]?.text ?? obj_explain['default']['text']

      return <a-tag color={color}>{text}</a-tag>
    }
  },
  {
    title: '失败原因',
    dataIndex: 'analysis_remark',
    width: 180
  },
  {
    title: '分析上传时间',
    dataIndex: 'add_time_text',
    width: 170
  },
  {
    title: '分析结果时间',
    dataIndex: 'up_time_text',
    width: 170
  },
  {
    title: '操作',
    slotName: 'action',
    width: 120,
    align: 'center',
    fixed: 'right'
  }
]

const title = '全部分析结果'
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
  const { data } = await getWholeResult(page, pagination.value.pageSize)
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
  const data = { data: Object.assign({}, record) }
  router.push({ name: 'irisAnalysisWholeDetail', state: data })
  // router.push({ path: `main/detail`, query: record })//参数暴露于url,且数据过大时受url限制
  // https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
  // router.push({ name: 'accountMainDetail', params: record })//接收不到params参数;动态路由可配合使用
}
</script>
