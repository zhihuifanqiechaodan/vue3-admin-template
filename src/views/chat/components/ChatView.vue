<template>
  <div class="chat-view">
    <div class="left">
      <div class="user-wrapper">
        <el-image
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
          class="avatar"
        />
      </div>
    </div>
    <div class="content">
      <div
        v-for="item in messageList"
        :key="item.messagePayload.id"
        class="chat-item"
      >
        <el-image
          :src="item.contactPayload.avatar"
          fit="cover"
          class="avatar"
        />
        <div class="right">
          <div class="title">
            <span v-if="item.type">【{{ item.roomPayload.topic }}】@</span>
            <span>{{ item.contactPayload.name }}</span>
          </div>

          <div class="message">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  messageList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss">
.chat-view {
  display: flex;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    padding: 20px 0;
    background-color: hsla(0, 0%, 91%, 0.77);
    .user-wrapper {
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
  }

  .content {
    flex: 1;
    padding: 0 20px;
    .chat-item {
      position: relative;
      display: flex;
      padding-top: 20px;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 10px;
        margin-right: 30px;
      }
      .right {
        .message {
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
