/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Decimal: any;
  DateTime: any;
  BigDecimal: any;
  BigInt: bigint;
  Bytes: string;
  Int8: any;
}
export interface Wallet {
  id: Scalars["ID"];
  address: Scalars["Bytes"];
  realms?: Maybe<Realm[]>;
  realmsHeld: Scalars["BigInt"];
  bridgedRealmsHeld: Scalars["BigInt"];
  bridgedV2RealmsHeld: Scalars["BigInt"];
  totalRealms: Scalars["BigInt"];
  joined: Scalars["BigInt"];
}
export interface Resource {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  totalRealms?: Maybe<Scalars["Int"]>;
  realms: RealmResource[];
}
export interface RealmResource {
  id: Scalars["ID"];
  realm: Realm;
  resource: Resource;
}
export interface Realm {
  id: Scalars["ID"];
  tokenId: Scalars["Int"];
  currentOwner: Wallet;
  minted: Scalars["BigInt"];
  name?: Maybe<Scalars["String"]>;
  cities: Scalars["Int"];
  harbours: Scalars["Int"];
  rivers: Scalars["Int"];
  regions: Scalars["Int"];
  resourceIds: Scalars["Int"][];
  resources?: Maybe<RealmResource[]>;
  wonder?: Maybe<Scalars["String"]>;
  rarityScore: Scalars["BigDecimal"];
  rarityRank: Scalars["BigInt"];
  order?: Maybe<Scalars["String"]>;
  bridgedOwner?: Maybe<Wallet>;
  bridgedV2Owner?: Maybe<Wallet>;
}

export interface ClaimEvent {
  rewardsAddressL1: Scalars["Bytes"];
  rewardsAddressL2: Scalars["Bytes"];
  status: TransferStatus;
  payload: [Scalars["BigInt"]];
  nonce: Scalars["BigInt"];
  createdAtBlock: Scalars["Bytes"];
  createdTxHash: Scalars["Bytes"];
  finishedAtBlock: Scalars["BigInt"];
  finishedAtDate: Maybe<Scalars["BigInt"]>;
  finishedTxHash: Maybe<Scalars["Bytes"]>;
}

export interface Claim {
  claimId: Scalars["BigInt"];
  claimEvents: ClaimEvent[];
  l1Sender: Scalars["Bytes"];
  l2Recipient: Scalars["Bytes"];
  createdTimestamp: Scalars["BigInt"];
}

export interface UsersRealmsQuery {
  realms: Pick<Realm, "id" | "name">[];
  bridgedRealms: Pick<Realm, "id" | "name">[];
  bridgedV2Realms: Pick<Realm, "id" | "name">[];
  wallet?: Maybe<
    Pick<Wallet, "realmsHeld" | "bridgedRealmsHeld" | "bridgedV2RealmsHeld">
  >;
}

export type TransferStatus =
  | "PENDING"
  | "FINISHED"
  | "ACCEPTED_ON_L1"
  | "ACCEPTED_ON_L2";

export interface DepositEvent {
  /** uniq ID */
  id: Scalars["ID"];
  bridgeAddressL1: Scalars["Bytes"];
  bridgeAddressL2: Scalars["Bytes"];
  amount: Scalars["BigInt"];
  status: TransferStatus;
  payload?: Maybe<Scalars["BigInt"][]>;
  nonce?: Maybe<Scalars["BigInt"]>;
  createdAtBlock: Scalars["BigInt"];
  createdTxHash: Scalars["Bytes"];
  finishedAtBlock?: Maybe<Scalars["BigInt"]>;
  finishedAtDate?: Maybe<Scalars["BigInt"]>;
  finishedTxHash?: Maybe<Scalars["Bytes"]>;
}

