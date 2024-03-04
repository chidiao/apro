<template>
  <a-card :title="title">
    <!-- 信息列表 -->
    <a-list :size="list_conf.size" :bordered="list_conf.bordered" class="pb-4">
      <!-- <template #header> {{ title }} </template> -->
      <a-list-item v-for="(value, key) in data" :key="value.id">
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
        <a-button type="primary" size="large" class="m-[12px]" @click="editAnalysisInfo">
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

type SizeProps = 'large' | 'medium' | 'small'
const list_conf = {
  size: 'small' as SizeProps,
  bordered: true
}

const router = useRouter()
const title = '分析数据详情-总'
const data = history.state.data

//编辑用户信息
const editAnalysisInfo = () => {
  let err_msg = '暂不支持分析数据修改'
  Message.error(err_msg)
}

onMounted(() => {
  // console.log('/account/detail')
})
</script>
