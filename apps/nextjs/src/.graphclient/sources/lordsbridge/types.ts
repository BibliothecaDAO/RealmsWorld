// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace LordsbridgeTypes {
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

  export type QuerySdk = {
      /** null **/
  depositEvent: InContextSdkMethod<Query['depositEvent'], QuerydepositEventArgs, MeshContext>,
  /** null **/
  depositEvents: InContextSdkMethod<Query['depositEvents'], QuerydepositEventsArgs, MeshContext>,
  /** null **/
  deposit: InContextSdkMethod<Query['deposit'], QuerydepositArgs, MeshContext>,
  /** null **/
  deposits: InContextSdkMethod<Query['deposits'], QuerydepositsArgs, MeshContext>,
  /** null **/
  withdrawalEvent: InContextSdkMethod<Query['withdrawalEvent'], QuerywithdrawalEventArgs, MeshContext>,
  /** null **/
  withdrawalEvents: InContextSdkMethod<Query['withdrawalEvents'], QuerywithdrawalEventsArgs, MeshContext>,
  /** null **/
  withdrawal: InContextSdkMethod<Query['withdrawal'], QuerywithdrawalArgs, MeshContext>,
  /** null **/
  withdrawals: InContextSdkMethod<Query['withdrawals'], QuerywithdrawalsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  depositEvent: InContextSdkMethod<Subscription['depositEvent'], SubscriptiondepositEventArgs, MeshContext>,
  /** null **/
  depositEvents: InContextSdkMethod<Subscription['depositEvents'], SubscriptiondepositEventsArgs, MeshContext>,
  /** null **/
  deposit: InContextSdkMethod<Subscription['deposit'], SubscriptiondepositArgs, MeshContext>,
  /** null **/
  deposits: InContextSdkMethod<Subscription['deposits'], SubscriptiondepositsArgs, MeshContext>,
  /** null **/
  withdrawalEvent: InContextSdkMethod<Subscription['withdrawalEvent'], SubscriptionwithdrawalEventArgs, MeshContext>,
  /** null **/
  withdrawalEvents: InContextSdkMethod<Subscription['withdrawalEvents'], SubscriptionwithdrawalEventsArgs, MeshContext>,
  /** null **/
  withdrawal: InContextSdkMethod<Subscription['withdrawal'], SubscriptionwithdrawalArgs, MeshContext>,
  /** null **/
  withdrawals: InContextSdkMethod<Subscription['withdrawals'], SubscriptionwithdrawalsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Subscription['token'], SubscriptiontokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Subscription['tokens'], SubscriptiontokensArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["lordsbridge"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      ["subgraphName"]: Scalars['ID']
    };
}
