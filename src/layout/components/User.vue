<template>
  <div class="user-container">
    <el-dropdown trigger="click">
      <div class="user-wrapper">
        <img
          :src="
            userInfo.avatar ||
            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
          "
          class="user-avatar"
        />
        <div class="user-name">{{ userInfo.name }}</div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">Log Out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const logout = async () => {
  await userStore.logout()
  router.push(`/login?redirect=${route.fullPath}`)
}
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .user-wrapper {
    display: flex;
    align-items: center;

    .user-avatar {
      width: 25px;
      height: 25px;
      border-radius: 5px;
    }

    .user-name {
      padding-left: 5px;
      white-space: nowrap;
    }
  }
}
</style>
