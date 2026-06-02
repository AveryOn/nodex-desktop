import type { NodexApi } from './nodex'

declare global {
  interface Window {
    nodex: NodexApi
  }
}

export {}
