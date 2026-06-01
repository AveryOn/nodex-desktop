<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  const a = await window.nodex.todos.list()
  console.debug(a)
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
