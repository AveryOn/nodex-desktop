import Database from 'better-sqlite3'
import type { Database as BetterSqliteDatabase } from 'better-sqlite3'
import { app } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import * as schema from './schema'
import { env } from '~/shared/env'
import { EnvBootstrapEnum } from '~/shared/const'

let sqlite: BetterSqliteDatabase | null = null
let db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getDatabasePath(): string {
  const dataDir = path.join(app.getPath('userData'), 'data')

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  return path.join(dataDir, env(EnvBootstrapEnum.MAIN).MAIN_VITE_DB_NAME)
}

export function initDatabase() {
  if (db) {
    return db
  }

  const dbPath = getDatabasePath()

  sqlite = new Database(dbPath)

  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')

  db = drizzle(sqlite, { schema })

  return db
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database is not initialized. Call initDatabase() first.')
  }

  return db
}

export function getSqliteConnection(): BetterSqliteDatabase {
  if (!sqlite) {
    throw new Error('SQLite connection is not initialized. Call initDatabase() first.')
  }

  return sqlite
}
