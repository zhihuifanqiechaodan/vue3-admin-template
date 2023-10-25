<template>
  <div class="qrcode-container">
    <aside>
      A Vue.js component to generate
      <a href="https://github.com/scopewu/qrcode.vue" target="_blank"
        >QRCode.</a
      >
      <br />
      ⚠️ Now when you are using Vue 3.x, please upgrade qrcode.vue to 3.x
      <br />
      🔒 if you are using Vue 2.x, please keep using version 1.x;
    </aside>
    <QrcodeVue :value="qrcode" />
  </div>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
import { reactive } from 'vue'

const state = reactive({
  qrcode: 'https://github.com/zhihuifanqiechaodan/vue3-admin-template'
})

const { qrcode } = state
</script>

<style lang="scss">
.qrcode-container {
  margin: 20px;
  background-color: #fff;
  padding: 20px;
}
</style>
