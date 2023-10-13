// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace L1RealmsTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  resource?: Maybe<Resource>;
  resources: Array<Resource>;
  realm?: Maybe<Realm>;
  realms: Array<Realm>;
  realmResource?: Maybe<RealmResource>;
  realmResources: Array<RealmResource>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryresourceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryresourcesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Resource_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Resource_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrealmArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrealmsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Realm_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Realm_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrealmResourceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrealmResourcesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealmResource_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RealmResource_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywalletArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywalletsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Wallet_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Realm = {
  id: Scalars['ID'];
  tokenId: Scalars['Int'];
  currentOwner: Wallet;
  minted: Scalars['BigInt'];
  name?: Maybe<Scalars['String']>;
  cities: Scalars['Int'];
  harbours: Scalars['Int'];
  rivers: Scalars['Int'];
  regions: Scalars['Int'];
  resourceIds: Array<Scalars['Int']>;
  resources?: Maybe<Array<RealmResource>>;
  wonder?: Maybe<Scalars['String']>;
  rarityScore: Scalars['BigDecimal'];
  rarityRank: Scalars['BigInt'];
  order?: Maybe<Scalars['String']>;
  bridgedOwner?: Maybe<Wallet>;
  bridgedV2Owner?: Maybe<Wallet>;
};


export type RealmresourcesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealmResource_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RealmResource_filter>;
};

export type RealmResource = {
  id: Scalars['ID'];
  realm: Realm;
  resource: Resource;
};

export type RealmResource_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  realm?: InputMaybe<Scalars['String']>;
  realm_not?: InputMaybe<Scalars['String']>;
  realm_gt?: InputMaybe<Scalars['String']>;
  realm_lt?: InputMaybe<Scalars['String']>;
  realm_gte?: InputMaybe<Scalars['String']>;
  realm_lte?: InputMaybe<Scalars['String']>;
  realm_in?: InputMaybe<Array<Scalars['String']>>;
  realm_not_in?: InputMaybe<Array<Scalars['String']>>;
  realm_contains?: InputMaybe<Scalars['String']>;
  realm_contains_nocase?: InputMaybe<Scalars['String']>;
  realm_not_contains?: InputMaybe<Scalars['String']>;
  realm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  realm_starts_with?: InputMaybe<Scalars['String']>;
  realm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  realm_not_starts_with?: InputMaybe<Scalars['String']>;
  realm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  realm_ends_with?: InputMaybe<Scalars['String']>;
  realm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  realm_not_ends_with?: InputMaybe<Scalars['String']>;
  realm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  realm_?: InputMaybe<Realm_filter>;
  resource?: InputMaybe<Scalars['String']>;
  resource_not?: InputMaybe<Scalars['String']>;
  resource_gt?: InputMaybe<Scalars['String']>;
  resource_lt?: InputMaybe<Scalars['String']>;
  resource_gte?: InputMaybe<Scalars['String']>;
  resource_lte?: InputMaybe<Scalars['String']>;
  resource_in?: InputMaybe<Array<Scalars['String']>>;
  resource_not_in?: InputMaybe<Array<Scalars['String']>>;
  resource_contains?: InputMaybe<Scalars['String']>;
  resource_contains_nocase?: InputMaybe<Scalars['String']>;
  resource_not_contains?: InputMaybe<Scalars['String']>;
  resource_not_contains_nocase?: InputMaybe<Scalars['String']>;
  resource_starts_with?: InputMaybe<Scalars['String']>;
  resource_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resource_not_starts_with?: InputMaybe<Scalars['String']>;
  resource_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  resource_ends_with?: InputMaybe<Scalars['String']>;
  resource_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resource_not_ends_with?: InputMaybe<Scalars['String']>;
  resource_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  resource_?: InputMaybe<Resource_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RealmResource_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RealmResource_filter>>>;
};

export type RealmResource_orderBy =
  | 'id'
  | 'realm'
  | 'realm__id'
  | 'realm__tokenId'
  | 'realm__minted'
  | 'realm__name'
  | 'realm__cities'
  | 'realm__harbours'
  | 'realm__rivers'
  | 'realm__regions'
  | 'realm__wonder'
  | 'realm__rarityScore'
  | 'realm__rarityRank'
  | 'realm__order'
  | 'resource'
  | 'resource__id'
  | 'resource__name'
  | 'resource__totalRealms';

