<template>
  <div v-loading="loading" class="chat-container">
    <ChatView v-if="userInfo" :messageList="messageList" />
    <div v-else class="qrcode-wrapper">
      <QrcodeVue v-if="qrcode" :value="qrcode" />
    </div>
  </div>
</template>

<script setup name="Chat">
import QrcodeVue from 'qrcode.vue'
import { io } from 'socket.io-client'
import { reactive, toRefs, watch } from 'vue'
import ChatView from './components/ChatView.vue'

const socket = io('http://192.168.1.75:3000')
socket
  .on('connect', () => {
    state.is_connect = true
  })
  .on('disconnect', () => {
    state.is_connect = false
  })
  .on('connect_error', (error) => {
    console.log(error)
    state.is_connect = false
  })
  .on('sendScanQrcode', ({ qrcode }) => {
    state.qrcode = qrcode
  })
  .on('sendUserInfo', (data) => {
    state.userInfo = data
  })
  .on('sendMessageInfo', (data) => {
    const { type, roomPayload, messagePayload, contactPayload, text } = data
    // ElNotification({
    //   title: `${type ? roomPayload.topic : contactPayload.name}${
    //     type ? '[' + contactPayload.name + ']' : ''
    //   }`,
    //   message: `${text}`
    // })
    if (state.messageList.length < 10) {
      state.messageList.push({
        type,
        roomPayload,
        messagePayload,
        contactPayload,
        text
      })
    } else {
      state.messageList.push({
        type,
        roomPayload,
        messagePayload,
        contactPayload,
        text
      })
      state.messageList.shift()
    }
  })
const state = reactive({
  qrcode: '',
  loading: false,
  is_connect: false,
  userInfo: null,
  messageList: []
})

const { qrcode, loading, userInfo, messageList } = toRefs(state)

const initData = () => {
  socket.emit('getUserInfo').on('sendUserInfo', (data) => {
    if (data) {
      state.userInfo = data
    } else {
      socket.emit('getScanQrcode').on('sendScanQrcode', ({ qrcode }) => {
        state.qrcode = qrcode
      })
    }
  })
}

watch(
  () => state.is_connect,
  () => {
    if (state.is_connect) {
      initData()
    }
  }
)
</script>

<style lang="scss">
.chat-container {
  margin: 20px;
  background-color: #fff;
  .qrcode-wrapper {
    display: inline-block;
    padding: 20px;
    background-color: #fff;
  }
}
</style>