export interface WithdrawalEvent {
  /** uniq ID */
  id: Scalars["ID"];
  bridgeAddressL1: Scalars["Bytes"];
  bridgeAddressL2: Scalars["Bytes"];
  l1Recipient: Scalars["Bytes"];
  amount: Scalars["BigInt"];
  status: TransferStatus;
  createdAtBlock: Scalars["BigInt"];
  createdTxHash: Scalars["Bytes"];
  finishedAtBlock?: Maybe<Scalars["BigInt"]>;
  finishedAtDate?: Maybe<Scalars["BigInt"]>;
  finishedTxHash?: Maybe<Scalars["Bytes"]>;
}
export interface RealmsWithdrawalEvent {
  /** uniq ID */
  id: Scalars["ID"];
  bridgeAddressL1: Scalars["Bytes"];
  bridgeAddressL2: Scalars["Bytes"];
  l1Recipient: Scalars["Bytes"];
  tokenIds: Scalars["BigInt"][];
  status: TransferStatus;
  createdAtBlock: Scalars["BigInt"];
  createdTxHash: Scalars["Bytes"];
  finishedAtBlock?: Maybe<Scalars["BigInt"]>;
  finishedAtDate?: Maybe<Scalars["BigInt"]>;
  finishedTxHash?: Maybe<Scalars["Bytes"]>;
}
export interface RealmsWithdrawal {
  /** [bridgeL1Address, ...payload].join('-') */
  id: Scalars["ID"];
  l1Recipient: Scalars["Bytes"];
  l2Sender: Scalars["Bytes"];
  createdTimestamp?: Maybe<Scalars["BigInt"]>;
  withdrawalEvents: RealmsWithdrawalEvent[];
  req_hash: Scalars["BigInt"];
}
export interface Deposit {
  /** [bridgeL1Address, ...payload].join('-') */
  id: Scalars["ID"];
  depositEvents: DepositEvent[];
  l1Sender: Scalars["Bytes"];
  l2Recipient: Scalars["Bytes"];
  createdTimestamp?: Maybe<Scalars["BigInt"]>;
}
export interface Withdrawal {
  /** [bridgeL1Address, ...payload].join('-') */
  id: Scalars["ID"];
  l1Recipient: Scalars["Bytes"];
  l2Sender: Scalars["Bytes"];
  createdTimestamp?: Maybe<Scalars["BigInt"]>;
  withdrawalEvents: WithdrawalEvent[];
  hash: Scalars["BigInt"];
}

export interface DepositsQuery {
  deposits: (Pick<
    Deposit,
    "id" | "l1Sender" | "l2Recipient" | "createdTimestamp"
  > & {
    depositEvents: Pick<
      DepositEvent,
      | "id"
      | "status"
      | "amount"
      | "createdTxHash"
      | "finishedTxHash"
      | "finishedAtDate"
      | "payload"
      | "nonce"
    >[];
  })[];
  withdrawals: (Pick<
    Withdrawal,
    "id" | "l2Sender" | "l1Recipient" | "createdTimestamp"
  > & {
    withdrawalEvents: Pick<
      WithdrawalEvent,
      | "id"
      | "status"
      | "l1Recipient"
      | "amount"
      | "createdTxHash"
      | "finishedTxHash"
      | "finishedAtDate"
    >[];
  })[];
}

export interface Deposit_filter {
  id?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Scalars["ID"][]>;
  id_not_in?: InputMaybe<Scalars["ID"][]>;
  depositEvents?: InputMaybe<Scalars["String"][]>;
  depositEvents_not?: InputMaybe<Scalars["String"][]>;
  depositEvents_contains?: InputMaybe<Scalars["String"][]>;
  depositEvents_contains_nocase?: InputMaybe<Scalars["String"][]>;
  depositEvents_not_contains?: InputMaybe<Scalars["String"][]>;
  depositEvents_not_contains_nocase?: InputMaybe<Scalars["String"][]>;
  depositEvents_?: InputMaybe<DepositEvent_filter>;
  l1Sender?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_not?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_gt?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_lt?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_gte?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_lte?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_in?: InputMaybe<Scalars["Bytes"][]>;
  l1Sender_not_in?: InputMaybe<Scalars["Bytes"][]>;
  l1Sender_contains?: InputMaybe<Scalars["Bytes"]>;
  l1Sender_not_contains?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_not?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_gt?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_lt?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_gte?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_lte?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_in?: InputMaybe<Scalars["Bytes"][]>;
  l2Recipient_not_in?: InputMaybe<Scalars["Bytes"][]>;
  l2Recipient_contains?: InputMaybe<Scalars["Bytes"]>;
  l2Recipient_not_contains?: InputMaybe<Scalars["Bytes"]>;
  createdTimestamp?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_in?: InputMaybe<Scalars["BigInt"][]>;
  createdTimestamp_not_in?: InputMaybe<Scalars["BigInt"][]>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<InputMaybe<Deposit_filter>[]>;
  or?: InputMaybe<InputMaybe<Deposit_filter>[]>;
}

export interface BlockChangedFilter {
  number_gte: Scalars["Int"];
}