export type RealmTraitOption =
  | 'regions'
  | 'cities'
  | 'harbors'
  | 'rivers';

export type Realm_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenId?: InputMaybe<Scalars['Int']>;
  tokenId_not?: InputMaybe<Scalars['Int']>;
  tokenId_gt?: InputMaybe<Scalars['Int']>;
  tokenId_lt?: InputMaybe<Scalars['Int']>;
  tokenId_gte?: InputMaybe<Scalars['Int']>;
  tokenId_lte?: InputMaybe<Scalars['Int']>;
  tokenId_in?: InputMaybe<Array<Scalars['Int']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  currentOwner?: InputMaybe<Scalars['String']>;
  currentOwner_not?: InputMaybe<Scalars['String']>;
  currentOwner_gt?: InputMaybe<Scalars['String']>;
  currentOwner_lt?: InputMaybe<Scalars['String']>;
  currentOwner_gte?: InputMaybe<Scalars['String']>;
  currentOwner_lte?: InputMaybe<Scalars['String']>;
  currentOwner_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentOwner_contains?: InputMaybe<Scalars['String']>;
  currentOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains?: InputMaybe<Scalars['String']>;
  currentOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  currentOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentOwner_?: InputMaybe<Wallet_filter>;
  minted?: InputMaybe<Scalars['BigInt']>;
  minted_not?: InputMaybe<Scalars['BigInt']>;
  minted_gt?: InputMaybe<Scalars['BigInt']>;
  minted_lt?: InputMaybe<Scalars['BigInt']>;
  minted_gte?: InputMaybe<Scalars['BigInt']>;
  minted_lte?: InputMaybe<Scalars['BigInt']>;
  minted_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minted_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  cities?: InputMaybe<Scalars['Int']>;
  cities_not?: InputMaybe<Scalars['Int']>;
  cities_gt?: InputMaybe<Scalars['Int']>;
  cities_lt?: InputMaybe<Scalars['Int']>;
  cities_gte?: InputMaybe<Scalars['Int']>;
  cities_lte?: InputMaybe<Scalars['Int']>;
  cities_in?: InputMaybe<Array<Scalars['Int']>>;
  cities_not_in?: InputMaybe<Array<Scalars['Int']>>;
  harbours?: InputMaybe<Scalars['Int']>;
  harbours_not?: InputMaybe<Scalars['Int']>;
  harbours_gt?: InputMaybe<Scalars['Int']>;
  harbours_lt?: InputMaybe<Scalars['Int']>;
  harbours_gte?: InputMaybe<Scalars['Int']>;
  harbours_lte?: InputMaybe<Scalars['Int']>;
  harbours_in?: InputMaybe<Array<Scalars['Int']>>;
  harbours_not_in?: InputMaybe<Array<Scalars['Int']>>;
  rivers?: InputMaybe<Scalars['Int']>;
  rivers_not?: InputMaybe<Scalars['Int']>;
  rivers_gt?: InputMaybe<Scalars['Int']>;
  rivers_lt?: InputMaybe<Scalars['Int']>;
  rivers_gte?: InputMaybe<Scalars['Int']>;
  rivers_lte?: InputMaybe<Scalars['Int']>;
  rivers_in?: InputMaybe<Array<Scalars['Int']>>;
  rivers_not_in?: InputMaybe<Array<Scalars['Int']>>;
  regions?: InputMaybe<Scalars['Int']>;
  regions_not?: InputMaybe<Scalars['Int']>;
  regions_gt?: InputMaybe<Scalars['Int']>;
  regions_lt?: InputMaybe<Scalars['Int']>;
  regions_gte?: InputMaybe<Scalars['Int']>;
  regions_lte?: InputMaybe<Scalars['Int']>;
  regions_in?: InputMaybe<Array<Scalars['Int']>>;
  regions_not_in?: InputMaybe<Array<Scalars['Int']>>;
  resourceIds?: InputMaybe<Array<Scalars['Int']>>;
  resourceIds_not?: InputMaybe<Array<Scalars['Int']>>;
  resourceIds_contains?: InputMaybe<Array<Scalars['Int']>>;
  resourceIds_contains_nocase?: InputMaybe<Array<Scalars['Int']>>;
  resourceIds_not_contains?: InputMaybe<Array<Scalars['Int']>>;
  resourceIds_not_contains_nocase?: InputMaybe<Array<Scalars['Int']>>;
  resources_?: InputMaybe<RealmResource_filter>;
  wonder?: InputMaybe<Scalars['String']>;
  wonder_not?: InputMaybe<Scalars['String']>;
  wonder_gt?: InputMaybe<Scalars['String']>;
  wonder_lt?: InputMaybe<Scalars['String']>;
  wonder_gte?: InputMaybe<Scalars['String']>;
  wonder_lte?: InputMaybe<Scalars['String']>;
  wonder_in?: InputMaybe<Array<Scalars['String']>>;
  wonder_not_in?: InputMaybe<Array<Scalars['String']>>;
  wonder_contains?: InputMaybe<Scalars['String']>;
  wonder_contains_nocase?: InputMaybe<Scalars['String']>;
  wonder_not_contains?: InputMaybe<Scalars['String']>;
  wonder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  wonder_starts_with?: InputMaybe<Scalars['String']>;
  wonder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wonder_not_starts_with?: InputMaybe<Scalars['String']>;
  wonder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  wonder_ends_with?: InputMaybe<Scalars['String']>;
  wonder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  wonder_not_ends_with?: InputMaybe<Scalars['String']>;
  wonder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rarityScore?: InputMaybe<Scalars['BigDecimal']>;
  rarityScore_not?: InputMaybe<Scalars['BigDecimal']>;
  rarityScore_gt?: InputMaybe<Scalars['BigDecimal']>;
  rarityScore_lt?: InputMaybe<Scalars['BigDecimal']>;
  rarityScore_gte?: InputMaybe<Scalars['BigDecimal']>;
  rarityScore_lte?: InputMaybe<Scalars['BigDecimal']>;
  rarityScore_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rarityScore_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rarityRank?: InputMaybe<Scalars['BigInt']>;
  rarityRank_not?: InputMaybe<Scalars['BigInt']>;
  rarityRank_gt?: InputMaybe<Scalars['BigInt']>;
  rarityRank_lt?: InputMaybe<Scalars['BigInt']>;
  rarityRank_gte?: InputMaybe<Scalars['BigInt']>;
  rarityRank_lte?: InputMaybe<Scalars['BigInt']>;
  rarityRank_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rarityRank_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  order?: InputMaybe<Scalars['String']>;
  order_not?: InputMaybe<Scalars['String']>;
  order_gt?: InputMaybe<Scalars['String']>;
  order_lt?: InputMaybe<Scalars['String']>;
  order_gte?: InputMaybe<Scalars['String']>;
  order_lte?: InputMaybe<Scalars['String']>;
  order_in?: InputMaybe<Array<Scalars['String']>>;
  order_not_in?: InputMaybe<Array<Scalars['String']>>;
  order_contains?: InputMaybe<Scalars['String']>;
  order_contains_nocase?: InputMaybe<Scalars['String']>;
  order_not_contains?: InputMaybe<Scalars['String']>;
  order_not_contains_nocase?: InputMaybe<Scalars['String']>;
  order_starts_with?: InputMaybe<Scalars['String']>;
  order_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order_not_starts_with?: InputMaybe<Scalars['String']>;
  order_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  order_ends_with?: InputMaybe<Scalars['String']>;
  order_ends_with_nocase?: InputMaybe<Scalars['String']>;
  order_not_ends_with?: InputMaybe<Scalars['String']>;
  order_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner?: InputMaybe<Scalars['String']>;
  bridgedOwner_not?: InputMaybe<Scalars['String']>;
  bridgedOwner_gt?: InputMaybe<Scalars['String']>;
  bridgedOwner_lt?: InputMaybe<Scalars['String']>;
  bridgedOwner_gte?: InputMaybe<Scalars['String']>;
  bridgedOwner_lte?: InputMaybe<Scalars['String']>;
  bridgedOwner_in?: InputMaybe<Array<Scalars['String']>>;
  bridgedOwner_not_in?: InputMaybe<Array<Scalars['String']>>;
  bridgedOwner_contains?: InputMaybe<Scalars['String']>;
  bridgedOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner_not_contains?: InputMaybe<Scalars['String']>;
  bridgedOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner_starts_with?: InputMaybe<Scalars['String']>;
  bridgedOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  bridgedOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner_ends_with?: InputMaybe<Scalars['String']>;
  bridgedOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  bridgedOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedOwner_?: InputMaybe<Wallet_filter>;
  bridgedV2Owner?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_gt?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_lt?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_gte?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_lte?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_in?: InputMaybe<Array<Scalars['String']>>;
  bridgedV2Owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  bridgedV2Owner_contains?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_contains_nocase?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not_contains?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_starts_with?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not_starts_with?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_ends_with?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not_ends_with?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bridgedV2Owner_?: InputMaybe<Wallet_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Realm_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Realm_filter>>>;
};

