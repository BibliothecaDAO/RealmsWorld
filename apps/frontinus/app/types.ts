/// <reference types="vite/client" />

export type NotificationType = "error" | "warning" | "success";

export type ProposalState =
  | "pending"
  | "active"
  | "passed"
  | "rejected"
  | "executed";

export type NetworkID =
  /*| "eth"
  | "sep"*/
  "sn" | "sn-sep";

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
export type VoteTypeInfo = {
  label: string;
  description: string;
};

export type SelectedStrategy = {
  address: string;
  destinationAddress?: string | null;
  type: string;
};

export type SpaceMetadataTreasury = {
  name: string | null;
  network: NetworkID | null;
  address: string | null;
  chainId?: number;
};

export type SpaceMetadata = {
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
};

export type SpaceSettings = {
  votingDelay: number;
  minVotingDuration: number;
  maxVotingDuration: number;
};

export type StrategyParsedMetadata = {
  id: string;
  name: string;
  description: string;
  decimals: number;
  symbol: string;
  token: string | null;
  payload: string | null;
};

export type RelatedSpace = {
  id: string;
  name: string;
  network: NetworkID;
  avatar: string;
  cover: string;
  about?: string;
  proposal_count: number;
  vote_count: number;
  turbo: boolean;
  verified: boolean;
  snapshot_chain_id: number;
};

export type OffchainAdditionalRawData = {
  type: "offchain";
} & Pick<
  OffchainApiSpace,
  | "terms"
  | "private"
  | "domain"
  | "skin"
  | "guidelines"
  | "template"
  | "strategies"
  | "categories"
  | "admins"
  | "moderators"
  | "members"
  | "plugins"
  | "filters"
  | "voting"
  | "validation"
  | "voteValidation"
  | "boost"
>;

export type Space = {
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
  //delegations: SpaceMetadataDelegation[];
  twitter: string;
  github: string;
  discord: string;
  coingecko?: string;
  voting_power_symbol: string;
  controller: string;
  voting_delay: number;
  voting_types: VoteType[];
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
  strategies_params: any[];
  strategies_parsed_metadata: StrategyParsedMetadata[];
  authenticators: string[];
  executors: string[];
  executors_types: string[];
  executors_destinations: string[];
  executors_strategies: {
    address: string;
    destination_address: string | null;
    type: string;
    treasury: string | null;
    treasury_chain: number | null;
  }[];
  proposal_count: number;
  vote_count: number;
  follower_count?: number;
  created: number;
  children: RelatedSpace[];
  parent: RelatedSpace | null;
  // only use this for settings, if it's actually used for other things
  // move it to main space type
  additionalRawData?: OffchainAdditionalRawData;
};

export type ProposalExecution = {
  strategyType: string;
  safeName: string;
  safeAddress: string;
  networkId: NetworkID;
  transactions: Transaction[];
  chainId?: number;
};

export type Proposal = {
  id: string;
  proposal_id: number | string;
  network: NetworkID;
  execution_network: NetworkID;
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
    address_type: 0 | 1 | 2;
    name?: string;
  };
  execution_hash: string;
  metadata_uri: string;
  title: string;
  body: string;
  discussion: string;
  executions: ProposalExecution[];
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
};

export type UserProfile = {
  name: string;
  about: string;
  avatar: string;
  cover: string;
  github: string;
  twitter: string;
  lens: string;
  farcaster: string;
  votesCount: number;
};

export type User = {
  id: string;
  created: number | null;
  follows?: string[];
} & Partial<UserProfile>;

export type UserActivity = {
  id: string;
  name?: string;
  spaceId: string;
  proposal_count: number;
  vote_count: number;
};

export type Statement = {
  space: string;
  network: NetworkID;
  about: string;
  statement: string;
  delegate: string;
  discourse: string;
  status: "ACTIVE" | "INACTIVE";
  source: string | null;
};

export type Follow = {
  id: string;
  follower: string;
  space: Space;
  created: number;
  network: NetworkID;
};

export type Alias = {
  address: string;
  alias: string;
};

export type Contact = {
  address: string;
  name: string;
};

