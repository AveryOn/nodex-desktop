import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'
import { env } from '~/main/shared/env'

export function getUserDataDir() {
  const dir = path.join(app.getPath('userData'), 'data')

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getDatabasePath(): string {
  const dataDir = getUserDataDir()
  return path.join(dataDir, env.MAIN_VITE_DB_NAME)
}
