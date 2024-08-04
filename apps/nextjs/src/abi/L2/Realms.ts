import type { Abi } from "starknet";

export const RealmsABI = [
  {
    name: "get_votes",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_past_votes",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "timepoint",
        type: "core::integer::u64",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_past_total_supply",
    type: "function",
    inputs: [
      {
        name: "timepoint",
        type: "core::integer::u64",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "delegates",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "delegate",
    type: "function",
    inputs: [
      {
        name: "delegatee",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "delegate_by_sig",
    type: "function",
    inputs: [
      {
        name: "delegator",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "delegatee",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "nonce",
        type: "core::felt252",
      },
      {
        name: "expiry",
        type: "core::integer::u64",
      },
      {
        name: "signature",
        type: "core::array::Array::<core::felt252>",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "balance_of",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "owner_of",
    type: "function",
    inputs: [
      {
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "safe_transfer_from",
    type: "function",
    inputs: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
      },
      {
        name: "data",
        type: "core::array::Span::<core::felt252>",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "transfer_from",
    type: "function",
    inputs: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "approve",
    type: "function",
    inputs: [
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "set_approval_for_all",
    type: "function",
    inputs: [
      {
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "approved",
        type: "core::bool",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "get_approved",
    type: "function",
    inputs: [
      {
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "is_approved_for_all",
    type: "function",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "supports_interface",
    type: "function",
    inputs: [
      {
        name: "interface_id",
        type: "core::felt252",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "name",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::byte_array::ByteArray",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "symbol",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::byte_array::ByteArray",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "token_uri",
    type: "function",
    inputs: [
      {
        name: "token_id",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::byte_array::ByteArray",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "balanceOf",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "ownerOf",
    type: "function",
    inputs: [
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "safeTransferFrom",
    type: "function",
    inputs: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
      {
        name: "data",
        type: "core::array::Span::<core::felt252>",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "transferFrom",
    type: "function",
    inputs: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "setApprovalForAll",
    type: "function",
    inputs: [
      {
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "approved",
        type: "core::bool",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "getApproved",
    type: "function",
    inputs: [
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "isApprovedForAll",
    type: "function",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::bool",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "tokenURI",
    type: "function",
    inputs: [
      {
        name: "tokenId",
        type: "core::integer::u256",
      },
    ],
    outputs: [
      {
        type: "core::byte_array::ByteArray",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_reward_token",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_reward_payer",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_stream",
    type: "function",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "strealm::components::strealm::strealm_structs::Stream",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_flow",
    type: "function",
    inputs: [
      {
        name: "flow_id",
        type: "core::integer::u64",
      },
    ],
    outputs: [
      {
        type: "strealm::components::strealm::strealm_structs::Flow",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_latest_flow_id",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u64",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_reward_balance",
    type: "function",
    inputs: [],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "get_reward_balance_for",
    type: "function",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [
      {
        type: "core::integer::u256",
      },
    ],
    state_mutability: "view",
  },
  {
    name: "reward_claim",
    type: "function",
    inputs: [],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "update_flow_rate",
    type: "function",
    inputs: [
      {
        name: "new_rate",
        type: "core::integer::u256",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    name: "update_reward_payer",
    type: "function",
    inputs: [
      {
        name: "new_payer_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
    outputs: [],
    state_mutability: "external",
  },
] as const satisfies Abi;
