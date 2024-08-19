// UI
export type NotificationType = "error" | "warning" | "success";

export type ProposalState =
  | "pending"
  | "active"
  | "passed"
  | "rejected"
  | "executed";

export type NetworkID =
  | "s"
  | "s-tn"
  | "eth"
  | "matic"
  | "arb1"
  | "oeth"
  | "gor"
  | "sep"
  | "linea-testnet"
  | "sn"
  | "sn-tn"
  | "sn-sep";

export type Choice =
  | "for"
  | "against"
  | "abstain"
  | number
  | number[]
  | Record<string, number>;

export type Privacy = "shutter" | null;

export type VoteType =
  | "basic"
  | "single-choice"
  | "approval"
  | "ranked-choice"
  | "quadratic"
  | "weighted"
  | "custom";

export interface SelectedStrategy {
  address: string;
  type: string;
}

export interface SpaceMetadataTreasury {
  name: string | null;
  network: NetworkID | null;
  address: string | null;
}

export interface SpaceMetadataDelegation {
  name: string | null;
  apiType: string | null;
  apiUrl: string | null;
  contractNetwork: NetworkID | null;
  contractAddress: string | null;
}
export interface JSONStringSpaceMetadataDelegation {
  name: string
  api_type: string
  api_url: string
  contract: string
}


export interface SpaceMetadata {
  name: string;
  avatar: string;
  cover: string;
  description: string;
  externalUrl: string;
  twitter: string;
  github: string;
  discord: string;
  votingPowerSymbol: string;
  treasuries: SpaceMetadataTreasury[];
  delegations: SpaceMetadataDelegation[];
}

export interface SpaceSettings {
  votingDelay: number;
  minVotingDuration: number;
  maxVotingDuration: number;
}

export interface StrategyParsedMetadata {
  name: string;
  description: string;
  decimals: number;
  symbol: string;
  token: string | null;
  payload: string | null;
}

export interface Space {
  id: string;
  network: NetworkID;
  verified: boolean;
  turbo: boolean;
  snapshot_chain_id?: number;
  name: string;
  avatar: string;
  cover: string;
  about?: string;
  external_url: string;
  treasuries: SpaceMetadataTreasury[];
  delegations: SpaceMetadataDelegation[];
  twitter: string;
  github: string;
  discord: string;
  coingecko?: string;
  voting_power_symbol: string;
  controller: string;
  voting_delay: number;
  min_voting_period: number;
  max_voting_period: number;
  proposal_threshold: string;
  validation_strategy: string;
  validation_strategy_params: string;
  voting_power_validation_strategy_strategies: string[];
  voting_power_validation_strategy_strategies_params: string[];
  voting_power_validation_strategies_parsed_metadata: StrategyParsedMetadata[];
  strategies_indicies: number[];
  strategies: string[];
  // TODO: replace with real type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strategies_params: any[];
  strategies_parsed_metadata: StrategyParsedMetadata[];
  authenticators: string[];
  executors: string[];
  executors_types: string[];
  executors_strategies: {
    id: string;
    destination_address: string | null;
    type: string;
    treasury: string | null;
    treasury_chain: number | null;
  }[];
  proposal_count: number;
  vote_count: number;
  follower_count?: number;
  created: number;
}

export interface Proposal {
  id: string;
  proposal_id: number | string;
  network: NetworkID;
  type: VoteType;
  quorum: number;
  quorum_type?: "default" | "rejection";
  space: {
    id: string;
    name: string;
    snapshot_chain_id?: number;
    avatar: string;
    controller: string;
    admins?: string[];
    moderators?: string[];
    voting_power_symbol: string;
    authenticators: string[];
    executors: string[];
    executors_types: string[];
    strategies_parsed_metadata: StrategyParsedMetadata[];
  };
  author: {
    id: string;
    name?: string;
  };
  execution_hash: string;
  metadata_uri: string;
  title: string;
  body: string;
  discussion: string;
  execution: Transaction[];
  start: number;
  min_end: number;
  max_end: number;
  snapshot: number;
  choices: string[];
  scores: number[];
  scores_total: number;
  execution_time: number;
  execution_strategy: string;
  execution_strategy_type: string;
  execution_destination: string | null;
  timelock_veto_guardian: string | null;
  strategies_indicies: number[];
  strategies: string[];
  // TODO: replace with real type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strategies_params: any[];
  created: number;
  edited: number | null;
  tx: string;
  execution_tx: string | null;
  veto_tx: string | null;
  vote_count: number;
  has_execution_window_opened: boolean;
  execution_ready: boolean;
  vetoed: boolean;
  completed: boolean;
  cancelled: boolean;
  state: ProposalState;
  privacy: Privacy;
}

export interface User {
  id: string;
  proposal_count: number;
  vote_count: number;
  created: number;
  follows?: string[];
}

export interface Follow {
  id: string;
  follower: string;
  space: Space;
  created: number;
}

export interface Contact {
  address: string;
  name: string;
}

export interface Voter {
  id: string;
  name?: string;
}
export interface Vote {
  id: string;
  voter: Voter;
  space: {
    id: string;
  };
  proposal: number | string;
  choice: number | number[] | Record<string, number>;
  vp: number;
  created: number;
  tx: string;
}

export interface Draft {
  proposalId: number | string | null;
  title: string;
  body: string;
  discussion: string;
  type: VoteType;
  choices: string[];
  executionStrategy: SelectedStrategy | null;
  execution: Transaction[];
  updatedAt: number;
}

export interface Metadata {
  title: string;
  body: string;
  discussion: string;
  execution: Transaction[];
}

export type Drafts = Record<string, Draft>;

export interface BaseTransaction {
  to: string;
  data: string;
  value: string;
  salt: string;
}

export type SendTokenTransaction = BaseTransaction & {
  _type: "sendToken";
  _form: {
    recipient: string;
    amount: string;
    token: {
      name: string;
      decimals: number;
      symbol: string;
      address: string;
    };
  };
};

export type SendNftTransaction = BaseTransaction & {
  _type: "sendNft";
  _form: {
    recipient: string;
    amount: string;
    nft: {
      address: string;
      id: string;
      name: string;
      collection?: string;
    };
  };
};

export type ContractCallTransaction = BaseTransaction & {
  _type: "contractCall";
  _form: {
    // TODO: replace with real type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abi: any[];
    recipient: string;
    method: string;
    // TODO: replace with real type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any;
    amount?: string;
  };
};

export type Transaction =
  | SendTokenTransaction
  | SendNftTransaction
  | ContractCallTransaction;

// Utils
export type RequiredProperty<T> = {
  [P in keyof T]: Required<NonNullable<T[P]>>;
};

export interface MetaTransaction {
  to: string;
  value: string | number;
  data: string;
  operation: number;
  salt: bigint;
}

export interface Leaderboard {
  id: string
  user: {
    id: string
    created: string
  }
  proposal_count: number
  vote_count: number
}