export type Realm_orderBy =
  | 'id'
  | 'tokenId'
  | 'currentOwner'
  | 'currentOwner__id'
  | 'currentOwner__address'
  | 'currentOwner__realmsHeld'
  | 'currentOwner__bridgedRealmsHeld'
  | 'currentOwner__bridgedV2RealmsHeld'
  | 'currentOwner__totalRealms'
  | 'currentOwner__joined'
  | 'minted'
  | 'name'
  | 'cities'
  | 'harbours'
  | 'rivers'
  | 'regions'
  | 'resourceIds'
  | 'resources'
  | 'wonder'
  | 'rarityScore'
  | 'rarityRank'
  | 'order'
  | 'bridgedOwner'
  | 'bridgedOwner__id'
  | 'bridgedOwner__address'
  | 'bridgedOwner__realmsHeld'
  | 'bridgedOwner__bridgedRealmsHeld'
  | 'bridgedOwner__bridgedV2RealmsHeld'
  | 'bridgedOwner__totalRealms'
  | 'bridgedOwner__joined'
  | 'bridgedV2Owner'
  | 'bridgedV2Owner__id'
  | 'bridgedV2Owner__address'
  | 'bridgedV2Owner__realmsHeld'
  | 'bridgedV2Owner__bridgedRealmsHeld'
  | 'bridgedV2Owner__bridgedV2RealmsHeld'
  | 'bridgedV2Owner__totalRealms'
  | 'bridgedV2Owner__joined';

