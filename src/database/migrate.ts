import path from 'node:path'
import { app } from 'electron'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'

import { getDatabase } from './client'

function getMigrationsFolder(): string {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'drizzle')
  }

  return path.join(process.cwd(), 'drizzle')
}

export function runMigrations(): void {
  const db = getDatabase()

  migrate(db, {
    migrationsFolder: getMigrationsFolder()
  })
}
