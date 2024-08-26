// TODO: fix those issues
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import type {
  Connector,
  NetworkActions,
  NetworkHelpers,
  SnapshotInfo,
  StrategyConfig,
  VotingPower,
} from "@/lib/network/types";
import type {
  Choice,
  MetaTransaction,
  NetworkID,
  Proposal,
  Space,
  StrategyParsedMetadata,
} from "@/types";
import type { Account, RpcProvider } from "starknet";
import { executionCall, MANA_URL } from "@/lib/mana";
import {
  EVM_CONNECTORS,
  STARKNET_CONNECTORS,
} from "@/lib/network/common/constants";
import {
  buildMetadata,
  createStrategyPicker,
  getExecutionData,
  getSdkChoice,
  parseStrategyMetadata,
} from "@/lib/network/common/helpers";
import { getProvider } from "@/lib/provider";
import { convertToMetaTransactions } from "@/lib/transactions";
import { verifyNetwork } from "@/lib/utils";
import type {
  NetworkConfig
} from "@snapshot-labs/sx";
import {
  clients,
  getStarknetStrategy,
  starknetMainnet,
  starknetSepolia,
} from "@snapshot-labs/sx";
import { CallData } from "starknet";

const CONFIGS: Partial<Record<NetworkID, NetworkConfig>> = {
  sn: starknetMainnet,
  "sn-sep": starknetSepolia,
};