export type Resource = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  totalRealms?: Maybe<Scalars['Int']>;
  realms: Array<RealmResource>;
};


export type ResourcerealmsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealmResource_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RealmResource_filter>;
};

export type ResourceName =
  | 'Wood'
  | 'Stone'
  | 'Coal'
  | 'Copper'
  | 'Obsidian'
  | 'Silver'
  | 'Ironwood'
  | 'Cold_Iron'
  | 'Gold'
  | 'Hartwood'
  | 'Diamonds'
  | 'Sapphire'
  | 'Deep_Crystal'
  | 'Ruby'
  | 'Ignium'
  | 'Ethereal_Silica'
  | 'True_Ice'
  | 'Twilight_Quartz'
  | 'Alchemical_Silver'
  | 'Adamantine'
  | 'Mithral'
  | 'Dragonhide';

export type Resource_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  totalRealms?: InputMaybe<Scalars['Int']>;
  totalRealms_not?: InputMaybe<Scalars['Int']>;
  totalRealms_gt?: InputMaybe<Scalars['Int']>;
  totalRealms_lt?: InputMaybe<Scalars['Int']>;
  totalRealms_gte?: InputMaybe<Scalars['Int']>;
  totalRealms_lte?: InputMaybe<Scalars['Int']>;
  totalRealms_in?: InputMaybe<Array<Scalars['Int']>>;
  totalRealms_not_in?: InputMaybe<Array<Scalars['Int']>>;
  realms_?: InputMaybe<RealmResource_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Resource_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Resource_filter>>>;
};

export type Resource_orderBy =
  | 'id'
  | 'name'
  | 'totalRealms'
  | 'realms';