export type Vote = {
  id: string;
  voter: {
    id: string;
    name?: string;
  };
  space: {
    id: string;
  };
  proposal: number | string;
  choice: number | number[] | Record<string, number>;
  vp: number;
  reason?: string;
  created: number;
  tx: string;
};

export type Member = {
  address: string;
  role: "admin" | "moderator" | "author";
};

export type Draft = {
  proposalId: number | string | null;
  title: string;
  body: string;
  discussion: string;
  type: VoteType;
  choices: string[];
  executions: Record<string, Transaction[] | undefined>;
  updatedAt: number;
};

export type Metadata = {
  title: string;
  body: string;
  discussion: string;
  execution: Transaction[];
};

export type Drafts = Record<string, Draft>;

export type BaseTransaction = {
  to: string;
  data: string;
  value: string;
  salt: string;
};

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
    sender: string;
    amount: string;
    nft: {
      type: string;
      address: string;
      id: string;
      name: string;
      collection?: string;
    };
  };
};

export type StakeTokenTransaction = BaseTransaction & {
  _type: "stakeToken";
  _form: {
    recipient: string;
    args: any;
    amount: string;
  };
};

export type ContractCallTransaction = BaseTransaction & {
  _type: "contractCall";
  _form: {
    abi: any[];
    recipient: string;
    method: string;
    args: any;
    amount?: string;
  };
};

export type RawTransaction = BaseTransaction & {
  _type: "raw";
  _form: {
    recipient: string;
  };
};

export type Transaction =
  | SendTokenTransaction
  | SendNftTransaction
  | StakeTokenTransaction
  | ContractCallTransaction
  | RawTransaction;

// Utils
export type RequiredProperty<T> = {
  [P in keyof T]: Required<NonNullable<T[P]>>;
};

export type ApiRelatedSpace = {
  id: string;
  name: string;
  network: NetworkID;
  avatar: string;
  cover: string | null;
  proposalsCount: number;
  votesCount: number;
  turbo: boolean;
  verified: boolean;
};

export type OffchainApiSpace = {
  id: string;
  verified: boolean;
  turbo: boolean;
  admins: string[];
  members: string[];
  name: string | null;
  avatar: string | null;
  cover: string | null;
  network: string;
  about: string | null;
  website: string | null;
  twitter: string | null;
  github: string | null;
  coingecko: string | null;
  symbol: string;
  treasuries: {
    name: string;
    network: string;
    address: string;
  }[];
  /*delegationPortal: {
    delegationType: DelegationType | 'compound-governor';
    delegationContract: string;
    delegationNetwork: string;
    delegationApi: string;
  } | null;*/
  voting: {
    delay: number | null;
    period: number | null;
    type: VoteType | "" | null;
    quorum: number | null;
    quorumType?: string;
    privacy: string;
    hideAbstain: boolean;
  };
  strategies: { network: string; params: Record<string, any>; name: string }[];
  validation: {
    name: string;
    params?: any;
  };
  filters: {
    minScore: number;
    onlyMembers: boolean;
  };
  proposalsCount: number;
  votesCount: number;
  followersCount: number;
  children: [ApiRelatedSpace];
  parent: ApiRelatedSpace | null;
  // properties used for settings
  terms: string;
  private: boolean;
  domain: string | null;
  skin: string | null;
  template: string | null;
  guidelines: string | null;
  categories: string[];
  moderators: string[];
  plugins: Record<string, any>;
  boost: {
    enabled: boolean;
    bribeEnabled: boolean;
  };
  voteValidation: {
    name: string;
    params?: any;
  };
};

export type ApiProposal = {
  id: string;
  ipfs: string;
  space: {
    id: string;
    name: string;
    avatar: string;
    network: string;
    admins: string[];
    moderators: string[];
    symbol: string;
  };
  type: VoteType;
  title: string;
  body: string;
  discussion: string;
  author: string;
  quorum: number;
  quorumType?: "default" | "rejection";
  start: number;
  end: number;
  snapshot: number;
  choices: string[];
  scores: number[];
  scores_total: number;
  state: "active" | "pending" | "closed";
  strategies: { network: string; params: Record<string, any>; name: string }[];
  created: number;
  updated: number | null;
  votes: number;
  privacy: Privacy;
  plugins: Record<string, any>;
};

