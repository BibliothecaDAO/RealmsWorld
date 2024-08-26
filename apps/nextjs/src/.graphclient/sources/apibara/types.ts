// @ts-nocheck

import type { MeshContext } from "@graphql-mesh/runtime";
import type { InContextSdkMethod } from "@graphql-mesh/types";

export namespace ApibaraTypes {
  export type Maybe<T> = T | null;
  export type InputMaybe<T> = Maybe<T>;
  export type Exact<T extends Record<string, unknown>> = {
    [K in keyof T]: T[K];
  };
  export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
  };
  export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
  };
  /** All built-in and custom scalars, mapped to their actual values */
  export interface Scalars {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Decimal: any;
    DateTime: any;
  }

  export interface Query {
    l2deposits: L2Deposit[];
    deposit?: Maybe<L2Deposit>;
    l2withdrawals: L2Withdrawal[];
    beasts: Beast[];
  }

  export interface Queryl2depositsArgs {
    first?: InputMaybe<Scalars["Int"]>;
    skip?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Scalars["String"]>;
    orderByDirection?: InputMaybe<Scalars["String"]>;
    where?: InputMaybe<WhereFilterForTransaction>;
  }

  export interface QuerydepositArgs {
    hash: Scalars["String"];
  }

  export interface Queryl2withdrawalsArgs {
    first?: InputMaybe<Scalars["Int"]>;
    skip?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Scalars["String"]>;
    orderByDirection?: InputMaybe<Scalars["String"]>;
    where?: InputMaybe<WhereFilterForWithdrawals>;
  }

  export interface QuerybeastsArgs {
    first?: InputMaybe<Scalars["Int"]>;
    skip?: InputMaybe<Scalars["Int"]>;
    orderBy?: InputMaybe<Scalars["String"]>;
    orderByDirection?: InputMaybe<Scalars["String"]>;
    where?: InputMaybe<WhereFilterForBeasts>;
  }

  export interface L2Deposit {
    id: Scalars["String"];
    l2Recipient: Scalars["String"];
    amount: Scalars["Decimal"];
    timestamp: Scalars["DateTime"];
    hash: Scalars["String"];
  }

  export interface WhereFilterForTransaction {
    id?: InputMaybe<Scalars["String"]>;
    l2Recipient?: InputMaybe<Scalars["String"]>;
  }

  export interface L2Withdrawal {
    id: Scalars["String"];
    l1Recipient: Scalars["String"];
    l2Sender: Scalars["String"];
    amount: Scalars["Decimal"];
    timestamp: Scalars["DateTime"];
    hash: Scalars["String"];
  }

  export interface WhereFilterForWithdrawals {
    id?: InputMaybe<Scalars["String"]>;
    l2Sender?: InputMaybe<Scalars["String"]>;
  }

  export interface Beast {
    id: Scalars["String"];
    name?: Maybe<Scalars["String"]>;
    image?: Maybe<Scalars["String"]>;
    level?: Maybe<Scalars["String"]>;
    tier?: Maybe<Scalars["String"]>;
    prefix?: Maybe<Scalars["String"]>;
    suffix?: Maybe<Scalars["String"]>;
    owner: Scalars["String"];
  }

  export interface WhereFilterForBeasts {
    id?: InputMaybe<Scalars["String"]>;
    owner?: InputMaybe<Scalars["String"]>;
  }

  export interface QuerySdk {
    /** null **/
    l2deposits: InContextSdkMethod<
      Query["l2deposits"],
      Queryl2depositsArgs,
      MeshContext
    >;
    /** null **/
    deposit: InContextSdkMethod<
      Query["deposit"],
      QuerydepositArgs,
      MeshContext
    >;
    /** null **/
    l2withdrawals: InContextSdkMethod<
      Query["l2withdrawals"],
      Queryl2withdrawalsArgs,
      MeshContext
    >;
    /** null **/
    beasts: InContextSdkMethod<Query["beasts"], QuerybeastsArgs, MeshContext>;
  }

  export interface MutationSdk {}

  export interface SubscriptionSdk {}

  export interface Context {
    ["apibara"]: {
      Query: QuerySdk;
      Mutation: MutationSdk;
      Subscription: SubscriptionSdk;
    };
    ["apibaraHandle"]: Scalars["ID"];
  }
}
