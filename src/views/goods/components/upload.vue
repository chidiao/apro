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
import { UPLOAD_URL } from '@/api/apis'
import { getToken } from '@/utils/auth'
const token = getToken()
</script>
