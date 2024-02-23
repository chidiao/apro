<template>
  <div class="p-4">
    <a-card title="商品列表">
      <div class="pb-4 space-x-4">
        <a-button type="primary" @click="toDetail()">添加商品</a-button>
      </div>

      <a-table :columns="cols" :data="table" :loading="loading">
        <template #free="{ record }">
          <a-switch
            v-model="record.is_free"
            checked-color="blue"
            :checked-value="1"
            unchecked-color="gray"
            :unchecked-value="0"
            :before-change="(e) => switchToFree(e, record.goods_uid)"
          >
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </a-switch>
        </template>

        <template #cover="{ record }">
          <a-tooltip :content="record.list_picture_text" mini>
            <a-avatar shape="square" :image-url="record.list_picture_text"></a-avatar>
          </a-tooltip>
        </template>

        <template #action="{ record }">
          <div class="space-x-2">
            <a-button type="primary" @click="onEdit(record)">修改</a-button>

            <a-button type="primary" @click="toDetail(record.goods_uid)">详情</a-button>

            <a-popconfirm type="warning" content="确定删除？" @ok="onDel(record.goods_uid)">
              <a-button type="primary" status="danger">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="editShow" title="编辑" unmount-on-close @ok="onSubmit">
      <goods-edit v-model:form="form"></goods-edit>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getGoodsList, setFreeGood, deleteGood } from '@/api/goods'
import GoodsEdit from './components/edit.vue'

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
  },
  {
    title: '是否免费',
    dataIndex: 'is_free',
    slotName: 'free'
  },
  {
    title: '封面',
    dataIndex: 'list_picture',
    slotName: 'cover'
  },
  {
    title: '操作',
    slotName: 'action',
    width: 230
  }
]
const table = ref([])
const loading = ref(false)
const getTable = async () => {
  loading.value = true
  try {
    const { data } = await getGoodsList()
    if (data) {
      let { list } = data
      table.value = list
    }
  } finally {
    loading.value = false
  }
}

const editShow = ref(false)
const form = ref({})
const onEdit = (record: any) => {
  // 浅拷贝一份数据，并把价格转为数字，如果直接赋值的话，列表和表单的数据会同步被修改
  form.value = Object.assign({}, record, { price: Number(record.price) })
  editShow.value = true
}
const onSubmit = () => {
  // 修改过的拷贝数据
  console.log(form.value)
  getTable()
}
const onDel = async (uid = null) => {
  if (!uid) return

  loading.value = true
  await deleteGood(uid)
  getTable()
}

const router = useRouter()
const toDetail = (uid = null) => {
  router.push(uid ? `/goods/edit?uid=${uid}` : '/goods/edit')
}

const switchToFree = async (is_free: any, uid = '') => {
  try {
    await setFreeGood(uid, is_free)
    return true
  } catch {
    return false
  }
}

onMounted(() => {
  getTable()
})
</script>
