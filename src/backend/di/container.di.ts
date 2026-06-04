type Token<T> = symbol

type Provider<T> = {
  token: Token<T>
  useFactory: (container: Container) => T
}

export class Container {
  private readonly providers = new Map<symbol, Provider<unknown>>()
  private readonly instances = new Map<symbol, unknown>()

  register<T>(provider: Provider<T>): void {
    this.providers.set(provider.token, provider as Provider<unknown>)
  }

  resolve<T>(token: Token<T>): T {
    if (this.instances.has(token)) {
      return this.instances.get(token) as T
    }

    const provider = this.providers.get(token)

    if (!provider) {
      throw new Error(`Provider not found: ${token.toString()}`)
    }

    const instance = provider.useFactory(this)

    this.instances.set(token, instance)

    return instance as T
  }
}