export type Subscription = {
  resource?: Maybe<Resource>;
  resources: Array<Resource>;
  realm?: Maybe<Realm>;
  realms: Array<Realm>;
  realmResource?: Maybe<RealmResource>;
  realmResources: Array<RealmResource>;
  wallet?: Maybe<Wallet>;
  wallets: Array<Wallet>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionresourceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionresourcesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Resource_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Resource_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrealmArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrealmsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Realm_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Realm_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrealmResourceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrealmResourcesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RealmResource_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RealmResource_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwalletArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwalletsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Wallet_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Transfer = {
  id: Scalars['ID'];
  realm?: Maybe<Realm>;
  from: Wallet;
  to: Wallet;
  txHash: Scalars['Bytes'];
  timestamp: Scalars['BigInt'];
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  realm?: InputMaybe<Scalars['String']>;
  realm_not?: InputMaybe<Scalars['String']>;
  realm_gt?: InputMaybe<Scalars['String']>;
  realm_lt?: InputMaybe<Scalars['String']>;
  realm_gte?: InputMaybe<Scalars['String']>;
  realm_lte?: InputMaybe<Scalars['String']>;
  realm_in?: InputMaybe<Array<Scalars['String']>>;
  realm_not_in?: InputMaybe<Array<Scalars['String']>>;
  realm_contains?: InputMaybe<Scalars['String']>;
  realm_contains_nocase?: InputMaybe<Scalars['String']>;
  realm_not_contains?: InputMaybe<Scalars['String']>;
  realm_not_contains_nocase?: InputMaybe<Scalars['String']>;
  realm_starts_with?: InputMaybe<Scalars['String']>;
  realm_starts_with_nocase?: InputMaybe<Scalars['String']>;
  realm_not_starts_with?: InputMaybe<Scalars['String']>;
  realm_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  realm_ends_with?: InputMaybe<Scalars['String']>;
  realm_ends_with_nocase?: InputMaybe<Scalars['String']>;
  realm_not_ends_with?: InputMaybe<Scalars['String']>;
  realm_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  realm_?: InputMaybe<Realm_filter>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_?: InputMaybe<Wallet_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_?: InputMaybe<Wallet_filter>;
  txHash?: InputMaybe<Scalars['Bytes']>;
  txHash_not?: InputMaybe<Scalars['Bytes']>;
  txHash_gt?: InputMaybe<Scalars['Bytes']>;
  txHash_lt?: InputMaybe<Scalars['Bytes']>;
  txHash_gte?: InputMaybe<Scalars['Bytes']>;
  txHash_lte?: InputMaybe<Scalars['Bytes']>;
  txHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_contains?: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'realm'
  | 'realm__id'
  | 'realm__tokenId'
  | 'realm__minted'
  | 'realm__name'
  | 'realm__cities'
  | 'realm__harbours'
  | 'realm__rivers'
  | 'realm__regions'
  | 'realm__wonder'
  | 'realm__rarityScore'
  | 'realm__rarityRank'
  | 'realm__order'
  | 'from'
  | 'from__id'
  | 'from__address'
  | 'from__realmsHeld'
  | 'from__bridgedRealmsHeld'
  | 'from__bridgedV2RealmsHeld'
  | 'from__totalRealms'
  | 'from__joined'
  | 'to'
  | 'to__id'
  | 'to__address'
  | 'to__realmsHeld'
  | 'to__bridgedRealmsHeld'
  | 'to__bridgedV2RealmsHeld'
  | 'to__totalRealms'
  | 'to__joined'
  | 'txHash'
  | 'timestamp';

export type Wallet = {
  id: Scalars['ID'];
  address: Scalars['Bytes'];
  realms?: Maybe<Array<Realm>>;
  realmsHeld: Scalars['BigInt'];
  bridgedRealmsHeld: Scalars['BigInt'];
  bridgedV2RealmsHeld: Scalars['BigInt'];
  totalRealms: Scalars['BigInt'];
  joined: Scalars['BigInt'];
};


export type WalletrealmsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Realm_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Realm_filter>;
};

export type Wallet_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_gt?: InputMaybe<Scalars['Bytes']>;
  address_lt?: InputMaybe<Scalars['Bytes']>;
  address_gte?: InputMaybe<Scalars['Bytes']>;
  address_lte?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  realms_?: InputMaybe<Realm_filter>;
  realmsHeld?: InputMaybe<Scalars['BigInt']>;
  realmsHeld_not?: InputMaybe<Scalars['BigInt']>;
  realmsHeld_gt?: InputMaybe<Scalars['BigInt']>;
  realmsHeld_lt?: InputMaybe<Scalars['BigInt']>;
  realmsHeld_gte?: InputMaybe<Scalars['BigInt']>;
  realmsHeld_lte?: InputMaybe<Scalars['BigInt']>;
  realmsHeld_in?: InputMaybe<Array<Scalars['BigInt']>>;
  realmsHeld_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedRealmsHeld?: InputMaybe<Scalars['BigInt']>;
  bridgedRealmsHeld_not?: InputMaybe<Scalars['BigInt']>;
  bridgedRealmsHeld_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedRealmsHeld_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedRealmsHeld_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedRealmsHeld_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedRealmsHeld_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedRealmsHeld_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedV2RealmsHeld?: InputMaybe<Scalars['BigInt']>;
  bridgedV2RealmsHeld_not?: InputMaybe<Scalars['BigInt']>;
  bridgedV2RealmsHeld_gt?: InputMaybe<Scalars['BigInt']>;
  bridgedV2RealmsHeld_lt?: InputMaybe<Scalars['BigInt']>;
  bridgedV2RealmsHeld_gte?: InputMaybe<Scalars['BigInt']>;
  bridgedV2RealmsHeld_lte?: InputMaybe<Scalars['BigInt']>;
  bridgedV2RealmsHeld_in?: InputMaybe<Array<Scalars['BigInt']>>;
  bridgedV2RealmsHeld_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRealms?: InputMaybe<Scalars['BigInt']>;
  totalRealms_not?: InputMaybe<Scalars['BigInt']>;
  totalRealms_gt?: InputMaybe<Scalars['BigInt']>;
  totalRealms_lt?: InputMaybe<Scalars['BigInt']>;
  totalRealms_gte?: InputMaybe<Scalars['BigInt']>;
  totalRealms_lte?: InputMaybe<Scalars['BigInt']>;
  totalRealms_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalRealms_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  joined?: InputMaybe<Scalars['BigInt']>;
  joined_not?: InputMaybe<Scalars['BigInt']>;
  joined_gt?: InputMaybe<Scalars['BigInt']>;
  joined_lt?: InputMaybe<Scalars['BigInt']>;
  joined_gte?: InputMaybe<Scalars['BigInt']>;
  joined_lte?: InputMaybe<Scalars['BigInt']>;
  joined_in?: InputMaybe<Array<Scalars['BigInt']>>;
  joined_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Wallet_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Wallet_filter>>>;
};