export type ApiVote = {
  id: string;
  voter: string;
  ipfs: string;
  space: {
    id: string;
  };
  proposal: {
    id: string;
  };
  choice: number | number[] | Record<string, number>;
  vp: number;
  reason: string;
  created: number;
};

//networks
import { Web3Provider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";

export type PaginationOpts = { limit: number; skip?: number };
export type SpacesFilter = {
  controller?: string;
  id_in?: string[];
  searchQuery?: string;
};
export type ProposalsFilter = {
  state?: "any" | "active" | "pending" | "closed";
} & Record<string, any>;
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

export type StrategyTemplate = {
  address: string;
  name: string;
  about?: string;
  link?: string;
  icon?: any;
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
};

export type StrategyConfig = StrategyTemplate & {
  id: string;
  params: Record<string, any>;
};

export type ExecutionInfo = {
  strategyType: string;
  strategyAddress: string;
  destinationAddress: string;
  treasuryName: string;
  chainId: number;
  transactions: Transaction[];
};

export type SnapshotInfo = {
  at: number | null;
  chainId?: number;
};

export type VotingPower = {
  address: string;
  value: bigint;
  decimals: number;
  token: string | null;
  symbol: string;
  chainId?: number;
  swapLink?: string;
};

export type VotingPowerStatus = "loading" | "success" | "error";

// TODO: make sx.js accept Signer instead of Web3Provider | Wallet

export type ReadOnlyNetworkActions = {
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
    title: string,
    body: string,
    discussion: string,
    type: VoteType,
    choices: string[],
    executions: ExecutionInfo[] | null,
  ): Promise<any>;
  updateProposal(
    web3: Web3Provider,
    connectorType: Connector,
    account: string,
    space: Space,
    proposalId: number | string,
    title: string,
    body: string,
    discussion: string,
    type: VoteType,
    choices: string[],
    executions: ExecutionInfo[] | null,
  ): Promise<any>;
  //cancelProposal(web3: Web3Provider, proposal: Proposal);
  vote(
    web3: Web3Provider,
    connectorType: Connector,
    account: string,
    proposal: Proposal,
    choice: Choice,
    reason: string,
  ): Promise<any>;
  /*followSpace(
    web3: Web3Provider | Wallet,
    networkId: NetworkID,
    spaceId: string,
    from?: string,
  );
  unfollowSpace(
    web3: Web3Provider | Wallet,
    networkId: NetworkID,
    spaceId: string,
    from?: string,
  );
  setAlias(web3: Web3Provider, alias: string);
  updateUser(web3: Web3Provider | Wallet, user: User, from?: string);
  updateStatement(
    web3: Web3Provider | Wallet,
    statement: Statement,
    from?: string,
  );
  transferOwnership(web3: Web3Provider, space: Space, owner: string);
  updateSettingsRaw(web3: Web3Provider, space: Space, settings: string);
  deleteSpace(web3: Web3Provider, space: Space);
  send(envelope: any): Promise<any>;*/
};

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
  /*createSpace(
    web3: Web3Provider,
    salt: string,
    params: {
      controller: string;
      votingDelay: number;
      minVotingDuration: number;
      maxVotingDuration: number;
      authenticators: StrategyConfig[];
      validationStrategy: StrategyConfig;
      votingStrategies: StrategyConfig[];
      executionStrategies: StrategyConfig[];
      executionDestinations: string[];
      metadata: SpaceMetadata;
    },
  );
  setMetadata(web3: Web3Provider, space: Space, metadata: SpaceMetadata);
  finalizeProposal(web3: Web3Provider, proposal: Proposal);
  executeTransactions(web3: Web3Provider, proposal: Proposal);
  executeQueuedProposal(web3: Web3Provider, proposal: Proposal);
  vetoProposal(web3: Web3Provider, proposal: Proposal);
  setVotingDelay(web3: Web3Provider, space: Space, votingDelay: number);
  setMinVotingDuration(
    web3: Web3Provider,
    space: Space,
    minVotingDuration: number,
  );
  setMaxVotingDuration(
    web3: Web3Provider,
    space: Space,
    maxVotingDuration: number,
  );
  updateSettings(
    web3: Web3Provider,
    space: Space,
    metadata: SpaceMetadata,
    authenticatorsToAdd: StrategyConfig[],
    authenticatorsToRemove: number[],
    votingStrategiesToAdd: StrategyConfig[],
    votingStrategiesToRemove: number[],
    validationStrategy: StrategyConfig,
    votingDelay: number | null,
    minVotingDuration: number | null,
    maxVotingDuration: number | null,
  );
  delegate(
    //web3: Web3Provider,
    space: Space,
    networkId: NetworkID,
    delegationType: DelegationType,
    delegatee: string,
    delegationContract: string,
  );*/
};

