import { env } from "@/env";
export type Fetcher<T> = (url: string, options?: FetcherOpts) => Promise<T>
export interface FetcherOpts {
  headers?: Record<string, string>
};

// ArkClient aims to ease the testing phase of api endpoints
export class ArkClient {
  fetcher: Fetcher<any>
  source: string

  constructor(fetcher: Fetcher<any>, source: string) {
    this.fetcher = fetcher
    this.source = source
  }

  public async fetch<T>(url: string, options: FetcherOpts = {}): Promise<T> {
    const res = await this.fetcher(this.source + url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
  }
}

export const ArkMarketplaceClientFetch = new ArkClient(fetch, env.NEXT_PUBLIC_ARK_MARKETPLACE_API);
export const ArkOrderbookFetch = new ArkClient(fetch, env.NEXT_PUBLIC_ARK_ORDERBOOK_API);
