<template>
  <div class="p-4">
    <a-card>
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </a-card>

    <FixedBottomBar>
      <div class="w-full p-4 flex justify-end">
        <a-button type="primary" @click="onSave">保存</a-button>
      </div>
    </FixedBottomBar>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Message } from '@arco-design/web-vue'
import { getToken } from '@/utils/auth'
import { UPLOAD_URL } from '@/api/apis'
const token = getToken()

const editorRef = shallowRef()
const valueHtml = ref('')

const mode = 'default'
const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: UPLOAD_URL,
      headers: {
        'XX-Token': token
      },
      meta: {
        folder: 'goods'
      },
      fieldName: 'file',
      customInsert(res, insertFn) {
        const { code, msg } = res

        if (code) {
          const { url } = res.data
          insertFn(url, '', url)
        } else {
          Message.error(msg)
        }
      }
    }
  }
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor
}

const onSave = () => {
  console.log(valueHtml.value)
}
</script>
