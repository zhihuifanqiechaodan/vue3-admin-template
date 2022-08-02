<template>
    <div class="navbar">
        <search />
        <error-log />
        <screenfull />
        <size-select />
        <user />
    </div>
</template>
<script setup>
import { Search, ErrorLog, Screenfull, SizeSelect, User } from '@/layout/components/index';
</script>
<style lang="scss" scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    background-color: #fff;
}
</style>