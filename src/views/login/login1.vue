<template>
  <div class="login-container">
    <div class="left"></div>
    <div class="right">
      <div class="login-wrapper">
        <div class="title">Sign Up</div>
        <div class="subtitle">Please fill your information below</div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="loginForm"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'

const loginRules = {
  username: [
    { required: true, trigger: 'blur', message: 'Please input you username' }
  ],
  password: [
    { required: true, trigger: 'blur', message: 'Please input you password' }
  ]
}

const loginFormRef = ref(null)

const state = reactive({
  loginForm: {
    username: '',
    password: ''
  }
})

const { loginForm } = toRefs(state)
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  .left {
    width: 655px;
    background-color: #1c2ba3;
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-wrapper {
      .title {
        color: #2f3367;
        font-family: Poppins;
        font-size: 28px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      .subtitle {
        color: #303468;
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        padding-top: 12px;
      }

      .loginForm {
        padding-top: 44px;
      }
    }
  }
}
</style>
