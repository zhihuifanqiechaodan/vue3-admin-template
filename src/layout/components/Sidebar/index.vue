<template>
    <div :class="{ 'has-logo': true }">
        <Logo v-if="true" :collapse="!true" />
    </div>
</template>
    
<script setup>
import Logo from './Logo.vue'
</script>
    
<style lang="scss" scoped>
.has-logo {
    .el-scrollbar {
        height: calc(100% - 50px);
    }
}
</style>