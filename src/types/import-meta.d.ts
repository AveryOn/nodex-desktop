import type { AppEnvEnum } from '~/shared/const'

declare global {
  interface ImportMetaEnv {
    readonly NODE_ENV?: AppEnvEnum

    readonly APP_NAME?: string
    readonly APP_ID?: string

    readonly MAIN_VITE_APP_NAME?: string
    readonly MAIN_VITE_DB_NAME?: string

    readonly RENDERER_VITE_APP_NAME?: string
    readonly RENDERER_VITE_APP_ENV?: AppEnvEnum

    readonly VITE_APP_NAME?: string
    readonly VITE_APP_ENV?: AppEnvEnum
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
