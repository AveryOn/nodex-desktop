import express from 'express'

export function createHttpServer() {
  const app = express()

  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.get('/budget', (_req, res) => {
    res.json([])
  })

  return app
}