export function createActions(
  networkId: NetworkID,
  starkProvider: RpcProvider,
  helpers: NetworkHelpers,
  {
    chainId,
    l1ChainId,
    ethUrl,
  }: { chainId: string; l1ChainId: number; ethUrl: string },
): NetworkActions {
  const networkConfig = CONFIGS[networkId];
  if (!networkConfig) throw new Error(`Unsupported network ${networkId}`);

  const l1Provider = getProvider(l1ChainId);

  const clientConfig = {
    starkProvider,
    manaUrl: MANA_URL,
    ethUrl,
    networkConfig,
  };

  const pickAuthenticatorAndStrategies = createStrategyPicker({
    helpers,
    managerConnectors: STARKNET_CONNECTORS,
    lowPriorityAuthenticators: ["evm-tx"],
  });

  const getIsContract = async (connectorType: Connector, address: string) => {
    if (!EVM_CONNECTORS.includes(connectorType)) return false;

    const code = await l1Provider.getCode(address);
    return code !== "0x";
  };

  const client = new clients.StarknetTx(clientConfig);
  const starkSigClient = new clients.StarknetSig(clientConfig);
  const ethSigClient = new clients.EthereumSig(clientConfig);
  const ethTxClient = new clients.EthereumTx(clientConfig);
  const l1ExecutorClient = new clients.L1Executor();

  return {
    async predictSpaceAddress(web3: any, { salt }) {
      return client.predictSpaceAddress({
        account: web3.provider.account,
        saltNonce: salt,
      });
    },
    async deployDependency(
      web3: any,
      params: {
        controller: string;
        spaceAddress: string;
        strategy: StrategyConfig;
      },
    ) {
      if (!params.strategy.deploy) {
        throw new Error("This strategy is not deployable");
      }

      return params.strategy.deploy(
        client,
        web3,
        params.controller,
        params.spaceAddress,
        params.strategy.params,
      );
    },
    propose: async (
      web3: any,
      connectorType: Connector,
      account: string,
      space: Space,
      cid: string,
      executionStrategy: string | null,
      executionDestinationAddress: string | null,
      transactions: MetaTransaction[],
    ) => {
      const isContract = await getIsContract(connectorType, account);

      const { relayerType, authenticator, strategies } =
        pickAuthenticatorAndStrategies({
          authenticators: space.authenticators,
          strategies: space.voting_power_validation_strategy_strategies,
          strategiesIndicies:
            space.voting_power_validation_strategy_strategies.map((_, i) => i),
          connectorType,
          isContract,
        });

      if (relayerType && ["evm", "evm-tx"].includes(relayerType)) {
        await verifyNetwork(web3, l1ChainId);
      }

      let selectedExecutionStrategy;
      if (executionStrategy) {
        selectedExecutionStrategy = {
          addr: executionStrategy,
          params: getExecutionData(
            space,
            executionStrategy,
            executionDestinationAddress,
            transactions,
          ).executionParams,
        };
      } else {
        selectedExecutionStrategy = {
          addr: "0x0000000000000000000000000000000000000000",
          params: [],
        };
      }

      const strategiesWithMetadata = await Promise.all(
        strategies.map(async (strategy) => {
          const metadata = await parseStrategyMetadata(
            space.voting_power_validation_strategies_parsed_metadata[
              //@ts-expect-error index can be undefined?
              strategy.index
            ].payload,
          );

          return {
            ...strategy,
            metadata,
          };
        }),
      );

      const data = {
        space: space.id,
        authenticator,
        strategies: strategiesWithMetadata,
        executionStrategy: selectedExecutionStrategy,
        metadataUri: `ipfs://${cid}`,
      };

      if (relayerType === "starknet") {
        return starkSigClient.propose({
          signer: web3.provider.account,
          //@ts-expect-error index can be undefined?
          data,
        });
      } else if (relayerType === "evm") {
        return ethSigClient.propose({
          signer: web3.getSigner(),
          //@ts-expect-error index can be undefined?
          data,
        });
      } else if (relayerType === "evm-tx") {
        //@ts-expect-error index can be undefined?
        return ethTxClient.initializePropose(web3.getSigner(), data, {
          noWait: isContract,
        });
      }

      return client.propose(web3.provider.account, {
        //@ts-expect-error index can be undefined?
        data,
      });
    },
    async updateProposal(
      web3: any,
      connectorType: Connector,
      account: string,
      space: Space,
      proposalId: number | string,
      cid: string,
      executionStrategy: string | null,
      executionDestinationAddress: string | null,
      transactions: MetaTransaction[],
    ) {
      const isContract = await getIsContract(connectorType, account);

      const { relayerType, authenticator } = pickAuthenticatorAndStrategies({
        authenticators: space.authenticators,
        strategies: space.voting_power_validation_strategy_strategies,
        strategiesIndicies:
          space.voting_power_validation_strategy_strategies.map((_, i) => i),
        connectorType,
        isContract,
      });

      if (relayerType && ["evm", "evm-tx"].includes(relayerType)) {
        await verifyNetwork(web3, l1ChainId);
      }

      let selectedExecutionStrategy;
      if (executionStrategy) {
        selectedExecutionStrategy = {
          addr: executionStrategy,
          params: getExecutionData(
            space,
            executionStrategy,
            executionDestinationAddress,
            transactions,
          ).executionParams,
        };
      } else {
        selectedExecutionStrategy = {
          addr: "0x0000000000000000000000000000000000000000",
          params: [],
        };
      }

      const data = {
        space: space.id,
        proposal: proposalId as number,
        authenticator,
        executionStrategy: selectedExecutionStrategy,
        metadataUri: `ipfs://${cid}`,
      };

      if (relayerType === "starknet") {
        return starkSigClient.updateProposal({
          signer: web3.provider.account,
          data,
        });
      } else if (relayerType === "evm") {
        return ethSigClient.updateProposal({
          signer: web3.getSigner(),
          data,
        });
      } else if (relayerType === "evm-tx") {
        return ethTxClient.initializeUpdateProposal(web3.getSigner(), data, {
          noWait: isContract,
        });
      }

      return client.updateProposal(web3.provider.account, {
        data,
      });
    },
    cancelProposal: (web3: any, proposal: Proposal) => {
      return client.cancelProposal({
        signer: web3.provider.account,
        space: proposal.space.id,
        proposal: proposal.proposal_id as number,
      });
    },
    vote: async (
      web3: any,
      connectorType: Connector,
      account: string,
      proposal: Proposal,
      choice: Choice,
    ) => {
      const isContract = await getIsContract(connectorType, account);

      const { relayerType, authenticator, strategies } =
        pickAuthenticatorAndStrategies({
          authenticators: proposal.space.authenticators,
          strategies: proposal.strategies,
          strategiesIndicies: proposal.strategies_indicies,
          connectorType,
          isContract,
        });

      if (relayerType && ["evm", "evm-tx"].includes(relayerType)) {
        await verifyNetwork(web3, l1ChainId);
      }

      const strategiesWithMetadata = await Promise.all(
        strategies.map(async (strategy) => {
          const metadataIndex = proposal.strategies_indicies.indexOf(
            //@ts-expect-error index can be undefined?
            strategy.index,
          );

          const metadata = await parseStrategyMetadata(
            //@ts-expect-error index can be undefined?
            proposal.space.strategies_parsed_metadata[metadataIndex].payload,
          );

          return {
            ...strategy,
            metadata,
          };
        }),
      );

      const data = {
        space: proposal.space.id,
        authenticator,
        strategies: strategiesWithMetadata,
        proposal: proposal.proposal_id as number,
        choice: getSdkChoice(choice),
      };

      if (relayerType === "starknet") {
        return starkSigClient.vote({
          signer: web3.provider.account,
          //@ts-expect-error index can be undefined?
          data,
        });
      } else if (relayerType === "evm") {
        return ethSigClient.vote({
          signer: web3.getSigner(),
          //@ts-expect-error index can be undefined?
          data,
        });
      } else if (relayerType === "evm-tx") {
        //@ts-expect-error index can be undefined?

        return ethTxClient.initializeVote(web3.getSigner(), data, {
          noWait: isContract,
        });
      }

      return client.vote(web3.provider.account, {
        //@ts-expect-error index can be undefined?
        data,
      });
    },
    finalizeProposal: () => null,
    executeTransactions: async (web3: any, proposal: Proposal) => {
      const executionData = getExecutionData(
        proposal.space,
        proposal.execution_strategy,
        proposal.execution_destination,
        convertToMetaTransactions(proposal.execution),
      );

      return executionCall("stark", chainId, "execute", {
        space: proposal.space.id,
        proposalId: proposal.proposal_id,
        executionParams: executionData.executionParams,
      });
    },
    executeQueuedProposal: async (web3: any, proposal: Proposal) => {
      if (!proposal.execution_destination)
        throw new Error("Execution destination is missing");

      const activeVotingStrategies = proposal.strategies_indicies.reduce(
        (acc, index) => {
          return acc | (1n << BigInt(index));
        },
        0n,
      );

      const proposalData = {
        startTimestamp: BigInt(proposal.start),
        minEndTimestamp: BigInt(proposal.min_end),
        maxEndTimestamp: BigInt(proposal.max_end),
        finalizationStatus: 0,
        executionPayloadHash: proposal.execution_hash,
        executionStrategy: proposal.execution_strategy,
        authorAddressType: 1, // <- hardcoded, needs to be indexed (0 for starknet, 1 for ethereum)
        author: proposal.author.id,
        activeVotingStrategies: activeVotingStrategies,
      } as const;

      const votesFor = BigInt(proposal.scores[0] ?? 0);
      const votesAgainst = BigInt(proposal.scores[1] ?? 0);
      const votesAbstain = BigInt(proposal.scores[2] ?? 0);

      const { executionParams } = getExecutionData(
        proposal.space,
        proposal.execution_strategy,
        proposal.execution_destination,
        convertToMetaTransactions(proposal.execution),
      );

      const executionHash = `${executionParams[2]}${executionParams[1]?.slice(2)}`;

      return l1ExecutorClient.execute({
        signer: web3.getSigner(),
        executor: proposal.execution_destination,
        space: proposal.space.id,
        proposal: proposalData,
        votesFor,
        votesAgainst,
        votesAbstain,
        executionHash,
        transactions: convertToMetaTransactions(proposal.execution),
      });
    },
    //@ts-expect-error TODO
    vetoProposal: () => null,
    setVotingDelay: async (web3: any, space: Space, votingDelay: number) => {
      return client.setVotingDelay({
        signer: web3.provider.account,
        space: space.id,
        votingDelay,
      });
    },
    setMinVotingDuration: async (
      web3: any,
      space: Space,
      minVotingDuration: number,
    ) => {
      return client.setMinVotingDuration({
        signer: web3.provider.account,
        space: space.id,
        minVotingDuration,
      });
    },
    setMaxVotingDuration: async (
      web3: any,
      space: Space,
      maxVotingDuration: number,
    ) => {
      return client.setMaxVotingDuration({
        signer: web3.provider.account,
        space: space.id,
        maxVotingDuration,
      });
    },
    transferOwnership: async (web3: any, space: Space, owner: string) => {
      return client.transferOwnership({
        signer: web3.provider.account,
        space: space.id,
        owner,
      });
    },
    updateStrategies: async (
      web3: any,
      space: Space,
      authenticatorsToAdd: StrategyConfig[],
      authenticatorsToRemove: number[],
      votingStrategiesToAdd: StrategyConfig[],
      votingStrategiesToRemove: number[],
      validationStrategy: StrategyConfig,
    ) => {
      const metadataUris = await Promise.all(
        votingStrategiesToAdd.map((config) => buildMetadata(helpers, config)),
      );

      const proposalValidationStrategyMetadataUri = await buildMetadata(
        helpers,
        validationStrategy,
      );

      return client.updateSettings({
        signer: web3.provider.account,
        space: space.id,
        settings: {
          authenticatorsToAdd: authenticatorsToAdd.map(
            (config) => config.address,
          ),
          authenticatorsToRemove: space.authenticators.filter(
            (authenticator, index) => authenticatorsToRemove.includes(index),
          ),
          votingStrategiesToAdd: votingStrategiesToAdd.map((config) => ({
            addr: config.address,
            params: config.generateParams
              ? config.generateParams(config.params)
              : [],
          })),
          votingStrategiesToRemove: votingStrategiesToRemove.map(
            (index) => space.strategies_indicies[index] ?? 0,
          ),
          votingStrategyMetadataUrisToAdd: metadataUris,
          proposalValidationStrategy: {
            addr: validationStrategy.address,
            params: validationStrategy.generateParams
              ? validationStrategy.generateParams(validationStrategy.params)
              : [],
          },
          proposalValidationStrategyMetadataUri,
        },
      });
    },
    delegate: async (
      web3: any,
      space: Space,
      networkId: NetworkID,
      delegatee: string,
      delegationContract: string,
    ) => {
      const [, contractAddress] = delegationContract.split(":");

      const { account }: { account: Account } = web3.provider;

      return account.execute({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contractAddress: contractAddress!,
        entrypoint: "delegate",
        calldata: CallData.compile({
          delegatee,
        }),
      });
    },
    getVotingPower: async (
      spaceId: string,
      strategiesAddresses: string[],
      strategiesParams: any[],
      strategiesMetadata: StrategyParsedMetadata[],
      voterAddress: string,
      snapshotInfo: SnapshotInfo,
    ): Promise<VotingPower[]> => {
      return Promise.all(
        strategiesAddresses.map(async (address, i) => {
          const strategy = getStarknetStrategy(address, networkConfig);
          if (!strategy)
            return { address, value: 0n, decimals: 0, token: null, symbol: "" };

          const strategyMetadata = await parseStrategyMetadata(
            //@ts-expect-error this is ok
            strategiesMetadata[i].payload,
          );

          const value = await strategy.getVotingPower(
            address,
            voterAddress,
            strategyMetadata,
            snapshotInfo.at,
            strategiesParams[i].split(","),
            {
              ...clientConfig,
              networkConfig,
            },
          );

          return {
            address,
            value,
            decimals: strategiesMetadata[i]?.decimals ?? 0,
            symbol: strategiesMetadata[i]?.symbol ?? "",
            token: strategiesMetadata[i]?.token ?? null,
          };
        }),
      );
    },
    send: (envelope: any) => starkSigClient.send(envelope), // TODO: extract it out of client to common helper
  };
}
