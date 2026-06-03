export abstract class HttpServerPort {
  abstract start(): Promise<void>
  abstract close(): Promise<void>
}
