import type { Leaderboard, Space, Space, User, Vote } from "@/types";
import gql from "graphql-tag";
import type { ApiProposal, ApiSpace } from "./types";

const SPACE_FRAGMENT = gql`
  fragment spaceFragment on Space {
    id
    metadata {
      name
      avatar
      cover
      about
      external_url
      github
      twitter
      discord
      voting_power_symbol
      treasuries
      delegations
      executors
      executors_types
      executors_destinations
      executors_strategies {
        id
        address
        destination_address
        type
        treasury_chain
        treasury
      }
    }
    controller
    voting_delay
    min_voting_period
    max_voting_period
    proposal_threshold
    validation_strategy
    validation_strategy_params
    voting_power_validation_strategy_strategies
    voting_power_validation_strategy_strategies_params
    voting_power_validation_strategies_parsed_metadata {
      index
      data {
        name
        description
        decimals
        symbol
        token
        payload
      }
    }
    strategies_indicies
    strategies
    strategies_params
    strategies_parsed_metadata {
      index
      data {
        name
        description
        decimals
        symbol
        token
        payload
      }
    }
    authenticators
    proposal_count
    vote_count
    created
  }
`;

const PROPOSAL_FRAGMENT = gql`
  fragment proposalFragment on Proposal {
    id
    proposal_id
    space {
      id
      controller
      authenticators
      metadata {
        id
        name
        avatar
        voting_power_symbol
        executors
        executors_types
      }
      strategies_parsed_metadata {
        index
        data {
          name
          description
          decimals
          symbol
          token
          payload
        }
      }
    }
    author {
      id
    }
    quorum
    execution_hash
    metadata {
      id
      title
      body
      discussion
      execution
    }
    start
    min_end
    max_end
    snapshot
    scores_1
    scores_2
    scores_3
    scores_total
    execution_time
    execution_strategy
    execution_strategy_type
    execution_destination
    timelock_veto_guardian
    strategies_indicies
    strategies
    strategies_params
    created
    edited
    tx
    execution_tx
    veto_tx
    vote_count
    execution_ready
    executed
    vetoed
    completed
    cancelled
  }
`;

export const PROPOSAL_QUERY = gql`
  query ($id: String!) {
    proposal(id: $id) {
      ...proposalFragment
    }
  }
  ${PROPOSAL_FRAGMENT}
`;
export interface ProposalQueryResult {
  data: {
    proposal: ApiProposal
  }
}

export const PROPOSALS_QUERY = gql`
  query ($first: Int!, $skip: Int!, $where: Proposal_filter) {
    proposals(
      first: $first
      skip: $skip
      where: $where
      orderBy: created
      orderDirection: desc
    ) {
      ...proposalFragment
    }
  }
  ${PROPOSAL_FRAGMENT}
`;
export interface ProposalsQueryResult {
  data: {
    proposals: ApiProposal[]
  }
}

export const VOTES_QUERY = gql`
  query (
    $first: Int!
    $skip: Int!
    $orderBy: Vote_orderBy!
    $orderDirection: OrderDirection!
    $where: Vote_filter
  ) {
    votes(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      voter {
        id
      }
      space {
        id
      }
      proposal
      choice
      vp
      created
      tx
    }
  }
`;
export interface VotesQueryResult {
  data: {
    votes: Vote[];
  }
}

export const USER_VOTES_QUERY = gql`
  query ($spaceIds: [String], $voter: String) {
    votes(where: { space_in: $spaceIds, voter: $voter }) {
      id
      voter {
        id
      }
      space {
        id
      }
      proposal
      choice
      vp
      created
    }
  }
`;

export const SPACE_QUERY = gql`
  query ($id: String!) {
    space(id: $id) {
      ...spaceFragment
    }
  }
  ${SPACE_FRAGMENT}
`;
export interface SpaceQueryResult {
  data: {
    space: ApiSpace
  }
}

export const SPACES_QUERY = gql`
  query ($first: Int!, $skip: Int!, $where: Space_filter) {
    spaces(
      first: $first
      skip: $skip
      orderBy: vote_count
      orderDirection: desc
      where: $where
    ) {
      ...spaceFragment
    }
  }
  ${SPACE_FRAGMENT}
`;
export interface SpacesQueryResult {
  data: {
    spaces: Space[]
  }
}

export const USER_QUERY = gql`
  query ($id: String!) {
    user(id: $id) {
      id
      proposal_count
      vote_count
      created
    }
  }
`;
export interface UserQueryResult {
  data: {
    user: User
  }
}

export const LEADERBOARD_QUERY = gql`
  query (
    $first: Int!
    $skip: Int!
    $orderBy: Leaderboard_orderBy
    $orderDirection: OrderDirection!
    $where: Leaderboard_filter
  ) {
    leaderboards(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      user {
        id
        created
      }
      proposal_count
      vote_count
    }
  }
`;
export interface LeaderboardQueryResult {
  data: {
    leaderboards: Leaderboard[]
  }
}




