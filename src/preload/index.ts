import { contextBridge } from 'electron'
import { createPreloadApi } from './api'

const api = createPreloadApi({
  transport: 'ipc'
})

contextBridge.exposeInMainWorld('api', api)
