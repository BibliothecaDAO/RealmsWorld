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
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { LordsbridgegoerliTypes } from './sources/lordsbridgegoerli/types';
import * as importedModule$0 from "./sources/lordsbridgegoerli/introspectionSchema";
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

export type Deposit = {
  /** [bridgeL1Address, ...payload].join('-') */
  id: Scalars['ID'];
  depositEvents: Array<DepositEvent>;
  l1Sender: Scalars['Bytes'];
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
  l2Recipient: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  status: TransferStatus;
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
  and?: InputMaybe<Array<InputMaybe<DepositEvent_filter>>>;
  or?: InputMaybe<Array<InputMaybe<DepositEvent_filter>>>;
};

export type DepositEvent_orderBy =
  | 'id'
  | 'bridgeAddressL1'
  | 'bridgeAddressL2'
  | 'l2Recipient'
  | 'amount'
  | 'status'
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
  | 'createdTimestamp';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
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


export type QuerydepositArgs = {
  id: Scalars['ID'];
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
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Deposit: ResolverTypeWrapper<Deposit>;
  DepositEvent: ResolverTypeWrapper<DepositEvent>;
  DepositEvent_filter: DepositEvent_filter;
  DepositEvent_orderBy: DepositEvent_orderBy;
  Deposit_filter: Deposit_filter;
  Deposit_orderBy: Deposit_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
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
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Deposit: Deposit;
  DepositEvent: DepositEvent;
  DepositEvent_filter: DepositEvent_filter;
  Deposit_filter: Deposit_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  Token_filter: Token_filter;
  Withdrawal: Withdrawal;
  WithdrawalEvent: WithdrawalEvent;
  WithdrawalEvent_filter: WithdrawalEvent_filter;
  Withdrawal_filter: Withdrawal_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
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
  createdTimestamp?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DepositEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DepositEvent'] = ResolversParentTypes['DepositEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bridgeAddressL1?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bridgeAddressL2?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  l2Recipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TransferStatus'], ParentType, ContextType>;
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

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  depositEvent?: Resolver<Maybe<ResolversTypes['DepositEvent']>, ParentType, ContextType, RequireFields<QuerydepositEventArgs, 'id' | 'subgraphError'>>;
  depositEvents?: Resolver<Array<ResolversTypes['DepositEvent']>, ParentType, ContextType, RequireFields<QuerydepositEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  deposit?: Resolver<Maybe<ResolversTypes['Deposit']>, ParentType, ContextType, RequireFields<QuerydepositArgs, 'id' | 'subgraphError'>>;
  deposits?: Resolver<Array<ResolversTypes['Deposit']>, ParentType, ContextType, RequireFields<QuerydepositsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawalEvent?: Resolver<Maybe<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawalEventArgs, 'id' | 'subgraphError'>>;
  withdrawalEvents?: Resolver<Array<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawalEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawal?: Resolver<Maybe<ResolversTypes['Withdrawal']>, ParentType, ContextType, RequireFields<QuerywithdrawalArgs, 'id' | 'subgraphError'>>;
  withdrawals?: Resolver<Array<ResolversTypes['Withdrawal']>, ParentType, ContextType, RequireFields<QuerywithdrawalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
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
}>;

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

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Deposit?: DepositResolvers<ContextType>;
  DepositEvent?: DepositEventResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Withdrawal?: WithdrawalResolvers<ContextType>;
  WithdrawalEvent?: WithdrawalEventResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = LordsbridgegoerliTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/lordsbridgegoerli/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
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
const lordsbridgegoerliTransforms = [];
const additionalTypeDefs = [] as any[];
const lordsbridgegoerliHandler = new GraphqlHandler({
              name: "lordsbridgegoerli",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/redbeardeth/starknet-bridge-goerli"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("lordsbridgegoerli"),
              logger: logger.child("lordsbridgegoerli"),
              importFn,
            });
sources[0] = {
          name: 'lordsbridgegoerli',
          handler: lordsbridgegoerliHandler,
          transforms: lordsbridgegoerliTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
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
        document: DepositsDocument,
        get rawSDL() {
          return printWithCache(DepositsDocument);
        },
        location: 'DepositsDocument.graphql'
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
export type DepositsQueryVariables = Exact<{
  depositsWhere?: InputMaybe<Deposit_filter>;
  withdrawalsWhere?: InputMaybe<Withdrawal_filter>;
}>;


export type DepositsQuery = { deposits: Array<(
    Pick<Deposit, 'id' | 'l1Sender' | 'createdTimestamp'>
    & { depositEvents: Array<Pick<DepositEvent, 'id' | 'status' | 'l2Recipient' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate'>> }
  )>, withdrawals: Array<(
    Pick<Withdrawal, 'id' | 'l2Sender' | 'l1Recipient' | 'createdTimestamp'>
    & { withdrawalEvents: Array<Pick<WithdrawalEvent, 'id' | 'status' | 'l1Recipient' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate'>> }
  )> };

export type WithdrawalsQueryVariables = Exact<{
  where?: InputMaybe<Withdrawal_filter>;
}>;


export type WithdrawalsQuery = { withdrawals: Array<(
    Pick<Withdrawal, 'id' | 'l2Sender' | 'l1Recipient' | 'createdTimestamp'>
    & { withdrawalEvents: Array<Pick<WithdrawalEvent, 'id' | 'status' | 'l1Recipient' | 'amount' | 'createdTxHash' | 'finishedTxHash' | 'finishedAtDate'>> }
  )> };


export const DepositsDocument = gql`
    query Deposits($depositsWhere: Deposit_filter, $withdrawalsWhere: Withdrawal_filter) {
  deposits(where: $depositsWhere, orderBy: createdTimestamp, orderDirection: desc) {
    id
    l1Sender
    createdTimestamp
    depositEvents {
      id
      status
      l2Recipient
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
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
    Deposits(variables?: DepositsQueryVariables, options?: C): Promise<DepositsQuery> {
      return requester<DepositsQuery, DepositsQueryVariables>(DepositsDocument, variables, options) as Promise<DepositsQuery>;
    },
    Withdrawals(variables?: WithdrawalsQueryVariables, options?: C): Promise<WithdrawalsQuery> {
      return requester<WithdrawalsQuery, WithdrawalsQueryVariables>(WithdrawalsDocument, variables, options) as Promise<WithdrawalsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;