export interface DepositEvent_filter {
  id?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Scalars["ID"][]>;
  id_not_in?: InputMaybe<Scalars["ID"][]>;
  bridgeAddressL1?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_not?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_gt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_lt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_gte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_lte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL1_not_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL1_contains?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_not_contains?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_not?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_gt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_lt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_gte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_lte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL2_not_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL2_contains?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_not_contains?: InputMaybe<Scalars["Bytes"]>;
  amount?: InputMaybe<Scalars["BigInt"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]>;
  amount_lt?: InputMaybe<Scalars["BigInt"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]>;
  amount_in?: InputMaybe<Scalars["BigInt"][]>;
  amount_not_in?: InputMaybe<Scalars["BigInt"][]>;
  status?: InputMaybe<TransferStatus>;
  status_not?: InputMaybe<TransferStatus>;
  status_in?: InputMaybe<TransferStatus[]>;
  status_not_in?: InputMaybe<TransferStatus[]>;
  payload?: InputMaybe<Scalars["BigInt"][]>;
  payload_not?: InputMaybe<Scalars["BigInt"][]>;
  payload_contains?: InputMaybe<Scalars["BigInt"][]>;
  payload_contains_nocase?: InputMaybe<Scalars["BigInt"][]>;
  payload_not_contains?: InputMaybe<Scalars["BigInt"][]>;
  payload_not_contains_nocase?: InputMaybe<Scalars["BigInt"][]>;
  nonce?: InputMaybe<Scalars["BigInt"]>;
  nonce_not?: InputMaybe<Scalars["BigInt"]>;
  nonce_gt?: InputMaybe<Scalars["BigInt"]>;
  nonce_lt?: InputMaybe<Scalars["BigInt"]>;
  nonce_gte?: InputMaybe<Scalars["BigInt"]>;
  nonce_lte?: InputMaybe<Scalars["BigInt"]>;
  nonce_in?: InputMaybe<Scalars["BigInt"][]>;
  nonce_not_in?: InputMaybe<Scalars["BigInt"][]>;
  createdAtBlock?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_not?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_gt?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_lt?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_gte?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_lte?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_in?: InputMaybe<Scalars["BigInt"][]>;
  createdAtBlock_not_in?: InputMaybe<Scalars["BigInt"][]>;
  createdTxHash?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_not?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_gt?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_lt?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_gte?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_lte?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_in?: InputMaybe<Scalars["Bytes"][]>;
  createdTxHash_not_in?: InputMaybe<Scalars["Bytes"][]>;
  createdTxHash_contains?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_not_contains?: InputMaybe<Scalars["Bytes"]>;
  finishedAtBlock?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_not?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_gt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_lt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_gte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_lte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedAtBlock_not_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedAtDate?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_not?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_gt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_lt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_gte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_lte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedAtDate_not_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedTxHash?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_not?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_gt?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_lt?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_gte?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_lte?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_in?: InputMaybe<Scalars["Bytes"][]>;
  finishedTxHash_not_in?: InputMaybe<Scalars["Bytes"][]>;
  finishedTxHash_contains?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_not_contains?: InputMaybe<Scalars["Bytes"]>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<InputMaybe<DepositEvent_filter>[]>;
  or?: InputMaybe<InputMaybe<DepositEvent_filter>[]>;
}

export interface Withdrawal_filter {
  id?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Scalars["ID"][]>;
  id_not_in?: InputMaybe<Scalars["ID"][]>;
  l1Recipient?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_not?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_gt?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_lt?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_gte?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_lte?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_in?: InputMaybe<Scalars["Bytes"][]>;
  l1Recipient_not_in?: InputMaybe<Scalars["Bytes"][]>;
  l1Recipient_contains?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_not_contains?: InputMaybe<Scalars["Bytes"]>;
  l2Sender?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_not?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_gt?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_lt?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_gte?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_lte?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_in?: InputMaybe<Scalars["Bytes"][]>;
  l2Sender_not_in?: InputMaybe<Scalars["Bytes"][]>;
  l2Sender_contains?: InputMaybe<Scalars["Bytes"]>;
  l2Sender_not_contains?: InputMaybe<Scalars["Bytes"]>;
  createdTimestamp?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_not?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_gt?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_lt?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_gte?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_lte?: InputMaybe<Scalars["BigInt"]>;
  createdTimestamp_in?: InputMaybe<Scalars["BigInt"][]>;
  createdTimestamp_not_in?: InputMaybe<Scalars["BigInt"][]>;
  withdrawalEvents?: InputMaybe<Scalars["String"][]>;
  withdrawalEvents_not?: InputMaybe<Scalars["String"][]>;
  withdrawalEvents_contains?: InputMaybe<Scalars["String"][]>;
  withdrawalEvents_contains_nocase?: InputMaybe<Scalars["String"][]>;
  withdrawalEvents_not_contains?: InputMaybe<Scalars["String"][]>;
  withdrawalEvents_not_contains_nocase?: InputMaybe<Scalars["String"][]>;
  withdrawalEvents_?: InputMaybe<WithdrawalEvent_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<InputMaybe<Withdrawal_filter>[]>;
  or?: InputMaybe<InputMaybe<Withdrawal_filter>[]>;
}

