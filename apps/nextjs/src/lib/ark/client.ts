type Fetcher<T> = (url: string, options?: FetcherOpts) => Promise<T>
interface FetcherOpts {
  headers?: Record<string, string>
};

// ArkClient aims to ease the testing phase of api endpoints
export class ArkClient {
  fetcher: Fetcher<any>
  constructor(fetcher: Fetcher<any>) {
    this.fetcher = fetcher
  }

  public async fetch<T>(url: string, options: FetcherOpts = {}): Promise<T> {
    const res = await this.fetcher(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  }
}

export const ArkClientFetch = new ArkClient(fetch);
