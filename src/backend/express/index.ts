import type { Server } from 'node:http'
import type { HttpServerPort } from '~/backend/ports/http.port'
import type { HttpServerConfig } from '~/backend/types'
import express, { type Express } from 'express'

export class ExpressHttpServer implements HttpServerPort {
  private readonly app: Express
  private server: Server | null = null

  constructor(private readonly config: HttpServerConfig) {
    this.app = express()
    this.app.use(express.json())

    this.registerRoutes()
  }

  async start(): Promise<void> {
    if (this.server) return

    await new Promise<void>((resolve) => {
      this.server = this.app.listen(this.config.port, () => {
        console.log(
          `HTTP server started on http://localhost:${this.config.port}`
        )
        resolve()
      })
    })
  }

  async close(): Promise<void> {
    if (!this.server) return

    await new Promise<void>((resolve, reject) => {
      this.server?.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })

    this.server = null
  }

  private registerRoutes(): void {
    this.app.get('/health', (_req, res) => {
      res.json({ status: 'ok' })
    })

    this.app.get('/budget', (_req, res) => {
      res.json([])
    })
  }
}
