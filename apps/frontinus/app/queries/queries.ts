import { graphql } from "app/gql/gql";

const SPACE_FRAGMENT = graphql(`
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
        id
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
        id
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
`);

const PROPOSAL_FRAGMENT = graphql(/* GraphQL */ `
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
        treasuries
        executors
        executors_types
        executors_strategies {
          id
          address
          destination_address
          type
          treasury_chain
          treasury
        }
      }
      strategies_parsed_metadata {
        index
        data {
          id
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
      address_type
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
`);

export const PROPOSAL_QUERY = graphql(`
  query ($id: String!) {
    proposal(id: $id) {
      ...proposalFragment
    }
  }
  ${PROPOSAL_FRAGMENT}
`);

export const PROPOSALS_QUERY = graphql(/* GraphQL */ `
  query proposalsQuery($first: Int!, $skip: Int!, $where: Proposal_filter) {
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
`);

export const VOTES_QUERY = graphql(`
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
      metadata {
        reason
      }
      proposal
      choice
      vp
      created
      tx
    }
  }
`);

export const USER_VOTES_QUERY = graphql(`
  query userVotesQuery(
    $first: Int
    $skip: Int
    $spaceIds: [String]
    $voter: String
  ) {
    votes(
      first: $first
      skip: $skip
      where: { space_in: $spaceIds, voter: $voter }
    ) {
      id
      voter {
        id
      }
      space {
        id
      }
      metadata {
        reason
      }
      proposal
      choice
      vp
      created
    }
  }
`);

export const SPACE_QUERY = graphql(`
  query ($id: String!) {
    space(id: $id) {
      ...spaceFragment
    }
  }
  ${SPACE_FRAGMENT}
`);

export const SPACES_QUERY = graphql(`
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
`);

export const USER_QUERY = graphql(`
  query ($id: String!) {
    user(id: $id) {
      id
      proposal_count
      vote_count
      created
    }
  }
`);

export const LEADERBOARD_QUERY = graphql(`
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
      space {
        id
      }
      proposal_count
      vote_count
    }
  }
`);
