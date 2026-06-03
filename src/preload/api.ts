// import { HttpBudgetClient } from '../clients/http/budget.http.client'
import type { AppApi } from '~/clients/app-api'
import { HttpClient } from '~/clients/http/http.client'
import { IpcClient } from '~/clients/ipc/ipc.client'

type TransportType = 'ipc' | 'http'

type CreateApiOptions = {
  transport: TransportType
  backendUrl?: string
}

export function createPreloadApi(options: CreateApiOptions): AppApi {
  // const budget =
  //   options.transport === 'ipc'
  //     ? new IpcClient()
  //     : new HttpClient(options.backendUrl ?? 'http://localhost:3000')
  // return {
  //   budget
  // }
}
