export type Todo = {
  id: number
  title: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export const useTodoStore = defineStore('todoStore', () => {
  const { nodex } = useNodexIPC()
  const items = ref<Todo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTodos(): Promise<void> {
    isLoading.value = true
    error.value = null

    try {
      items.value = await nodex.todos.list()
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch todos'
    } finally {
      isLoading.value = false
    }
  }

  async function createTodo(title: string): Promise<void> {
    const normalizedTitle = title.trim()

    if (!normalizedTitle) {
      throw new Error('Todo title is required')
    }

    await nodex.todos.create({ title: normalizedTitle })
    await fetchTodos()
  }

  async function completeTodo(id: number): Promise<void> {
    await nodex.todos.complete({ id })
    await fetchTodos()
  }

  async function deleteTodo(id: number): Promise<void> {
    await nodex.todos.delete({ id })
    await fetchTodos()
  }

  return {
    items,
    isLoading,
    error,
    fetchTodos,
    createTodo,
    completeTodo,
    deleteTodo
  }
})
