// clients/http/http.client.ts

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type HttpClientOptions = {
  baseUrl: string
  headers?: Record<string, string>
}

export type HttpRequestOptions = {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  signal?: AbortSignal
}

export class HttpClient {
  constructor(private readonly options: HttpClientOptions) {}

  async request<TResponse>(path: string, options: HttpRequestOptions = {}): Promise<TResponse> {
    const method = options.method ?? 'GET'

    const response = await fetch(this.buildUrl(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this.options.headers,
        ...options.headers
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal
    })

    if (!response.ok) {
      throw new HttpClientError({
        status: response.status,
        statusText: response.statusText,
        body: await this.safeReadBody(response)
      })
    }

    if (response.status === 204) {
      return undefined as TResponse
    }

    return response.json() as Promise<TResponse>
  }

  get<TResponse>(path: string, options?: Omit<HttpRequestOptions, 'method' | 'body'>) {
    return this.request<TResponse>(path, {
      ...options,
      method: 'GET'
    })
  }

  post<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<HttpRequestOptions, 'method' | 'body'>
  ) {
    return this.request<TResponse>(path, {
      ...options,
      method: 'POST',
      body
    })
  }

  put<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<HttpRequestOptions, 'method' | 'body'>
  ) {
    return this.request<TResponse>(path, {
      ...options,
      method: 'PUT',
      body
    })
  }

  patch<TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<HttpRequestOptions, 'method' | 'body'>
  ) {
    return this.request<TResponse>(path, {
      ...options,
      method: 'PATCH',
      body
    })
  }

  delete<TResponse>(path: string, options?: Omit<HttpRequestOptions, 'method'>) {
    return this.request<TResponse>(path, {
      ...options,
      method: 'DELETE'
    })
  }

  private buildUrl(path: string): string {
    const baseUrl = this.options.baseUrl.replace(/\/$/, '')
    const normalizedPath = path.startsWith('/') ? path : `/${path}`

    return `${baseUrl}${normalizedPath}`
  }

  private async safeReadBody(response: Response): Promise<unknown> {
    const text = await response.text()

    if (!text) {
      return null
    }

    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }
}

export class HttpClientError extends Error {
  readonly status: number
  readonly statusText: string
  readonly body: unknown

  constructor(input: { status: number; statusText: string; body: unknown }) {
    super(`HTTP request failed: ${input.status} ${input.statusText}`)

    this.name = 'HttpClientError'
    this.status = input.status
    this.statusText = input.statusText
    this.body = input.body
  }
}
