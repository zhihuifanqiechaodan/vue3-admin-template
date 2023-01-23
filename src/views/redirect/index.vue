<template>
  <div></div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const { params, query } = route
const { path } = params

const router = useRouter()
router.replace({ path: '/' + path, query })
</script>