export interface WithdrawalEvent_filter {
  id?: InputMaybe<Scalars["ID"]>;
  id_not?: InputMaybe<Scalars["ID"]>;
  id_gt?: InputMaybe<Scalars["ID"]>;
  id_lt?: InputMaybe<Scalars["ID"]>;
  id_gte?: InputMaybe<Scalars["ID"]>;
  id_lte?: InputMaybe<Scalars["ID"]>;
  id_in?: InputMaybe<Scalars["ID"][]>;
  id_not_in?: InputMaybe<Scalars["ID"][]>;
  bridgeAddressL1?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_not?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_gt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_lt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_gte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_lte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL1_not_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL1_contains?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL1_not_contains?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_not?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_gt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_lt?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_gte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_lte?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL2_not_in?: InputMaybe<Scalars["Bytes"][]>;
  bridgeAddressL2_contains?: InputMaybe<Scalars["Bytes"]>;
  bridgeAddressL2_not_contains?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_not?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_gt?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_lt?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_gte?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_lte?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_in?: InputMaybe<Scalars["Bytes"][]>;
  l1Recipient_not_in?: InputMaybe<Scalars["Bytes"][]>;
  l1Recipient_contains?: InputMaybe<Scalars["Bytes"]>;
  l1Recipient_not_contains?: InputMaybe<Scalars["Bytes"]>;
  amount?: InputMaybe<Scalars["BigInt"]>;
  amount_not?: InputMaybe<Scalars["BigInt"]>;
  amount_gt?: InputMaybe<Scalars["BigInt"]>;
  amount_lt?: InputMaybe<Scalars["BigInt"]>;
  amount_gte?: InputMaybe<Scalars["BigInt"]>;
  amount_lte?: InputMaybe<Scalars["BigInt"]>;
  amount_in?: InputMaybe<Scalars["BigInt"][]>;
  amount_not_in?: InputMaybe<Scalars["BigInt"][]>;
  status?: InputMaybe<TransferStatus>;
  status_not?: InputMaybe<TransferStatus>;
  status_in?: InputMaybe<TransferStatus[]>;
  status_not_in?: InputMaybe<TransferStatus[]>;
  createdAtBlock?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_not?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_gt?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_lt?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_gte?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_lte?: InputMaybe<Scalars["BigInt"]>;
  createdAtBlock_in?: InputMaybe<Scalars["BigInt"][]>;
  createdAtBlock_not_in?: InputMaybe<Scalars["BigInt"][]>;
  createdTxHash?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_not?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_gt?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_lt?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_gte?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_lte?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_in?: InputMaybe<Scalars["Bytes"][]>;
  createdTxHash_not_in?: InputMaybe<Scalars["Bytes"][]>;
  createdTxHash_contains?: InputMaybe<Scalars["Bytes"]>;
  createdTxHash_not_contains?: InputMaybe<Scalars["Bytes"]>;
  finishedAtBlock?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_not?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_gt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_lt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_gte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_lte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtBlock_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedAtBlock_not_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedAtDate?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_not?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_gt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_lt?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_gte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_lte?: InputMaybe<Scalars["BigInt"]>;
  finishedAtDate_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedAtDate_not_in?: InputMaybe<Scalars["BigInt"][]>;
  finishedTxHash?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_not?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_gt?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_lt?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_gte?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_lte?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_in?: InputMaybe<Scalars["Bytes"][]>;
  finishedTxHash_not_in?: InputMaybe<Scalars["Bytes"][]>;
  finishedTxHash_contains?: InputMaybe<Scalars["Bytes"]>;
  finishedTxHash_not_contains?: InputMaybe<Scalars["Bytes"]>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<InputMaybe<WithdrawalEvent_filter>[]>;
  or?: InputMaybe<InputMaybe<WithdrawalEvent_filter>[]>;
}