export type Wallet_orderBy =
  | 'id'
  | 'address'
  | 'realms'
  | 'realmsHeld'
  | 'bridgedRealmsHeld'
  | 'bridgedV2RealmsHeld'
  | 'totalRealms'
  | 'joined';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  resource: InContextSdkMethod<Query['resource'], QueryresourceArgs, MeshContext>,
  /** null **/
  resources: InContextSdkMethod<Query['resources'], QueryresourcesArgs, MeshContext>,
  /** null **/
  realm: InContextSdkMethod<Query['realm'], QueryrealmArgs, MeshContext>,
  /** null **/
  realms: InContextSdkMethod<Query['realms'], QueryrealmsArgs, MeshContext>,
  /** null **/
  realmResource: InContextSdkMethod<Query['realmResource'], QueryrealmResourceArgs, MeshContext>,
  /** null **/
  realmResources: InContextSdkMethod<Query['realmResources'], QueryrealmResourcesArgs, MeshContext>,
  /** null **/
  wallet: InContextSdkMethod<Query['wallet'], QuerywalletArgs, MeshContext>,
  /** null **/
  wallets: InContextSdkMethod<Query['wallets'], QuerywalletsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Query['transfer'], QuerytransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  resource: InContextSdkMethod<Subscription['resource'], SubscriptionresourceArgs, MeshContext>,
  /** null **/
  resources: InContextSdkMethod<Subscription['resources'], SubscriptionresourcesArgs, MeshContext>,
  /** null **/
  realm: InContextSdkMethod<Subscription['realm'], SubscriptionrealmArgs, MeshContext>,
  /** null **/
  realms: InContextSdkMethod<Subscription['realms'], SubscriptionrealmsArgs, MeshContext>,
  /** null **/
  realmResource: InContextSdkMethod<Subscription['realmResource'], SubscriptionrealmResourceArgs, MeshContext>,
  /** null **/
  realmResources: InContextSdkMethod<Subscription['realmResources'], SubscriptionrealmResourcesArgs, MeshContext>,
  /** null **/
  wallet: InContextSdkMethod<Subscription['wallet'], SubscriptionwalletArgs, MeshContext>,
  /** null **/
  wallets: InContextSdkMethod<Subscription['wallets'], SubscriptionwalletsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Subscription['transfer'], SubscriptiontransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Subscription['transfers'], SubscriptiontransfersArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["l1Realms"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      ["realmsSubgraph"]: Scalars['ID']
    };
}
