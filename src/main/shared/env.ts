import { EnvBootstrapEnum } from '~/shared/const'
import { env as getEnv } from '~/shared/env'

export const env = getEnv(EnvBootstrapEnum.MAIN)
