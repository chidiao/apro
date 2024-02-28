<template>
  <a-card :title="title">
    <!-- 信息列表 -->
    <a-list :size="list_conf.size" :bordered="list_conf.bordered" class="pb-4">
      <!-- <template #header> {{ title }} </template> -->
      <a-list-item v-for="(value, key) in sub_data" :key="value.id">
        <div v-if="/^http(s)?/.test(value)" class="flex items-center">
          <span style="font-weight: bold">{{ key }}</span>
          <span>:&nbsp;&nbsp;</span>
          <a-image shape="square" :src="value" width="50" height="50" />
        </div>
        <div v-else>
          <span style="font-weight: bold">{{ key }}</span>
          <span>:&nbsp;&nbsp;</span>
          <span>{{ value }}</span>
        </div>
      </a-list-item>
    </a-list>

    <!-- 底部按钮 -->
    <FixedBottomBar class="border-0 border-t-2 border-slate-300 border-solid">
      <div class="flex items-center justify-center w-full">
        <a-button type="primary" size="large" class="m-[12px]" @click="editSubInfo">
          <template #icon><icon-edit /></template>
          <template #default>编辑</template>
        </a-button>
        <a-button type="primary" size="large" class="m-4" @click="router.back">
          <template #icon><icon-undo /></template>
          <template #default>返回</template>
        </a-button>
      </div>
    </FixedBottomBar>
  </a-card>
</template>

<script lang="tsx" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

type SizeProps = 'large' | 'medium' | 'small'
const list_conf = {
  size: 'small' as SizeProps,
  bordered: true
}

const router = useRouter()
const title = '子账户详情'
const sub_data = history.state.sub_data

//编辑子账户信息
const editSubInfo = () => {
  let err_msg = '暂不支持子账户信息修改'
  Message.error(err_msg)
}

onMounted(() => {
  // console.log('/account/detail')
})
</script>
