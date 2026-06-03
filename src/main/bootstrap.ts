import { ExpressHttpServer } from '~/backend/express/index'
import { HttpServerPort } from '~/backend/ports/backend.port'
import { initDatabase } from '~/database/client'
import { runMigrations } from '~/database/migrate'
import { EnvBootstrap } from '~/shared/env'
import { registerIpcHandlers } from './ipc'
import { EnvBootstrapEnum } from '~/shared/const'
import { env } from '~/main/shared/env'

export async function bootstrap(app: Electron.App) {
  EnvBootstrap(EnvBootstrapEnum.MAIN) // Запустить проверку env-переменных серверного окружения
  initDatabase() // Инициализация базы данных, создание sqlite файла если это необходимо
  runMigrations() // Запуск миграций базы данных
  registerIpcHandlers() // регистрация IPC обработчиков
  // Поднять http сервер для обработки http запросов на backend
  const httpServer: HttpServerPort = new ExpressHttpServer({
    port: +env.MAIN_VITE_BACKEND_PORT
  })

  // Хук закрытия приложения
  app.on('before-quit', () => {
    // Закрыть процесс сервера
    httpServer.close && httpServer.close()
  })
}
