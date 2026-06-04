import { NextFunction, Request, Response, Router } from 'express'
import type { BackendModule } from '~/backend/backend.module'

type HttpHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<unknown>

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
  HEAD = 'head'
}

function CreateRoute(
  method: Method,
  path: string,
  router: Router,
  handler: HttpHandler
) {
  router[method](path, async (req, res, next) => {
    try {
      const result = await handler(req, res, next)
      res.json(result)
    } catch (error) {
      next(error)
    }
  })
}

class ExampleController {
  private readonly basepath = '/examples'
  private readonly router = Router()
  constructor(private readonly backend: BackendModule) {}
  registerRoutes(): any[] {
    return [
      CreateRoute(
        Method.GET,
        this.basepath,
        this.router,
        async (req, res, next) => {
          return ''
        }
      )
    ]
  }
  getExamples = async () => {
    return this.backend.example.service.list()
  }

  createExample = async (input: unknown) => {
    return this.backend.example.service.create(input)
  }
}

export function createExampleRoutes(backend: BackendModule) {
  const router = Router()
  const controller = new ExampleController(backend)

  return router
}
