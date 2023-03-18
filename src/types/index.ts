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