export type NetworkApi = {
  apiUrl: string;
  loadProposalVotes(
    proposal: Proposal,
    paginationOpts: PaginationOpts,
    filter?: "any" | "for" | "against" | "abstain",
    sortBy?: "vp-desc" | "vp-asc" | "created-desc" | "created-asc",
  ): Promise<Vote[]>;
  loadUserVotes(
    spaceIds: string[],
    voter: string,
    paginationOpts: PaginationOpts,
  ): Promise<{ [key: string]: Vote }>;
  loadProposals(
    spaceIds: string[],
    paginationOpts: PaginationOpts,
    current: number,
    filter?: ProposalsFilter,
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
  loadUserActivities(userId: string): Promise<UserActivity[]>;
  loadLeaderboard(
    spaceId: string,
    paginationOpts: PaginationOpts,
    sortBy?:
      | "vote_count-desc"
      | "vote_count-asc"
      | "proposal_count-desc"
      | "proposal_count-asc",
    user?: string,
  ): Promise<UserActivity[]>;
  loadFollows(userId?: string, spaceId?: string): Promise<Follow[]>;
  loadAlias(
    address: string,
    alias: string,
    created_gt: number,
  ): Promise<Alias | null>;
  loadStatement(
    networkId: NetworkID,
    spaceId: string,
    userId: string,
  ): Promise<Statement | null>;
  loadStatements(
    networkId: NetworkID,
    spaceId: string,
    userIds: string[],
  ): Promise<Statement[]>;
};

export type NetworkConstants = {
  AUTHS: { [key: string]: string };
  PROPOSAL_VALIDATIONS: { [key: string]: string };
  STRATEGIES: { [key: string]: string };
  EXECUTORS: { [key: string]: string };
  EDITOR_AUTHENTICATORS: StrategyTemplate[];
  EDITOR_PROPOSAL_VALIDATIONS: StrategyTemplate[];
  EDITOR_VOTING_STRATEGIES: StrategyTemplate[];
  EDITOR_PROPOSAL_VALIDATION_VOTING_STRATEGIES: StrategyTemplate[];
  EDITOR_EXECUTION_STRATEGIES: StrategyTemplate[];
  EDITOR_VOTING_TYPES: VoteType[];
  STORAGE_PROOF_STRATEGIES_TYPES?: string[];
};

export type NetworkHelpers = {
  isAuthenticatorSupported(authenticator: string): boolean;
  isAuthenticatorContractSupported(authenticator: string): boolean;
  getRelayerAuthenticatorType(
    authenticator: string,
  ): "evm" | "evm-tx" | "starknet" | null;
  isStrategySupported(strategy: string): boolean;
  isExecutorSupported(executor: string): boolean;
  pin: (content: any) => Promise<{ cid: string; provider: string }>;
  getSpaceController(space: Space): Promise<string>;
  getTransaction(txId: string): Promise<any>;
  waitForTransaction(txId: string): Promise<any>;
  waitForSpace(spaceAddress: string, interval?: number): Promise<Space>;
  getExplorerUrl(
    id: string,
    type: "transaction" | "address" | "contract" | "strategy" | "token",
    chainId?: number,
  ): string;
};

/*export type ReadOnlyNetwork = BaseNetwork & {
  readOnly: true;
  actions: ReadOnlyNetworkActions;
};
export type ReadWriteNetwork = BaseNetwork & {
  readOnly?: false;
  actions: NetworkActions;
};*/
/*export type Network = ReadOnlyNetwork | ReadWriteNetwork;*/

export type ExplorePageProtocol = "snapshot" | "snapshotx";

export type ProtocolConfig = {
  key: ExplorePageProtocol;
  label: string;
  networks: NetworkID[];
  limit: number;
};
