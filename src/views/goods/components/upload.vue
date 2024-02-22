<template>
  <a-upload
    list-type="picture-card"
    :action="UPLOAD_URL"
    :headers="{
      'XX-Token': token
    }"
    :data="{
      folder: 'goods'
    }"
    image-preview
  />
</template>

<script setup>
import { getToken } from '@/utils/auth'
const token = getToken()

const UPLOAD_URL = 'http://192.168.0.77:8081/v1/upload/picture'
</script>
