import type { ManipulateType } from "dayjs";

export interface Token {
  contract: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  media: string | null;
  kind: string;
  isFlagged: boolean;
  lastFlagUpdate: string;
  lastFlagChange: string | null;
  rarity: number;
  rarityRank: number;
  collection: {
    id: string;
    name: string;
    image: string;
    slug: string;
  };
  lastBuy: {
    value: number;
    timestamp: number;
  };
  lastSell: {
    value: number | null;
    timestamp: number | null;
  };
  owner: string;
  attributes: Attributes[];
}

export interface Attributes {
  key: string;
  kind?: string;
  value: string;
  tokenCount?: number;
  onSaleCount?: number;
  floorAskPrice?: number;
  topBidValue?: number | null;
  createdAt?: string;
  values: (string | number)[];
}

export interface Market {
  floorAsk: {
    id: string;
    price: {
      currency: {
        contract: string;
        name: string;
        symbol: string;
        decimals: number;
      };
      amount: {
        raw: string;
        decimal: number;
        usd: number;
        native: number;
      };
    };
    maker: string;
    validFrom: number;
    validUntil: number;
    source: {
      id: string;
      domain: string;
      name: string;
      icon: string;
      url: string;
    };
  };
}

export interface TokenMarketData {
  token: Token;
  market: Market;
}

export interface UserTokenData {
  token: Token;
  ownership: TokenOwnership;
}
export interface L2Collection {
  name: string;
  link: string;
  floorAsk?: {
    id: string;
    sourceDomain: string;
    price: {
      currency: {
        contract: string;
        name: string;
        symbol: string;
        decimals: number;
      };
      amount: {
        raw: string;
        decimal: number;
        usd: number;
        native: number;
      };
    };
    maker: string;
    validFrom: number;
    validUntil: number;
    token: {
      contract: string;
      tokenId: string;
      name: string;
      image: string;
    };
  };
  image: string;
}
export interface Collection {
  id: string;
  link?: string;
  slug: string;
  createdAt: string;
  name: string;
  image: string;
  banner: string;
  discordUrl: string;
  externalUrl: string;
  twitterUsername: string;
  openseaVerificationStatus: string;
  description: string;
  sampleImages: string[];
  tokenCount: string;
  onSaleCount: string;
  primaryContract: string;
  tokenSetId: string;
  royalties: {
    recipient: string;
    breakdown: {
      bps: number;
      recipient: string;
    }[];
    bps: number;
  };
  allRoyalties: {
    opensea: {
      bps: number;
      recipient: string;
    }[];
  };
  lastBuy: {
    value: null;
  };
  floorAsk?: {
    id: string;
    sourceDomain: string;
    price: {
      currency: {
        contract: string;
        name: string;
        symbol: string;
        decimals: number;
      };
      amount: {
        raw: string;
        decimal: number;
        usd: number;
        native: number;
      };
    };
    maker: string;
    validFrom: number;
    validUntil: number;
    token: {
      contract: string;
      tokenId: string;
      name: string;
      image: string;
    };
  };
  rank: {
    "1day": number;
    "7day": number;
    "30day": number;
    allTime: number;
  };
  volume: {
    "1day": number;
    "7day": number;
    "30day": number;
    allTime: number;
  };
  volumeChange: {
    "1day": number;
    "7day": number;
    "30day": number;
  };
  floorSale: {
    "1day": number;
    "7day": number;
    "30day": number;
  };
  floorSaleChange: {
    "1day": number;
    "7day": number;
    "30day": number;
  };
  collectionBidSupported: boolean;
  contractKind: string;
}

export interface Activity {
  type: string;
  fromAddress: string;
  toAddress: string | null;
  price: { currency: { symbol: string }; amount: { native: number } } & number;
  amount: number;
  timestamp: number;
  createdAt: string;
  contract: string;
  token: {
    tokenId: string | null;
    tokenName: string | null;
    tokenImage: string | null;
  };
  collection: {
    collectionId: string;
    collectionImage: string;
    collectionName: string;
  };
  order: {
    id: string;
    side: string;
    source: {
      domain: string;
      name: string;
      icon: string;
    };
    criteria: {
      kind: string;
      data: {
        collection: {
          id: string;
          name: string;
          image: string;
        };
      };
    };
  };
}

interface FloorAsk {
  id: string | null;
  price: number | null;
  maker: string | null;
  validFrom: string | null;
  validUntil: string | null;
  source: Record<string, unknown>;
}

export interface TokenOwnership {
  tokenCount: string;
  onSaleCount: string;
  floorAsk: FloorAsk;
  acquiredAt: string;
}

interface Link {
  website: string;
  discord: string;
  twitter: string;
  whitepaper?: string;
}

interface CompatibleToken {
  name: string;
  //contract: string;
  icon: string;
  image: string;
}

interface ScreenShot {
  src: string;
  alt: string;
}

export interface Game {
  name: string;
  id: string;
  status: string;
  image: string;
  color: string;
  chains: string[];
  description: string;
  links: Link;
  compatibleTokens: CompatibleToken[];
  screenshots: ScreenShot[];
  homepage?: string;
}

export interface Realm {
  id: string;
  name: string;
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface ExpirationOption {
  text: string;
  value: string;
  relativeTime: number | null;
  relativeTimeUnit: ManipulateType | null;
}

export interface ContractDetails {
  title: string;
  value: string;
}
