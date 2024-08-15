export interface Collection {
  address: string;
  name: string;
  floor?: string;
  image?: string;
  listed_items: number;
  listed_percentage: number;
  marketcap: number;
  owner_count: number;
  sales_7d: number;
  token_count: number;
  total_sales: number;
  total_volume: number;
  volume_7d_eth: number;
}

export interface TokenMetadataAttribute {
  display_type?: string;
  trait_type?: string;
  value?: string;
}

export interface TokenMetadata {
  image: string;
  name: string;
  animation_key: string | null;
  animation_url: string | null;
  image_key: string | null;
  attributes: TokenMetadataAttribute[];
}

export type CollectionActivityType =
  | "LISTING"
  | "OFFER"
  | "CANCELLED"
  | "FULFILL"
  | "TRANSFER"
  | "EXECUTED"
  | "MINT"
  | "BURN";

export interface CollectionActivity {
  activity_type: CollectionActivityType;
  from: string;
  is_verified: boolean;
  name: string;
  price: string;
  time_stamp: number;
  to: string;
  token_id: string;
  token_metadata: TokenMetadata;
  transaction_hash: string | null;
}
