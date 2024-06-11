import { useState } from "react";
import { getNames } from "@/lib/stamp";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import gql from "graphql-tag";

type ApiDelegate = {
  id: string;
  delegatedVotes: string;
  delegatedVotesRaw: string;
  tokenHoldersRepresentedAmount: number;
};

type Delegate = ApiDelegate & {
  name: string | null;
  delegatorsPercentage: number;
  votesPercentage: number;
};

type Governance = {
  delegatedVotes: string;
  totalTokenHolders: string;
  totalDelegates: string;
};

const DELEGATES_LIMIT = 40;

const DELEGATES_QUERY = gql`
  query (
    $first: Int!
    $skip: Int!
    $orderBy: Delegate_orderBy!
    $orderDirection: OrderDirection!
  ) {
    delegates(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { tokenHoldersRepresentedAmount_gte: 0 }
    ) {
      id
      delegatedVotes
      delegatedVotesRaw
      tokenHoldersRepresentedAmount
    }
    governance(id: "GOVERNANCE") {
      delegatedVotes
      totalTokenHolders
      totalDelegates
    }
  }
`;

function convertUrl(apiUrl: string) {
  const hostedPattern =
    /https:\/\/thegraph\.com\/hosted-service\/subgraph\/([\w-]+)\/([\w-]+)/;

  const hostedMatch = apiUrl.match(hostedPattern);
  if (hostedMatch) {
    return `https://api.thegraph.com/subgraphs/name/${hostedMatch[1]}/${hostedMatch[2]}`;
  }

  return apiUrl;
}

export function useDelegates(delegationApiUrl: string) {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const httpLink = createHttpLink({
    uri: convertUrl(delegationApiUrl),
  });

  const apollo = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });

  async function _fetch(
    overwrite: boolean,
    sortBy:
      | "delegatedVotes-desc"
      | "delegatedVotes-asc"
      | "tokenHoldersRepresentedAmount-desc"
      | "tokenHoldersRepresentedAmount-asc",
  ) {
    const [orderBy, orderDirection] = sortBy.split("-");

    const { data } = await apollo.query({
      query: DELEGATES_QUERY,
      variables: {
        orderBy,
        orderDirection,
        first: DELEGATES_LIMIT,
        skip: overwrite ? 0 : delegates.length,
      },
    });

    console.log(data)

    const governanceData = data.governance as Governance;
    const delegatesData = data.delegates as ApiDelegate[];
    const addresses = delegatesData.map((delegate) => delegate.id);

    const names = await getNames(addresses);

    const newDelegates = delegatesData.map((delegate: ApiDelegate) => {
      const delegatorsPercentage =
        (Number(delegate.tokenHoldersRepresentedAmount) /
          Number(governanceData.totalTokenHolders)) *
        100;
      const votesPercentage =
        (Number(delegate.delegatedVotes) /
          Number(governanceData.delegatedVotes)) *
          100 || 0;

      return {
        name: names[delegate.id] || null,
        ...delegate,
        delegatorsPercentage,
        votesPercentage,
      };
    });
    setDelegates(overwrite ? newDelegates : [...delegates, ...newDelegates]);
    setHasMore(delegatesData.length === DELEGATES_LIMIT);
  }

  async function fetch(
    sortBy:
      | "delegatedVotes-desc"
      | "delegatedVotes-asc"
      | "tokenHoldersRepresentedAmount-desc"
      | "tokenHoldersRepresentedAmount-asc" = "delegatedVotes-desc",
  ) {
    if (loading || loaded) return;
    setLoading(true);

    try {
      await _fetch(true, sortBy);

      setLoaded(true);
    } catch (e) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMore(
    sortBy:
      | "delegatedVotes-desc"
      | "delegatedVotes-asc"
      | "tokenHoldersRepresentedAmount-desc"
      | "tokenHoldersRepresentedAmount-asc" = "delegatedVotes-desc",
  ) {
    if (loading || !loaded) return;
    setLoadingMore(true);
    await _fetch(false, sortBy);

    setLoadingMore(false);
  }

  function reset() {
    setDelegates([]);
    setLoading(false);
    setLoadingMore(false);
    setLoaded(false);
    setFailed(false);
    setHasMore(false);
  }

  return {
    loading,
    loadingMore,
    loaded,
    failed,
    hasMore,
    delegates,
    fetch,
    fetchMore,
    reset,
  };
}
