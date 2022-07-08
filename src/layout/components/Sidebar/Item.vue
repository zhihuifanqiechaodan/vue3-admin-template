<template>
    <svg-icon v-if="props.icon" :name="props.icon" />
</template>

<script setup>

const props = defineProps({
    icon: {
        type: String,
        default: ''
    }
})
</script>