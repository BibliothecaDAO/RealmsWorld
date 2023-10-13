// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { LordsbridgeTypes } from './sources/lordsbridge/types';
import type { ApibaraTypes } from './sources/apibara/types';
import type { L1RealmsTypes } from './sources/l1Realms/types';
import * as importedModule$0 from "./sources/apibara/introspectionSchema";
import * as importedModule$1 from "./sources/lordsbridge/introspectionSchema";
import * as importedModule$2 from "./sources/l1Realms/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Decimal: any;
  DateTime: any;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type Query = {
  l2deposits: Array<L2Deposit>;
  deposit?: Maybe<Deposit>;
  l2withdrawals: Array<L2Withdrawal>;
  beasts: Array<Beast>;
  depositEvent?: Maybe<DepositEvent>;
  depositEvents: Array<DepositEvent>;
  deposits: Array<Deposit>;
  withdrawalEvent?: Maybe<WithdrawalEvent>;
  withdrawalEvents: Array<WithdrawalEvent>;
  withdrawal?: Maybe<Withdrawal>;
  withdrawals: Array<Withdrawal>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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
};


export type Queryl2depositsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderByDirection?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<WhereFilterForTransaction>;
};


export type QuerydepositArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Queryl2withdrawalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderByDirection?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<WhereFilterForWithdrawals>;
};


export type QuerybeastsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderByDirection?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<WhereFilterForBeasts>;
};


export type QuerydepositEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DepositEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DepositEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Deposit_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawalEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawalEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawalEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawalEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Withdrawal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Withdrawal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type L2Deposit = {
  id: Scalars['String'];
  l2Recipient: Scalars['String'];
  amount: Scalars['Decimal'];
  timestamp: Scalars['DateTime'];
  hash: Scalars['String'];
};

export type WhereFilterForTransaction = {
  id?: InputMaybe<Scalars['String']>;
  l2Recipient?: InputMaybe<Scalars['String']>;
};

export type L2Withdrawal = {
  id: Scalars['String'];
  l1Recipient: Scalars['String'];
  l2Sender: Scalars['String'];
  amount: Scalars['Decimal'];
  timestamp: Scalars['DateTime'];
  hash: Scalars['String'];
};

export type WhereFilterForWithdrawals = {
  id?: InputMaybe<Scalars['String']>;
  l2Sender?: InputMaybe<Scalars['String']>;
};

export type Beast = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  tier?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
};

export type WhereFilterForBeasts = {
  id?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  depositEvent?: Maybe<DepositEvent>;
  depositEvents: Array<DepositEvent>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  withdrawalEvent?: Maybe<WithdrawalEvent>;
  withdrawalEvents: Array<WithdrawalEvent>;
  withdrawal?: Maybe<Withdrawal>;
  withdrawals: Array<Withdrawal>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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
};


export type SubscriptiondepositEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DepositEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DepositEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Deposit_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Deposit_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawalEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawalEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawalEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawalEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Withdrawal_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Withdrawal_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Deposit = {
  /** [bridgeL1Address, ...payload].join('-') */
  id: Scalars['ID'];
  depositEvents: Array<DepositEvent>;
  l1Sender: Scalars['Bytes'];
  l2Recipient: Scalars['Bytes'];
  createdTimestamp?: Maybe<Scalars['BigInt']>;
};


export type DepositdepositEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DepositEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DepositEvent_filter>;
};

export type DepositEvent = {
  /** uniq ID */
  id: Scalars['ID'];
  bridgeAddressL1: Scalars['Bytes'];
  bridgeAddressL2: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  status: TransferStatus;
  payload?: Maybe<Array<Scalars['BigInt']>>;
  nonce?: Maybe<Scalars['BigInt']>;
  createdAtBlock: Scalars['BigInt'];
  createdTxHash: Scalars['Bytes'];
  finishedAtBlock?: Maybe<Scalars['BigInt']>;
  finishedAtDate?: Maybe<Scalars['BigInt']>;
  finishedTxHash?: Maybe<Scalars['Bytes']>;
};

