<template>
  <div class="p-4">
    <a-card title="编辑商品" :loading="loading">
      <a-form ref="formRef" :model="formData" :disabled="updating">
        <a-form-item
          label="name"
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
          label="short_desc"
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

        <a-form-item label="list_picture" field="list_picture">
          <a-upload list-type="picture-card" action="/" :default-file-list="listPics" :limit="1" image-preview />
        </a-form-item>

        <a-form-item label="detail_picture" field="list_picture">
          <a-upload list-type="picture-card" action="/" :default-file-list="detailPics" :limit="9" image-preview />
        </a-form-item>

        <a-form-item label="price">
          <a-input-number v-model="formData.price" :precision="2"></a-input-number>
        </a-form-item>

        <a-form-item label="status">
          <a-switch
            checked-color="blue"
            unchecked-color="gray"
            v-model="formData.status"
            :checked-value="1"
            :unchecked-value="2"
          />
        </a-form-item>

        <a-form-item label="sort">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { getGoodDetail, addGood, editGood } from '@/api/goods'
const route = useRoute()
const router = useRouter()
const { uid } = route.query

const formRef = ref()
const formData = ref({
  goods_name: '',
  short_desc: '',
  list_picture: 'test',
  detail_picture: 'test',
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
}

const updating = ref(false)
const onSubmit = async () => {
  if (updating.value) return

  const res = await formRef.value?.validate()
  if (res) return Message.error('请填写完整信息')

  if (!uid) {
    updating.value = true
    await addGood(formData.value)
    updating.value = false
    Message.success('添加成功')
    router.push('/goods/list')
  } else {
    updating.value = true
    await editGood(formData.value)
    updating.value = false
    Message.success('修改成功')
    router.push('/goods/list')
  }
}

const listPics = ref([])
const detailPics = ref([])

onMounted(() => {
  if (uid) {
    getData()
  }
})
</script>
