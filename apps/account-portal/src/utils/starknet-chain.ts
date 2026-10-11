import { mainnet, sepolia } from "@starknet-start/chains";
import { env } from "env";
import { constants } from "starknet";

const isSepolia = env.VITE_PUBLIC_CHAIN === "sepolia";

/** The Starknet chain this deployment targets (from `VITE_PUBLIC_CHAIN`). */
export const expectedStarknetChain = isSepolia ? sepolia : mainnet;

/** Hex chain id of the expected chain, as used by wallet RPC requests. */
export const expectedStarknetChainId = isSepolia
  ? constants.StarknetChainId.SN_SEPOLIA
  : constants.StarknetChainId.SN_MAIN;
