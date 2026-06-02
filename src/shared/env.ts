import { z } from 'zod'
import { AppEnvEnum, EnvBootstrapEnum } from '~/shared/const'

export const AppEnvSchema = z.enum(AppEnvEnum)

export const mainEnvSchema = z.object({
  MAIN_VITE_APP_NAME: z.string().min(1),
  MAIN_VITE_DB_NAME: z.string().min(1),
  MAIN_VITE_APP_ID: z.string().min(3)
})

export const rendererEnvSchema = z.object({
  RENDERER_VITE_APP_NAME: z.string().min(1),
  RENDERER_VITE_APP_ENV: AppEnvSchema
})

export type MainEnv = z.infer<typeof mainEnvSchema>
export type RendererEnv = z.infer<typeof rendererEnvSchema>

/**
 * Запускает валидацию установленных env-переменных и выбрасывает ошибку в случае если проверка переменных не прошла.
 * @param environment Runtime-Окружение в контексте всего приложения:
 *  * `MAIN` - Серверная сторона приложения
 *  * `RENDERER` - Клиентская сторона приложения
 *  * `PRELOAD` - промежуточный слой приложения соединяющий RENDERER и MAIN
 */
export function EnvBootstrap(environment: EnvBootstrapEnum): void {
  console.log('ENV BOOTSTRAP CALLED:', environment)
  console.log('IMPORT META ENV:', import.meta.env)

  if (environment === EnvBootstrapEnum.MAIN) {
    mainEnvSchema.parse(import.meta.env)
    return
  }

  if (environment === EnvBootstrapEnum.RENDERER) {
    rendererEnvSchema.parse(import.meta.env)
    return
  }

  if (environment === EnvBootstrapEnum.PRELOAD) {
    return
  }

  throw new Error(`Unknown env bootstrap target: ${environment}`)
}
