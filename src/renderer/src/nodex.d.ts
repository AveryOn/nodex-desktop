export type TodoDto = {
  id: number
  title: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type NodexApi = {
  todos: {
    list: () => Promise<TodoDto[]>
    create: (payload: { title: string }) => Promise<{ ok: true }>
    complete: (payload: { id: number }) => Promise<{ ok: true }>
    delete: (payload: { id: number }) => Promise<{ ok: true }>
  }
}
