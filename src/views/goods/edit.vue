<template>
  <div class="p-4">
    <a-card title="编辑商品" :loading="loading">
      <a-form ref="formRef" :model="formData" :disabled="updating">
        <a-form-item
          label="名称"
          field="goods_name"
          :rules="[
            {
              required: true,
              message: '必填项'
            }
          ]"
        >
          <a-input v-model="formData.goods_name"></a-input>
        </a-form-item>

        <a-form-item
          label="描述"
          field="short_desc"
          :rules="[
            {
              required: true,
              message: '必填项'
            }
          ]"
        >
          <a-textarea v-model="formData.short_desc"></a-textarea>
        </a-form-item>

        <a-form-item
          label="封面图片"
          field="list_picture"
          :rules="[
            {
              required: true,
              message: '必填项'
            }
          ]"
        >
          <goods-upload v-model:file-list="listPics" :limit="1" />
        </a-form-item>

        <a-form-item
          label="详情图片"
          field="list_picture"
          :rules="[
            {
              required: true,
              message: '必填项'
            }
          ]"
        >
          <goods-upload v-model:file-list="detailPics" :limit="9" />
        </a-form-item>

        <a-form-item label="价格">
          <a-input-number v-model="formData.price" :precision="2"></a-input-number>
        </a-form-item>

        <a-form-item label="状态">
          <a-switch
            checked-color="blue"
            unchecked-color="gray"
            v-model="formData.status"
            :checked-value="1"
            :unchecked-value="2"
          />
          <div class="px-2">{{ formData.status === 1 ? '正常' : '下架' }}</div>
        </a-form-item>

        <a-form-item label="排序">
          <a-input-number v-model="formData.sort" :precision="0" :default-value="0"></a-input-number>
        </a-form-item>

        <div class="p-4 space-x-4 mx-auto">
          <a-button type="primary" @click="onSubmit">保存</a-button>
          <a-button @click="router.back">取消</a-button>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { getGoodDetail, addGood, editGood } from '@/api/goods'
import GoodsUpload from './components/upload.vue'
const route = useRoute()
const router = useRouter()
const { uid } = route.query

const formRef = ref()
const formData = ref({
  goods_name: '',
  short_desc: '',
  list_picture: '',
  detail_picture: '',
  price: 0,
  status: 1,
  sort: 0
})
const loading = ref(false)
const getData = async () => {
  loading.value = true
  const { data } = await getGoodDetail(uid)
  loading.value = false
  if (!data) return
  formData.value = Object.assign({}, data.detail, { price: Number(data.detail.price) })
  listPics.value = data.detail.list_picture_info
  detailPics.value = data.detail.detail_picture_info
}

const updating = ref(false)
const onSubmit = async () => {
  if (updating.value) return

  // 获取图片信息
  formData.value.list_picture = listPicture.value
  formData.value.detail_picture = detailPicture.value
  const res = await formRef.value?.validate()
  if (res) return Message.error('请完善信息')

  if (!uid) {
    updating.value = true
    try {
      await addGood(formData.value)
      Message.success('添加成功')
      router.push('/goods/list')
    } finally {
      updating.value = false
    }
  } else {
    updating.value = true
    try {
      await editGood(formData.value)
      Message.success('修改成功')
      router.push('/goods/list')
    } finally {
      updating.value = false
    }
  }
}

const listPics = ref([])
const listPicture = computed(() => {
  if (!listPics.value.length) return ''

  return listPics.value[0].path ? listPics.value[0].path : listPics.value[0].response.data.path
})
const detailPics = ref([])
const detailPicture = computed(() => {
  if (!listPics.value.length) return ''

  return detailPics.value
    .map((pic) => {
      return pic.path ? pic.path : pic.response.data.path
    })
    .join(',')
})

onMounted(() => {
  if (uid) {
    getData()
  }
})
</script>
