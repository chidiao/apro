<template>
  <div>
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
    </a-form>
  </div>
</template>

<script setup>
const form = defineModel('form')
</script>
