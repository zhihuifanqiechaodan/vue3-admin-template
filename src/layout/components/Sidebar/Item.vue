<template>
    <svg-icon v-if="props.icon" :name="props.icon" />
    <span v-if="props.title" slot='title'>{{ props.title }}</span>
</template>

<script setup>

const props = defineProps({
    icon: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    }
})
</script>