<template>
  <div class="chat-container">
    <div v-loading="loading" class="qrcode-wrapper">
      <QrcodeVue :value="qrcode" />
    </div>
  </div>
</template>

<script setup name="Chat">
import QrcodeVue from 'qrcode.vue'
// import { ElNotification } from 'element-plus'
// import { io } from 'socket.io-client'
import { reactive, toRefs, onMounted } from 'vue'
// const scoket = io('http://localhost:3000')
// scoket
//   .on('connect', () => {
//     console.log('连接成功', scoket)
//   })
//   .emit('message', { a: 1 })
//   .on('message', (data) => {
//     const { type, roomPayload, messagePayload, contactPayload } = data
//     ElNotification({
//       title: `${type ? roomPayload.topic : contactPayload.name}${
//         type ? '[' + contactPayload.name + ']' : ''
//       }`,
//       message: `${messagePayload.text}`
//     })
//   })
const state = reactive({
  qrcode: 'http://weixin.qq.com/x/AYCb_fELkTuEXaz6tHnF',
  loading: false
})

const { qrcode, loading } = toRefs(state)

onMounted(() => {
  setTimeout(() => {
    state.loading = true
    state.qrcode = 'https://www.jianshu.com/p/d3883e020d99'
    state.loading = false
  }, 5000)
})
</script>

<style lang="scss">
.chat-container {
  margin: 0 20px;
  background-color: #fff;
  .qrcode-wrapper {
    display: inline-block;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
