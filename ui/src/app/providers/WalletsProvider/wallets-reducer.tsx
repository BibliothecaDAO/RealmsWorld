import { ChainType, tokens } from "@/constants/tokens";

const network =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";

export const actions = {
  UPDATE_TOKEN: "Tokens/UPDATE_TOKEN",
  RESET_TOKENS: "Tokens/RESET_TOKENS",
};
const tokenList = [
  ...Object.values(tokens.L1).map((t) => ({
    ...t,
    isL1: true,
    bridgeAddress: t.bridgeAddress?.[ChainType.L1[network]],
    tokenAddress: t.tokenAddress?.[ChainType.L1[network]],
  })),
  ...Object.values(tokens.L2).map((t) => ({
    ...t,
    isL2: true,
    bridgeAddress: t.bridgeAddress?.[ChainType.L2[network]],
    tokenAddress: t.tokenAddress?.[ChainType.L2[network]],
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
