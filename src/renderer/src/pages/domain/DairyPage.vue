<script setup lang="ts">
import { env } from '~/renderer/src/shared/env'

const { nodex } = useNodexIPC()
const inp = ref('')
const list = ref<any>([])
function createTodo() {
  nodex.todos.create({
    title: inp.value
  })
}

onMounted(async () => {
  console.debug(env)
  list.value = await nodex.todos.list()
})
</script>

<template>
  <h1>DAIRY</h1>
  <input type="text" v-model="inp" />
  <button @click="createTodo">CREATE</button>
  <ul>
    <li v-for="n in list">{{ n?.title ?? 'UNKNOWN' }}</li>
  </ul>
</template>

<style scoped></style>
