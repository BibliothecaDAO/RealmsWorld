import type {
  Choice,
  Follow,
  MetaTransaction,
  NetworkID,
  Proposal,
  Space,
  SpaceMetadata,
  StrategyParsedMetadata,
  User,
  Vote,
} from "@/types";
import type { Web3Provider } from "@ethersproject/providers";
import type React from "react";

export interface PaginationOpts { limit: number; skip?: number }
export interface SpacesFilter {
  controller?: string;
  id_in?: string[];
}
export type Connector =
  | "argentx"
  | "injected"
  | "walletconnect"
  | "walletlink"
  | "gnosis";
export type GeneratedMetadata =
  | {
      name: string;
      description?: string;
      properties: {
        symbol?: string;
        decimals: number;
        token?: string;
        payload?: string;
      };
    }
  | {
      strategies_metadata: string[];
    };

export interface StrategyTemplate {
  address: string;
  name: string;
  about?: string;
  icon?: React.ReactElement;
  type?: string;
  paramsDefinition: any;
  validate?: (params: Record<string, any>) => boolean;
  generateSummary?: (params: Record<string, any>) => string;
  generateParams?: (params: Record<string, any>) => any[];
  generateMetadata?: (
    params: Record<string, any>,
  ) => Promise<GeneratedMetadata>;
  parseParams?: (
    params: string,
    metadata: StrategyParsedMetadata | null,
  ) => Promise<Record<string, any>>;
  deployConnectors?: Connector[];
  deployNetworkId?: NetworkID;
  deploy?: (
    client: any,
    web3: any,
    controller: string,
    spaceAddress: string,
    params: Record<string, any>,
  ) => Promise<{ address: string; txId: string }>;
}

export type StrategyConfig = StrategyTemplate & {
  id: string;
  params: Record<string, any>;
};

export interface SnapshotInfo {
  at: number | null;
  chainId?: number;
}

export interface VotingPower {
  address: string;
  value: bigint;
  decimals: number;
  token: string | null;
  symbol: string;
  chainId?: number;
  swapLink?: string;
}

export type VotingPowerStatus = "loading" | "success" | "error";

// TODO: make sx.js accept Signer instead of Web3Provider | Wallet

export interface ReadOnlyNetworkActions {
  getVotingPower(
    spaceId: string,
    strategiesAddresses: string[],
    strategiesParams: any[],
    strategiesMetadata: StrategyParsedMetadata[],
    voterAddress: string,
    snapshotInfo: SnapshotInfo,
  ): Promise<VotingPower[]>;
  propose(
    web3: Web3Provider,
    connectorType: Connector,
    account: string,
    space: Space,
    cid: string,
    executionStrategy: string | null,
    executionDestinationAddress: string | null,
    transactions: MetaTransaction[],
  ): Promise<any>;
  updateProposal(
    web3: Web3Provider,
    connectorType: Connector,
    account: string,
    space: Space,
    proposalId: number | string,
    cid: string,
    executionStrategy: string | null,
    executionDestinationAddress: string | null,
    transactions: MetaTransaction[],
  ): Promise<any>;
  cancelProposal(web3: Web3Provider, proposal: Proposal): Promise<any>;
  vote(
    web3: Web3Provider,
    connectorType: Connector,
    account: string,
    proposal: Proposal,
    choice: Choice,
  ): Promise<any>;
  send(envelope: any): Promise<any>;
}

export type NetworkActions = ReadOnlyNetworkActions & {
  predictSpaceAddress(
    web3: Web3Provider,
    params: { salt: string },
  ): Promise<string | null>;
  deployDependency(
    web3: Web3Provider,
    params: {
      controller: string;
      spaceAddress: string;
      strategy: StrategyConfig;
    },
  ): Promise<{ address: string; txId: string }>;
  executeTransactions(web3: Web3Provider, proposal: Proposal): Promise<void>;
  executeQueuedProposal(web3: Web3Provider, proposal: Proposal): Promise<void>;
  vetoProposal(web3: Web3Provider, proposal: Proposal): Promise<void>;
  delegate(
    web3: Web3Provider,
    space: Space,
    networkId: NetworkID,
    delegatee: string,
    delegationContract: string,
  ): Promise<any>;
};

