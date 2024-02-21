<template>
  <div class="p-4">
    <a-card title="编辑商品" :loading="loading">
      <a-form :model="form">
        <a-form-item label="id">
          <a-input-number v-model="form.id" disabled></a-input-number>
        </a-form-item>

        <a-form-item label="name">
          <a-input v-model="form.goods_name"></a-input>
        </a-form-item>

        <a-form-item label="short_desc">
          <a-input v-model="form.short_desc"></a-input>
        </a-form-item>

        <a-form-item label="price">
          <a-input-number v-model="form.price" :precision="2"></a-input-number>
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
const route = useRoute()
const router = useRouter()
const { id } = route.query

const form = ref({})
const loading = ref(false)
const getData = () => {
  loading.value = true
  console.log(`get data by id ${id}`)
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
const onSubmit = () => {
  console.log(form.value)
  if (id) {
    Message.success('更新一条数据=>id:' + id)
  } else {
    Message.success('新增一条数据')
  }
}

onMounted(() => {
  if (id) {
    getData()
  }
})
</script>
