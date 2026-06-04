import { ExampleModule } from './modules/example/example.module'

export class BackendModule {
  readonly example: ExampleModule

  constructor() {
    this.example = new ExampleModule()
  }
}