export interface NetworkApi {
  loadProposalVotes(
    proposal: Proposal,
    paginationOpts: PaginationOpts,
    filter?: "any" | "for" | "against" | "abstain",
    sortBy?: "vp-desc" | "vp-asc" | "created-desc" | "created-asc",
  ): Promise<Vote[]>;
  loadUserVotes(
    spaceIds: string[],
    voter: string,
  ): Promise<Record<string, Vote>>;
  loadProposals(
    spaceIds: string[],
    paginationOpts: PaginationOpts,
    current: number,
    filter?: "any" | "active" | "pending" | "closed",
    searchQuery?: string,
  ): Promise<Proposal[]>;
  loadProposal(
    spaceId: string,
    proposalId: number | string,
    current: number,
  ): Promise<Proposal | null>;
  loadSpaces(
    paginationOpts: PaginationOpts,
    filter?: SpacesFilter,
  ): Promise<Space[]>;
  loadSpace(spaceId: string): Promise<Space | null>;
  loadUser(userId: string): Promise<User | null>;
  loadLeaderboard(
    spaceId: string,
    paginationOpts: PaginationOpts,
    sortBy?:
      | "vote_count-desc"
      | "vote_count-asc"
      | "proposal_count-desc"
      | "proposal_count-asc",
  ): Promise<User[]>;
  loadFollows(userId?: string, spaceId?: string): Promise<Follow[]>;
}

export interface NetworkConstants {
  AUTHS: Record<string, string>;
  PROPOSAL_VALIDATIONS: Record<string, string>;
  STRATEGIES: Record<string, string>;
  EXECUTORS: Record<string, string>;
  EDITOR_AUTHENTICATORS: StrategyTemplate[];
  EDITOR_PROPOSAL_VALIDATIONS: StrategyTemplate[];
  EDITOR_VOTING_STRATEGIES: StrategyTemplate[];
  EDITOR_PROPOSAL_VALIDATION_VOTING_STRATEGIES: StrategyTemplate[];
  EDITOR_EXECUTION_STRATEGIES: StrategyTemplate[];
}

export interface NetworkHelpers {
  isAuthenticatorSupported(authenticator: string): boolean;
  isAuthenticatorContractSupported(authenticator: string): boolean;
  getRelayerAuthenticatorType(
    authenticator: string,
  ): "evm" | "evm-tx" | "starknet" | null;
  isStrategySupported(strategy: string): boolean;
  isExecutorSupported(executor: string): boolean;
  isVotingTypeSupported(type: string): boolean;
  pin: (content: any) => Promise<{ cid: string; provider: string }>;
  getTransaction(txId: string): Promise<any>;
  waitForTransaction(txId: string): Promise<any>;
  waitForSpace(spaceAddress: string, interval?: number): Promise<Space>;
  getExplorerUrl(
    id: string,
    type: "transaction" | "address" | "contract" | "strategy" | "token",
    chainId?: number,
  ): string;
}

interface BaseNetwork {
  name: string;
  avatar: string;
  currentUnit: "block" | "second";
  chainId: number | string;
  baseChainId: number;
  currentChainId: number;
  baseNetworkId?: NetworkID;
  supportsSimulation: boolean;
  managerConnectors: Connector[];
  api: NetworkApi;
  constants: NetworkConstants;
  helpers: NetworkHelpers;
}

export type ReadOnlyNetwork = BaseNetwork & {
  readOnly: true;
  actions: ReadOnlyNetworkActions;
};
export type ReadWriteNetwork = BaseNetwork & {
  readOnly?: false;
  actions: NetworkActions;
};
export type Network = ReadOnlyNetwork | ReadWriteNetwork;
