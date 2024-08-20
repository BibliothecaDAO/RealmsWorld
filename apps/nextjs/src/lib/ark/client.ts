import { env } from "@/env";

export type Fetcher<T> = (url: string, options?: FetcherOpts) => Promise<T>;
export interface FetcherOpts {
  headers?: Record<string, string>;
}

// ArkClient aims to ease the testing phase of api endpoints
export class ArkClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher: Fetcher<any>;
  source: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(fetcher: Fetcher<any>, source: string) {
    this.fetcher = fetcher;
    this.source = source;
  }

  public async fetch<T>(url: string, options: FetcherOpts = {}): Promise<T> {
    const res = await this.fetcher(this.source + url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    }) as Response;
    return await res.json() as T;
  }
}

export const ArkMarketplaceClientFetch = new ArkClient(
  fetch,
  env.NEXT_PUBLIC_ARK_MARKETPLACE_API,
);
export const ArkOrderbookFetch = new ArkClient(
  fetch,
  env.NEXT_PUBLIC_ARK_ORDERBOOK_API,
);