export type DepositEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  bridgeAddressL1?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_not?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_gt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_lt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_gte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_lte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL1_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL1_contains?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_not_contains?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_not?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_gt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_lt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_gte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_lte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL2_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL2_contains?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<TransferStatus>;
  status_not?: InputMaybe<TransferStatus>;
  status_in?: InputMaybe<Array<TransferStatus>>;
  status_not_in?: InputMaybe<Array<TransferStatus>>;
  payload?: InputMaybe<Array<Scalars['BigInt']>>;
  payload_not?: InputMaybe<Array<Scalars['BigInt']>>;
  payload_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  payload_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  payload_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  payload_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTxHash?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_not?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_gt?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_lt?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_gte?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_lte?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  finishedAtBlock?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedAtDate?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_not?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_gt?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_lt?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_gte?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_lte?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedAtDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedTxHash?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_not?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_gt?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_lt?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_gte?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_lte?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  finishedTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  finishedTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DepositEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DepositEvent_filter>>>;
};

export type DepositEvent_orderBy =
  | 'id'
  | 'bridgeAddressL1'
  | 'bridgeAddressL2'
  | 'amount'
  | 'status'
  | 'payload'
  | 'nonce'
  | 'createdAtBlock'
  | 'createdTxHash'
  | 'finishedAtBlock'
  | 'finishedAtDate'
  | 'finishedTxHash';

export type Deposit_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  depositEvents?: InputMaybe<Array<Scalars['String']>>;
  depositEvents_not?: InputMaybe<Array<Scalars['String']>>;
  depositEvents_contains?: InputMaybe<Array<Scalars['String']>>;
  depositEvents_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  depositEvents_not_contains?: InputMaybe<Array<Scalars['String']>>;
  depositEvents_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  depositEvents_?: InputMaybe<DepositEvent_filter>;
  l1Sender?: InputMaybe<Scalars['Bytes']>;
  l1Sender_not?: InputMaybe<Scalars['Bytes']>;
  l1Sender_gt?: InputMaybe<Scalars['Bytes']>;
  l1Sender_lt?: InputMaybe<Scalars['Bytes']>;
  l1Sender_gte?: InputMaybe<Scalars['Bytes']>;
  l1Sender_lte?: InputMaybe<Scalars['Bytes']>;
  l1Sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l1Sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l1Sender_contains?: InputMaybe<Scalars['Bytes']>;
  l1Sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  l2Recipient?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_not?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_gt?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_lt?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_gte?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_lte?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l2Recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l2Recipient_contains?: InputMaybe<Scalars['Bytes']>;
  l2Recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Deposit_filter>>>;
};

export type Deposit_orderBy =
  | 'id'
  | 'depositEvents'
  | 'l1Sender'
  | 'l2Recipient'
  | 'createdTimestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Token = {
  /** address */
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['Int'];
};

export type Token_filter = {
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
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
};

export type Token_orderBy =
  | 'id'
  | 'name'
  | 'symbol'
  | 'decimals';

export type TransferStatus =
  | 'PENDING'
  | 'FINISHED'
  | 'ACCEPTED_ON_L1'
  | 'ACCEPTED_ON_L2';

export type Withdrawal = {
  /** [bridgeL1Address, ...payload].join('-') */
  id: Scalars['ID'];
  l1Recipient: Scalars['Bytes'];
  l2Sender: Scalars['Bytes'];
  createdTimestamp?: Maybe<Scalars['BigInt']>;
  withdrawalEvents: Array<WithdrawalEvent>;
};


export type WithdrawalwithdrawalEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawalEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawalEvent_filter>;
};

export type WithdrawalEvent = {
  /** uniq ID */
  id: Scalars['ID'];
  bridgeAddressL1: Scalars['Bytes'];
  bridgeAddressL2: Scalars['Bytes'];
  l1Recipient: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  status: TransferStatus;
  createdAtBlock: Scalars['BigInt'];
  createdTxHash: Scalars['Bytes'];
  finishedAtBlock?: Maybe<Scalars['BigInt']>;
  finishedAtDate?: Maybe<Scalars['BigInt']>;
  finishedTxHash?: Maybe<Scalars['Bytes']>;
};

export type WithdrawalEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  bridgeAddressL1?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_not?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_gt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_lt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_gte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_lte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL1_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL1_contains?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL1_not_contains?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_not?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_gt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_lt?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_gte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_lte?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL2_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  bridgeAddressL2_contains?: InputMaybe<Scalars['Bytes']>;
  bridgeAddressL2_not_contains?: InputMaybe<Scalars['Bytes']>;
  l1Recipient?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_not?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_gt?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_lt?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_gte?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_lte?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l1Recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l1Recipient_contains?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  status?: InputMaybe<TransferStatus>;
  status_not?: InputMaybe<TransferStatus>;
  status_in?: InputMaybe<Array<TransferStatus>>;
  status_not_in?: InputMaybe<Array<TransferStatus>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTxHash?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_not?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_gt?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_lt?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_gte?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_lte?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  createdTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  finishedAtBlock?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  finishedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedAtDate?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_not?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_gt?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_lt?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_gte?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_lte?: InputMaybe<Scalars['BigInt']>;
  finishedAtDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedAtDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finishedTxHash?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_not?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_gt?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_lt?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_gte?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_lte?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  finishedTxHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  finishedTxHash_contains?: InputMaybe<Scalars['Bytes']>;
  finishedTxHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WithdrawalEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<WithdrawalEvent_filter>>>;
};

