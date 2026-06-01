import { contextBridge, ipcRenderer } from 'electron'

export type Todo = {
  id: number
  title: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type CreateTodoPayload = {
  title: string
}

export type TodoIdPayload = {
  id: number
}

const nodexApi = {
  todos: {
    list: (): Promise<Todo[]> => ipcRenderer.invoke('todos:list'),

    create: (payload: CreateTodoPayload): Promise<{ ok: true }> =>
      ipcRenderer.invoke('todos:create', payload),

    complete: (payload: TodoIdPayload): Promise<{ ok: true }> =>
      ipcRenderer.invoke('todos:complete', payload),

    delete: (payload: TodoIdPayload): Promise<{ ok: true }> =>
      ipcRenderer.invoke('todos:delete', payload)
  }
}

contextBridge.exposeInMainWorld('nodex', nodexApi)

export type NodexApi = typeof nodexApi
