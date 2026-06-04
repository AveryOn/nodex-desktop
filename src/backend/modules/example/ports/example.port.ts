export abstract class ExampleServicePort {
  abstract list(): Promise<any>
  abstract create(input: unknown): Promise<any>
}