export type WithdrawalEvent_orderBy =
  | 'id'
  | 'bridgeAddressL1'
  | 'bridgeAddressL2'
  | 'l1Recipient'
  | 'amount'
  | 'status'
  | 'createdAtBlock'
  | 'createdTxHash'
  | 'finishedAtBlock'
  | 'finishedAtDate'
  | 'finishedTxHash';

export type Withdrawal_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  l1Recipient?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_not?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_gt?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_lt?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_gte?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_lte?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l1Recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l1Recipient_contains?: InputMaybe<Scalars['Bytes']>;
  l1Recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  l2Sender?: InputMaybe<Scalars['Bytes']>;
  l2Sender_not?: InputMaybe<Scalars['Bytes']>;
  l2Sender_gt?: InputMaybe<Scalars['Bytes']>;
  l2Sender_lt?: InputMaybe<Scalars['Bytes']>;
  l2Sender_gte?: InputMaybe<Scalars['Bytes']>;
  l2Sender_lte?: InputMaybe<Scalars['Bytes']>;
  l2Sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l2Sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  l2Sender_contains?: InputMaybe<Scalars['Bytes']>;
  l2Sender_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawalEvents?: InputMaybe<Array<Scalars['String']>>;
  withdrawalEvents_not?: InputMaybe<Array<Scalars['String']>>;
  withdrawalEvents_contains?: InputMaybe<Array<Scalars['String']>>;
  withdrawalEvents_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  withdrawalEvents_not_contains?: InputMaybe<Array<Scalars['String']>>;
  withdrawalEvents_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  withdrawalEvents_?: InputMaybe<WithdrawalEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Withdrawal_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Withdrawal_filter>>>;
};

