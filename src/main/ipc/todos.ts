import { ipcMain } from 'electron'
import { desc, eq, isNull } from 'drizzle-orm'

import { getDatabase } from '~/main/db/client'
import { todos } from '~/main/db/schema'

export function registerTodoIpcHandlers(): void {
  ipcMain.handle('todos:list', async () => {
    const db = getDatabase()

    return db.select().from(todos).where(isNull(todos.deletedAt)).orderBy(desc(todos.createdAt))
  })

  ipcMain.handle('todos:create', async (_event, payload: { title: string }) => {
    const db = getDatabase()

    const title = payload.title.trim()

    if (!title) {
      throw new Error('Todo title is required')
    }

    db.insert(todos)
      .values({
        title,
        isCompleted: false,
        createdAt: new Date()
      })
      .run()

    return { ok: true }
  })

  ipcMain.handle('todos:complete', async (_event, payload: { id: number }) => {
    const db = getDatabase()

    db.update(todos)
      .set({
        isCompleted: true,
        updatedAt: new Date()
      })
      .where(eq(todos.id, payload.id))
      .run()

    return { ok: true }
  })

  ipcMain.handle('todos:delete', async (_event, payload: { id: number }) => {
    const db = getDatabase()

    db.update(todos)
      .set({
        deletedAt: new Date()
      })
      .where(eq(todos.id, payload.id))
      .run()

    return { ok: true }
  })
}
