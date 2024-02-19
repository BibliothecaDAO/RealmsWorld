/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";

export const actions = {
  UPDATE_TOKEN: "Tokens/UPDATE_TOKEN",
  RESET_TOKENS: "Tokens/RESET_TOKENS",
};
const tokenList = [
  ...Object.values(tokens.L1).map((t) => ({
    ...t,
    isL1: true,
    bridgeAddress: t.bridgeAddress?.[ChainType.L1[NETWORK_NAME]],
    tokenAddress: t.tokenAddress?.[ChainType.L1[NETWORK_NAME]],
  })),
  ...Object.values(tokens.L2).map((t) => ({
    ...t,
    isL2: true,
    bridgeAddress: t.bridgeAddress?.[ChainType.L2[NETWORK_NAME]],
    tokenAddress: t.tokenAddress?.[ChainType.L2[NETWORK_NAME]],
  })),
].map((t, index) => ({ ...t, index }));

export const initialState = { tokens: tokenList, accountHash: "" };

export const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case actions.UPDATE_TOKEN: {
      const { index, props } = action.payload;
      const newToken = { ...state.tokens[index], ...props };
      const clonedTokens = [...state.tokens];
      clonedTokens[index] = newToken;
      return { ...state, tokens: clonedTokens };
    }

    case actions.RESET_TOKENS:
      return initialState;

    default:
      return state;
  }
};