export type Withdrawal_orderBy =
  | 'id'
  | 'l1Recipient'
  | 'l2Sender'
  | 'createdTimestamp'
  | 'withdrawalEvents';

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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  L2Deposit: ResolverTypeWrapper<L2Deposit>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  WhereFilterForTransaction: WhereFilterForTransaction;
  L2Withdrawal: ResolverTypeWrapper<L2Withdrawal>;
  WhereFilterForWithdrawals: WhereFilterForWithdrawals;
  Beast: ResolverTypeWrapper<Beast>;
  WhereFilterForBeasts: WhereFilterForBeasts;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Subscription: ResolverTypeWrapper<{}>;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Deposit: ResolverTypeWrapper<Deposit>;
  DepositEvent: ResolverTypeWrapper<DepositEvent>;
  DepositEvent_filter: DepositEvent_filter;
  DepositEvent_orderBy: DepositEvent_orderBy;
  Deposit_filter: Deposit_filter;
  Deposit_orderBy: Deposit_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Token: ResolverTypeWrapper<Token>;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  TransferStatus: TransferStatus;
  Withdrawal: ResolverTypeWrapper<Withdrawal>;
  WithdrawalEvent: ResolverTypeWrapper<WithdrawalEvent>;
  WithdrawalEvent_filter: WithdrawalEvent_filter;
  WithdrawalEvent_orderBy: WithdrawalEvent_orderBy;
  Withdrawal_filter: Withdrawal_filter;
  Withdrawal_orderBy: Withdrawal_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  Realm: ResolverTypeWrapper<Realm>;
  RealmResource: ResolverTypeWrapper<RealmResource>;
  RealmResource_filter: RealmResource_filter;
  RealmResource_orderBy: RealmResource_orderBy;
  RealmTraitOption: RealmTraitOption;
  Realm_filter: Realm_filter;
  Realm_orderBy: Realm_orderBy;
  Resource: ResolverTypeWrapper<Resource>;
  ResourceName: ResourceName;
  Resource_filter: Resource_filter;
  Resource_orderBy: Resource_orderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  Wallet: ResolverTypeWrapper<Wallet>;
  Wallet_filter: Wallet_filter;
  Wallet_orderBy: Wallet_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  L2Deposit: L2Deposit;
  String: Scalars['String'];
  Decimal: Scalars['Decimal'];
  DateTime: Scalars['DateTime'];
  Int: Scalars['Int'];
  WhereFilterForTransaction: WhereFilterForTransaction;
  L2Withdrawal: L2Withdrawal;
  WhereFilterForWithdrawals: WhereFilterForWithdrawals;
  Beast: Beast;
  WhereFilterForBeasts: WhereFilterForBeasts;
  Boolean: Scalars['Boolean'];
  Subscription: {};
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Bytes: Scalars['Bytes'];
  Deposit: Deposit;
  DepositEvent: DepositEvent;
  DepositEvent_filter: DepositEvent_filter;
  Deposit_filter: Deposit_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int8: Scalars['Int8'];
  Token: Token;
  Token_filter: Token_filter;
  Withdrawal: Withdrawal;
  WithdrawalEvent: WithdrawalEvent;
  WithdrawalEvent_filter: WithdrawalEvent_filter;
  Withdrawal_filter: Withdrawal_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
  Realm: Realm;
  RealmResource: RealmResource;
  RealmResource_filter: RealmResource_filter;
  Realm_filter: Realm_filter;
  Resource: Resource;
  Resource_filter: Resource_filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  Wallet: Wallet;
  Wallet_filter: Wallet_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  l2deposits?: Resolver<Array<ResolversTypes['L2Deposit']>, ParentType, ContextType, RequireFields<Queryl2depositsArgs, 'first' | 'skip' | 'orderBy' | 'orderByDirection' | 'where'>>;
  deposit?: Resolver<Maybe<ResolversTypes['Deposit']>, ParentType, ContextType, RequireFields<QuerydepositArgs, 'id' | 'subgraphError'>>;
  l2withdrawals?: Resolver<Array<ResolversTypes['L2Withdrawal']>, ParentType, ContextType, RequireFields<Queryl2withdrawalsArgs, 'first' | 'skip' | 'orderBy' | 'orderByDirection' | 'where'>>;
  beasts?: Resolver<Array<ResolversTypes['Beast']>, ParentType, ContextType, RequireFields<QuerybeastsArgs, 'first' | 'skip' | 'orderBy' | 'orderByDirection' | 'where'>>;
  depositEvent?: Resolver<Maybe<ResolversTypes['DepositEvent']>, ParentType, ContextType, RequireFields<QuerydepositEventArgs, 'id' | 'subgraphError'>>;
  depositEvents?: Resolver<Array<ResolversTypes['DepositEvent']>, ParentType, ContextType, RequireFields<QuerydepositEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  deposits?: Resolver<Array<ResolversTypes['Deposit']>, ParentType, ContextType, RequireFields<QuerydepositsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawalEvent?: Resolver<Maybe<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawalEventArgs, 'id' | 'subgraphError'>>;
  withdrawalEvents?: Resolver<Array<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawalEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawal?: Resolver<Maybe<ResolversTypes['Withdrawal']>, ParentType, ContextType, RequireFields<QuerywithdrawalArgs, 'id' | 'subgraphError'>>;
  withdrawals?: Resolver<Array<ResolversTypes['Withdrawal']>, ParentType, ContextType, RequireFields<QuerywithdrawalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  resource?: Resolver<Maybe<ResolversTypes['Resource']>, ParentType, ContextType, RequireFields<QueryresourceArgs, 'id' | 'subgraphError'>>;
  resources?: Resolver<Array<ResolversTypes['Resource']>, ParentType, ContextType, RequireFields<QueryresourcesArgs, 'skip' | 'first' | 'subgraphError'>>;
  realm?: Resolver<Maybe<ResolversTypes['Realm']>, ParentType, ContextType, RequireFields<QueryrealmArgs, 'id' | 'subgraphError'>>;
  realms?: Resolver<Array<ResolversTypes['Realm']>, ParentType, ContextType, RequireFields<QueryrealmsArgs, 'skip' | 'first' | 'subgraphError'>>;
  realmResource?: Resolver<Maybe<ResolversTypes['RealmResource']>, ParentType, ContextType, RequireFields<QueryrealmResourceArgs, 'id' | 'subgraphError'>>;
  realmResources?: Resolver<Array<ResolversTypes['RealmResource']>, ParentType, ContextType, RequireFields<QueryrealmResourcesArgs, 'skip' | 'first' | 'subgraphError'>>;
  wallet?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<QuerywalletArgs, 'id' | 'subgraphError'>>;
  wallets?: Resolver<Array<ResolversTypes['Wallet']>, ParentType, ContextType, RequireFields<QuerywalletsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type L2DepositResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['L2Deposit'] = ResolversParentTypes['L2Deposit']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  l2Recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type L2WithdrawalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['L2Withdrawal'] = ResolversParentTypes['L2Withdrawal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  l1Recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  l2Sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BeastResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Beast'] = ResolversParentTypes['Beast']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  prefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  suffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  depositEvent?: SubscriptionResolver<Maybe<ResolversTypes['DepositEvent']>, "depositEvent", ParentType, ContextType, RequireFields<SubscriptiondepositEventArgs, 'id' | 'subgraphError'>>;
  depositEvents?: SubscriptionResolver<Array<ResolversTypes['DepositEvent']>, "depositEvents", ParentType, ContextType, RequireFields<SubscriptiondepositEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  deposit?: SubscriptionResolver<Maybe<ResolversTypes['Deposit']>, "deposit", ParentType, ContextType, RequireFields<SubscriptiondepositArgs, 'id' | 'subgraphError'>>;
  deposits?: SubscriptionResolver<Array<ResolversTypes['Deposit']>, "deposits", ParentType, ContextType, RequireFields<SubscriptiondepositsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawalEvent?: SubscriptionResolver<Maybe<ResolversTypes['WithdrawalEvent']>, "withdrawalEvent", ParentType, ContextType, RequireFields<SubscriptionwithdrawalEventArgs, 'id' | 'subgraphError'>>;
  withdrawalEvents?: SubscriptionResolver<Array<ResolversTypes['WithdrawalEvent']>, "withdrawalEvents", ParentType, ContextType, RequireFields<SubscriptionwithdrawalEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawal?: SubscriptionResolver<Maybe<ResolversTypes['Withdrawal']>, "withdrawal", ParentType, ContextType, RequireFields<SubscriptionwithdrawalArgs, 'id' | 'subgraphError'>>;
  withdrawals?: SubscriptionResolver<Array<ResolversTypes['Withdrawal']>, "withdrawals", ParentType, ContextType, RequireFields<SubscriptionwithdrawalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
  resource?: SubscriptionResolver<Maybe<ResolversTypes['Resource']>, "resource", ParentType, ContextType, RequireFields<SubscriptionresourceArgs, 'id' | 'subgraphError'>>;
  resources?: SubscriptionResolver<Array<ResolversTypes['Resource']>, "resources", ParentType, ContextType, RequireFields<SubscriptionresourcesArgs, 'skip' | 'first' | 'subgraphError'>>;
  realm?: SubscriptionResolver<Maybe<ResolversTypes['Realm']>, "realm", ParentType, ContextType, RequireFields<SubscriptionrealmArgs, 'id' | 'subgraphError'>>;
  realms?: SubscriptionResolver<Array<ResolversTypes['Realm']>, "realms", ParentType, ContextType, RequireFields<SubscriptionrealmsArgs, 'skip' | 'first' | 'subgraphError'>>;
  realmResource?: SubscriptionResolver<Maybe<ResolversTypes['RealmResource']>, "realmResource", ParentType, ContextType, RequireFields<SubscriptionrealmResourceArgs, 'id' | 'subgraphError'>>;
  realmResources?: SubscriptionResolver<Array<ResolversTypes['RealmResource']>, "realmResources", ParentType, ContextType, RequireFields<SubscriptionrealmResourcesArgs, 'skip' | 'first' | 'subgraphError'>>;
  wallet?: SubscriptionResolver<Maybe<ResolversTypes['Wallet']>, "wallet", ParentType, ContextType, RequireFields<SubscriptionwalletArgs, 'id' | 'subgraphError'>>;
  wallets?: SubscriptionResolver<Array<ResolversTypes['Wallet']>, "wallets", ParentType, ContextType, RequireFields<SubscriptionwalletsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptiontransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptiontransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DepositResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Deposit'] = ResolversParentTypes['Deposit']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  depositEvents?: Resolver<Array<ResolversTypes['DepositEvent']>, ParentType, ContextType, RequireFields<DepositdepositEventsArgs, 'skip' | 'first'>>;
  l1Sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  l2Recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  createdTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DepositEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DepositEvent'] = ResolversParentTypes['DepositEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bridgeAddressL1?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bridgeAddressL2?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TransferStatus'], ParentType, ContextType>;
  payload?: Resolver<Maybe<Array<ResolversTypes['BigInt']>>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTxHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  finishedAtBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  finishedAtDate?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  finishedTxHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithdrawalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Withdrawal'] = ResolversParentTypes['Withdrawal']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  l1Recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  l2Sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  createdTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  withdrawalEvents?: Resolver<Array<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<WithdrawalwithdrawalEventsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithdrawalEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WithdrawalEvent'] = ResolversParentTypes['WithdrawalEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bridgeAddressL1?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bridgeAddressL2?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  l1Recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TransferStatus'], ParentType, ContextType>;
  createdAtBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdTxHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  finishedAtBlock?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  finishedAtDate?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  finishedTxHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RealmResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Realm'] = ResolversParentTypes['Realm']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currentOwner?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  minted?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cities?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  harbours?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rivers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  regions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resourceIds?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  resources?: Resolver<Maybe<Array<ResolversTypes['RealmResource']>>, ParentType, ContextType, RequireFields<RealmresourcesArgs, 'skip' | 'first'>>;
  wonder?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarityScore?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  rarityRank?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bridgedOwner?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>;
  bridgedV2Owner?: Resolver<Maybe<ResolversTypes['Wallet']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RealmResourceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RealmResource'] = ResolversParentTypes['RealmResource']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  realm?: Resolver<ResolversTypes['Realm'], ParentType, ContextType>;
  resource?: Resolver<ResolversTypes['Resource'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResourceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Resource'] = ResolversParentTypes['Resource']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalRealms?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  realms?: Resolver<Array<ResolversTypes['RealmResource']>, ParentType, ContextType, RequireFields<ResourcerealmsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  realm?: Resolver<Maybe<ResolversTypes['Realm']>, ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  txHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WalletResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  realms?: Resolver<Maybe<Array<ResolversTypes['Realm']>>, ParentType, ContextType, RequireFields<WalletrealmsArgs, 'skip' | 'first'>>;
  realmsHeld?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bridgedRealmsHeld?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bridgedV2RealmsHeld?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalRealms?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  joined?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  L2Deposit?: L2DepositResolvers<ContextType>;
  Decimal?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  L2Withdrawal?: L2WithdrawalResolvers<ContextType>;
  Beast?: BeastResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Deposit?: DepositResolvers<ContextType>;
  DepositEvent?: DepositEventResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Token?: TokenResolvers<ContextType>;
  Withdrawal?: WithdrawalResolvers<ContextType>;
  WithdrawalEvent?: WithdrawalEventResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  Realm?: RealmResolvers<ContextType>;
  RealmResource?: RealmResourceResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  Wallet?: WalletResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = ApibaraTypes.Context & LordsbridgeTypes.Context & L1RealmsTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/apibara/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    case ".graphclient/sources/lordsbridge/introspectionSchema":
      return Promise.resolve(importedModule$1) as T;
    
    case ".graphclient/sources/l1Realms/introspectionSchema":
      return Promise.resolve(importedModule$2) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const lordsbridgeTransforms = [];
const apibaraTransforms = [];
const l1RealmsTransforms = [];
const additionalTypeDefs = [] as any[];
const lordsbridgeHandler = new GraphqlHandler({
              name: "lordsbridge",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/{context.subgraphName:redbeardeth/starknet-bridge-mainnet}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("lordsbridge"),
              logger: logger.child("lordsbridge"),
              importFn,
            });
const apibaraHandler = new GraphqlHandler({
              name: "apibara",
              config: {"endpoint":"http://localhost:8080/{context.apibaraHandle:goerli-graphql}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("apibara"),
              logger: logger.child("apibara"),
              importFn,
            });
const l1RealmsHandler = new GraphqlHandler({
              name: "l1Realms",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/{context.realmsSubgraph:bibliothecaforadventurers/realms}"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("l1Realms"),
              logger: logger.child("l1Realms"),
              importFn,
            });
sources[0] = {
          name: 'lordsbridge',
          handler: lordsbridgeHandler,
          transforms: lordsbridgeTransforms
        }
sources[1] = {
          name: 'apibara',
          handler: apibaraHandler,
          transforms: apibaraTransforms
        }
sources[2] = {
          name: 'l1Realms',
          handler: l1RealmsHandler,
          transforms: l1RealmsTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: BeastsDocument,
        get rawSDL() {
          return printWithCache(BeastsDocument);
        },
        location: 'BeastsDocument.graphql'
      },{
        document: DepositsDocument,
        get rawSDL() {
          return printWithCache(DepositsDocument);
        },
        location: 'DepositsDocument.graphql'
      },{
        document: WalletsRealmsDocument,
        get rawSDL() {
          return printWithCache(WalletsRealmsDocument);
        },
        location: 'WalletsRealmsDocument.graphql'
      },{
        document: UsersRealmsDocument,
        get rawSDL() {
          return printWithCache(UsersRealmsDocument);
        },
        location: 'UsersRealmsDocument.graphql'
      },{
        document: L2WithdrawalsDocument,
        get rawSDL() {
          return printWithCache(L2WithdrawalsDocument);
        },
        location: 'L2WithdrawalsDocument.graphql'
      },{
        document: WithdrawalsDocument,
        get rawSDL() {
          return printWithCache(WithdrawalsDocument);
        },
        location: 'WithdrawalsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type BeastsQueryVariables = Exact<{
  where?: InputMaybe<WhereFilterForBeasts>;
}>;


export type BeastsQuery = { beasts: Array<Pick<Beast, 'id' | 'name' | 'image' | 'level' | 'tier' | 'prefix' | 'suffix' | 'owner'>> };

export type DepositsQueryVariables = Exact<{
  depositsWhere?: InputMaybe<Deposit_filter>;
  withdrawalsWhere?: InputMaybe<Withdrawal_filter>;
}>;


export type DepositsQuery = { deposits: Array<(
    Pick<Deposit, 'id' | 'l1Sender' | 'l2Recipient' | 'createdTimestamp'>
    & { depositEvents: Array<Pick<DepositEvent, 'id' | 'status' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate' | 'payload' | 'nonce'>> }
  )>, withdrawals: Array<(
    Pick<Withdrawal, 'id' | 'l2Sender' | 'l1Recipient' | 'createdTimestamp'>
    & { withdrawalEvents: Array<Pick<WithdrawalEvent, 'id' | 'status' | 'l1Recipient' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate'>> }
  )> };

export type WalletsRealmsQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['Bytes']> | Scalars['Bytes']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type WalletsRealmsQuery = { wallets: Array<Pick<Wallet, 'realmsHeld' | 'bridgedRealmsHeld' | 'bridgedV2RealmsHeld'>> };

export type UsersRealmsQueryVariables = Exact<{
  address: Scalars['String'];
  addressId: Scalars['ID'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type UsersRealmsQuery = { realms: Array<Pick<Realm, 'id' | 'name'>>, bridgedRealms: Array<Pick<Realm, 'id' | 'name'>>, bridgedV2Realms: Array<Pick<Realm, 'id' | 'name'>>, wallet?: Maybe<Pick<Wallet, 'realmsHeld' | 'bridgedRealmsHeld' | 'bridgedV2RealmsHeld'>> };

export type L2WithdrawalsQueryVariables = Exact<{
  where?: InputMaybe<WhereFilterForWithdrawals>;
  depositsWhere?: InputMaybe<Deposit_filter>;
}>;


export type L2WithdrawalsQuery = { l2withdrawals: Array<Pick<L2Withdrawal, 'l2Sender' | 'l1Recipient' | 'amount' | 'timestamp'>>, deposits: Array<(
    Pick<Deposit, 'id' | 'l1Sender' | 'l2Recipient' | 'createdTimestamp'>
    & { depositEvents: Array<Pick<DepositEvent, 'id' | 'status' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate' | 'payload' | 'nonce'>> }
  )> };

export type WithdrawalsQueryVariables = Exact<{
  where?: InputMaybe<Withdrawal_filter>;
}>;


export type WithdrawalsQuery = { withdrawals: Array<(
    Pick<Withdrawal, 'id' | 'l2Sender' | 'l1Recipient' | 'createdTimestamp'>
    & { withdrawalEvents: Array<Pick<WithdrawalEvent, 'id' | 'status' | 'l1Recipient' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate'>> }
  )> };


export const BeastsDocument = gql`
    query Beasts($where: WhereFilterForBeasts) {
  beasts(where: $where) {
    id
    name
    image
    level
    tier
    prefix
    suffix
    owner
  }
}
    ` as unknown as DocumentNode<BeastsQuery, BeastsQueryVariables>;
export const DepositsDocument = gql`
    query Deposits($depositsWhere: Deposit_filter, $withdrawalsWhere: Withdrawal_filter) {
  deposits(where: $depositsWhere, orderBy: createdTimestamp, orderDirection: desc) {
    id
    l1Sender
    l2Recipient
    createdTimestamp
    depositEvents {
      id
      status
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
      payload
      nonce
    }
  }
  withdrawals(
    where: $withdrawalsWhere
    orderBy: createdTimestamp
    orderDirection: desc
  ) {
    id
    l2Sender
    l1Recipient
    createdTimestamp
    withdrawalEvents {
      id
      status
      l1Recipient
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
    }
  }
}
    ` as unknown as DocumentNode<DepositsQuery, DepositsQueryVariables>;
export const WalletsRealmsDocument = gql`
    query WalletsRealms($addresses: [Bytes!], $first: Int) {
  wallets(where: {address_in: $addresses}) {
    realmsHeld
    bridgedRealmsHeld
    bridgedV2RealmsHeld
  }
}
    ` as unknown as DocumentNode<WalletsRealmsQuery, WalletsRealmsQueryVariables>;
export const UsersRealmsDocument = gql`
    query UsersRealms($address: String!, $addressId: ID!, $first: Int, $skip: Int) {
  realms(first: $first, skip: $skip, where: {currentOwner_contains: $address}) {
    id
    name
  }
  bridgedRealms: realms(
    first: $first
    skip: $skip
    where: {bridgedOwner: $address}
  ) {
    id
    name
  }
  bridgedV2Realms: realms(
    first: $first
    skip: $skip
    where: {bridgedV2Owner: $address}
  ) {
    id
    name
  }
  wallet(id: $addressId) {
    realmsHeld
    bridgedRealmsHeld
    bridgedV2RealmsHeld
  }
}
    ` as unknown as DocumentNode<UsersRealmsQuery, UsersRealmsQueryVariables>;
export const L2WithdrawalsDocument = gql`
    query L2Withdrawals($where: WhereFilterForWithdrawals, $depositsWhere: Deposit_filter) {
  l2withdrawals(where: $where) {
    l2Sender
    l1Recipient
    amount
    timestamp
  }
  deposits(where: $depositsWhere, orderBy: createdTimestamp, orderDirection: desc) {
    id
    l1Sender
    l2Recipient
    createdTimestamp
    depositEvents {
      id
      status
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
      payload
      nonce
    }
  }
}
    ` as unknown as DocumentNode<L2WithdrawalsQuery, L2WithdrawalsQueryVariables>;
export const WithdrawalsDocument = gql`
    query Withdrawals($where: Withdrawal_filter) {
  withdrawals(where: $where, orderBy: createdTimestamp, orderDirection: desc) {
    id
    l2Sender
    l1Recipient
    createdTimestamp
    withdrawalEvents {
      id
      status
      l1Recipient
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
    }
  }
}
    ` as unknown as DocumentNode<WithdrawalsQuery, WithdrawalsQueryVariables>;







export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Beasts(variables?: BeastsQueryVariables, options?: C): Promise<BeastsQuery> {
      return requester<BeastsQuery, BeastsQueryVariables>(BeastsDocument, variables, options) as Promise<BeastsQuery>;
    },
    Deposits(variables?: DepositsQueryVariables, options?: C): Promise<DepositsQuery> {
      return requester<DepositsQuery, DepositsQueryVariables>(DepositsDocument, variables, options) as Promise<DepositsQuery>;
    },
    WalletsRealms(variables?: WalletsRealmsQueryVariables, options?: C): Promise<WalletsRealmsQuery> {
      return requester<WalletsRealmsQuery, WalletsRealmsQueryVariables>(WalletsRealmsDocument, variables, options) as Promise<WalletsRealmsQuery>;
    },
    UsersRealms(variables: UsersRealmsQueryVariables, options?: C): Promise<UsersRealmsQuery> {
      return requester<UsersRealmsQuery, UsersRealmsQueryVariables>(UsersRealmsDocument, variables, options) as Promise<UsersRealmsQuery>;
    },
    L2Withdrawals(variables?: L2WithdrawalsQueryVariables, options?: C): Promise<L2WithdrawalsQuery> {
      return requester<L2WithdrawalsQuery, L2WithdrawalsQueryVariables>(L2WithdrawalsDocument, variables, options) as Promise<L2WithdrawalsQuery>;
    },
    Withdrawals(variables?: WithdrawalsQueryVariables, options?: C): Promise<WithdrawalsQuery> {
      return requester<WithdrawalsQuery, WithdrawalsQueryVariables>(WithdrawalsDocument, variables, options) as Promise<WithdrawalsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;