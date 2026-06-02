<script setup lang="ts">
const { nodex } = useNodexIPC()
const inp = ref('')
const list = ref<any>([])
function createTodo() {
  nodex.todos.create({
    title: inp.value
  })
}

onMounted(async () => {
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
