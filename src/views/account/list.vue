<template>
  <div class="p-4">
    <a-card title="用户列表">
      <a-table
        :columns="cols"
        :data="table"
        :stripe="stripe"
        :loading="loading"
        :pagination="pagination"
        @pageChange="(p) => getList(p)"
      />

      <!-- 头像 -->
      <template #user-avatar="{ record }">
        <a-avatar shape="square">
          <img :src="record.avatar_text" alt="avatar" />
        </a-avatar>
      </template>

      <!-- 操作 -->
      <template #action="{ record }">
        <div class="space-x-2">
          <a-button type="primary" @click="onEdit(record)">修改</a-button>

          <a-button type="primary" @click="toDetail(record.goods_uid)">详情</a-button>

          <a-popconfirm type="warning" content="确定删除？" @ok="onDel(record.goods_uid)">
            <a-button type="primary" status="danger">删除</a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-card>
  </div>
</template>

<script lang="jsx" setup>
import { onMounted, ref } from 'vue'
import { getAccountList } from '@/api/account'

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
    title: '头像',
    dataIndex: 'avatar',
    slotName: 'user-avatar'
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
    render({ record }) {
      return record.gender === 1 ? '男' : '女'
    }
  },
  {
    title: '状态',
    dataIndex: 'status_text',
    render({ record }) {
      const obj_color = {
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
    width: 230
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
const obj_color = {
  0: 'gray',
  // 1: 'green',
  1: 'magenta',
  2: 'gold',
  3: 'magenta'
}

const getList = async (page = pagination.value.current) => {
  loading.value = true
  const { data } = await getAccountList(page, pagination.value.pageSize)
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
