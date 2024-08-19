import type {
  Connector,
  NetworkActions,
  NetworkHelpers,
  SnapshotInfo,
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
import type { Web3Provider } from "@ethersproject/providers";
import { CHAIN_IDS } from "@/data/constants";
import { getSwapLink } from "@/lib/link";
import { executionCall, MANA_URL } from "@/lib/mana";
import { EVM_CONNECTORS } from "@/lib/network/common/constants";
import {
  createStrategyPicker,
  getExecutionData,
  getSdkChoice,
  parseStrategyMetadata,
} from "@/lib/network/common/helpers";
import { convertToMetaTransactions } from "@/lib/transactions";
import { verifyNetwork } from "@/lib/utils";
import { Contract } from "@ethersproject/contracts";
import type { Provider } from "@ethersproject/providers";
import type {
  Envelope,
  EvmNetworkConfig,
  Propose,
  UpdateProposal,
  Vote,
} from "@snapshot-labs/sx";
import {
  clients,
  evmMainnet,
  evmSepolia,
  getEvmStrategy,
} from "@snapshot-labs/sx";

const CONFIGS: Record<number, EvmNetworkConfig> = {
  1: evmMainnet,
  11155111: evmSepolia,
};

export function createActions(
  provider: Provider,
  helpers: NetworkHelpers,
  chainId: number,
): NetworkActions {
  const networkConfig = CONFIGS[chainId];

  const pickAuthenticatorAndStrategies = createStrategyPicker({
    helpers,
    managerConnectors: EVM_CONNECTORS,
  });

  if (!networkConfig) {
    throw new Error("Network configuration is undefined");
  }

  const client = new clients.EvmEthereumTx({ networkConfig });
  const ethSigClient = new clients.EvmEthereumSig({
    networkConfig,
    manaUrl: MANA_URL,
  });

  const getIsContract = async (address: string) => {
    const code = await provider.getCode(address);
    return code !== "0x";
  };

  return {
    propose: async (
      web3: Web3Provider,
      connectorType: Connector,
      account: string,
      space: Space,
      cid: string,
      executionStrategy: string | null,
      executionDestinationAddress: string | null,
      transactions: MetaTransaction[],
    ) => {
      await verifyNetwork(web3, chainId);

      const isContract = await getIsContract(account);

      const { relayerType, authenticator, strategies } =
        pickAuthenticatorAndStrategies({
          authenticators: space.authenticators,
          strategies: space.voting_power_validation_strategy_strategies,
          strategiesIndicies:
            space.voting_power_validation_strategy_strategies.map((_, i) => i),
          connectorType,
          isContract,
        });

      let selectedExecutionStrategy;
      if (executionStrategy) {
        selectedExecutionStrategy = {
          addr: executionStrategy,
          params: getExecutionData(space, executionStrategy, executionDestinationAddress, transactions)
            .executionParams[0],
        };
      } else {
        selectedExecutionStrategy = {
          addr: "0x0000000000000000000000000000000000000000",
          params: "0x",
        };
      }

      const strategiesWithMetadata = await Promise.all(
        strategies.map(async (strategy) => {
          const m = space.voting_power_validation_strategies_parsed_metadata[
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            strategy.index!
          ];
          if (!m) return strategy;

          return {
            ...strategy,

            metadata: await parseStrategyMetadata(m.payload),
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

      if (relayerType === "evm") {
        return ethSigClient.propose({
          signer: web3.getSigner(),
          data,
        });
      }

      return client.propose(
        {
          signer: web3.getSigner(),
          envelope: {
            data,
          },
        },
        {
          noWait: isContract,
        },
      );
    },
    async updateProposal(
      web3: Web3Provider,
      connectorType: Connector,
      account: string,
      space: Space,
      proposalId: number | string,
      cid: string,
      executionStrategy: string | null,
      transactions: MetaTransaction[],
    ) {
      await verifyNetwork(web3, chainId);

      const isContract = await getIsContract(account);

      const { relayerType, authenticator } = pickAuthenticatorAndStrategies({
        authenticators: space.authenticators,
        strategies: space.voting_power_validation_strategy_strategies,
        strategiesIndicies:
          space.voting_power_validation_strategy_strategies.map((_, i) => i),
        connectorType,
        isContract,
      });

      let selectedExecutionStrategy;
      if (executionStrategy) {
        selectedExecutionStrategy = {
          addr: executionStrategy,
          params: getExecutionData(space, executionStrategy, transactions)
            .executionParams[0],
        };
      } else {
        selectedExecutionStrategy = {
          addr: "0x0000000000000000000000000000000000000000",
          params: "0x",
        };
      }

      const data = {
        space: space.id,
        proposal: proposalId as number,
        authenticator,
        executionStrategy: selectedExecutionStrategy,
        metadataUri: `ipfs://${cid}`,
      };

      if (relayerType === "evm") {
        return ethSigClient.updateProposal({
          signer: web3.getSigner(),
          data,
        });
      }

      return client.updateProposal(
        {
          signer: web3.getSigner(),
          envelope: {
            data,
          },
        },
        { noWait: isContract },
      );
    },
    cancelProposal: async (web3: Web3Provider, proposal: Proposal) => {
      await verifyNetwork(web3, chainId);

      const address = await web3.getSigner().getAddress();
      const isContract = await getIsContract(address);

      return client.cancel(
        {
          signer: web3.getSigner(),
          space: proposal.space.id,
          proposal: proposal.proposal_id as number,
        },
        { noWait: isContract },
      );
    },
    vote: async (
      web3: Web3Provider,
      connectorType: Connector,
      account: string,
      proposal: Proposal,
      choice: Choice,
    ) => {
      await verifyNetwork(web3, chainId);

      const isContract = await getIsContract(account);

      const { relayerType, authenticator, strategies } =
        pickAuthenticatorAndStrategies({
          authenticators: proposal.space.authenticators,
          strategies: proposal.strategies,
          strategiesIndicies: proposal.strategies_indicies,
          connectorType,
          isContract,
        });

      const strategiesWithMetadata = await Promise.all(
        strategies.map(async (strategy) => {
          const metadataIndex = proposal.strategies_indicies.indexOf(
            strategy.index,
          );

          const metadata = await parseStrategyMetadata(
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
        metadataUri: "",
        chainId,
      };

      /* if (!isContract && proposal.execution_strategy_type === 'Axiom') {
        return highlightVote({ signer: web3.getSigner(), data });
      }*/

      if (relayerType === "evm") {
        return ethSigClient.vote({
          signer: web3.getSigner(),
          data,
        });
      }

      return client.vote(
        {
          signer: web3.getSigner(),
          envelope: {
            data,
          },
        },
        { noWait: isContract },
      );
    },
    finalizeProposal: async (web3: Web3Provider, proposal: Proposal) => {
      await executionCall(chainId, "finalizeProposal", {
        space: proposal.space.id,
        proposalId: proposal.proposal_id,
      });

      return null;
    },
    executeTransactions: async (web3: Web3Provider, proposal: Proposal) => {
      await verifyNetwork(web3, chainId);

      const executionData = getExecutionData(
        proposal.space,
        proposal.execution_strategy,
        convertToMetaTransactions(proposal.execution),
      );

      return executionCall(chainId, "execute", {
        space: proposal.space.id,
        proposalId: proposal.proposal_id,
        executionParams: executionData.executionParams[0],
      });
    },
    executeQueuedProposal: async (web3: Web3Provider, proposal: Proposal) => {
      await verifyNetwork(web3, chainId);

      const executionData = getExecutionData(
        proposal.space,
        proposal.execution_strategy,
        convertToMetaTransactions(proposal.execution),
      );

      return executionCall(chainId, "executeQueuedProposal", {
        space: proposal.space.id,
        executionStrategy: proposal.execution_strategy,
        executionParams: executionData.executionParams[0],
      });
    },
    vetoProposal: async (web3: Web3Provider, proposal: Proposal) => {
      await verifyNetwork(web3, chainId);

      return client.vetoExecution({
        signer: web3.getSigner(),
        executionStrategy: proposal.execution_strategy,
        executionHash: proposal.execution_hash,
      });
    },
    setVotingDelay: async (
      web3: Web3Provider,
      space: Space,
      votingDelay: number,
    ) => {
      await verifyNetwork(web3, chainId);

      const address = await web3.getSigner().getAddress();
      const isContract = await getIsContract(address);

      return client.setVotingDelay(
        {
          signer: web3.getSigner(),
          space: space.id,
          votingDelay,
        },
        { noWait: isContract },
      );
    },
    setMinVotingDuration: async (
      web3: Web3Provider,
      space: Space,
      minVotingDuration: number,
    ) => {
      await verifyNetwork(web3, chainId);

      const address = await web3.getSigner().getAddress();
      const isContract = await getIsContract(address);

      return client.setMinVotingDuration(
        {
          signer: web3.getSigner(),
          space: space.id,
          minVotingDuration,
        },
        { noWait: isContract },
      );
    },
    setMaxVotingDuration: async (
      web3: Web3Provider,
      space: Space,
      maxVotingDuration: number,
    ) => {
      await verifyNetwork(web3, chainId);

      const address = await web3.getSigner().getAddress();
      const isContract = await getIsContract(address);

      return client.setMaxVotingDuration(
        {
          signer: web3.getSigner(),
          space: space.id,
          maxVotingDuration,
        },
        { noWait: isContract },
      );
    },
    delegate: async (
      web3: Web3Provider,
      space: Space,
      networkId: NetworkID,
      delegatee: string,
      delegationContract: string,
    ) => {
      await verifyNetwork(web3, CHAIN_IDS[networkId as keyof typeof CHAIN_IDS]);

      const [, contractAddress] = delegationContract.split(":");

      const votesContract = new Contract(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        contractAddress!,
        ["function delegate(address delegatee)"],
        web3.getSigner(),
      );


      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
      return votesContract.delegate(delegatee);
    },

    send: (envelope: Envelope<Propose | UpdateProposal | Vote>) => ethSigClient.send(envelope),
    getVotingPower: async (
      spaceId: string,
      strategiesAddresses: string[],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      strategiesParams: any[],
      strategiesMetadata: StrategyParsedMetadata[],
      voterAddress: string,
      snapshotInfo: SnapshotInfo,
    ): Promise<VotingPower[]> => {
      if (snapshotInfo.at === null)
        throw new Error("EVM requires block number to be defined");

      return Promise.all(
        strategiesAddresses.map(async (address, i) => {
          const strategy = getEvmStrategy(address, networkConfig);
          if (!strategy)
            return { address, value: 0n, decimals: 0, token: null, symbol: "" };

          const metadata = strategiesMetadata[i];
          const strategyParams: string = strategiesParams[i] as string;
          if (!metadata) throw new Error("Metadata is missing");

          const strategyMetadata = await parseStrategyMetadata(
            metadata.payload,
          );

          const value = await strategy.getVotingPower(
            address,
            voterAddress,
            strategyMetadata,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            snapshotInfo.at!,
            strategyParams,
            provider,
          );

          const token = ["comp", "ozVotes"].includes(strategy.type)
            ? strategyParams
            : undefined;
          return {
            address,
            value,
            decimals: strategiesMetadata[i]?.decimals ?? 0,
            symbol: strategiesMetadata[i]?.symbol ?? "",
            token,
            swapLink: getSwapLink(strategy.type, address, chainId),
          };
        }),
      );
    },
  };
}
