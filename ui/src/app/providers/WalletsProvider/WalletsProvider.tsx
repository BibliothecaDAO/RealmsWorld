"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { hash, uint256 } from "starknet";
import { useBalance, useAccount as useL1Account } from "wagmi";
import {
  useAccount as useL2Account,
  useConnectors,
  useContractRead,
} from "@starknet-react/core";
import { actions, initialState, reducer } from "./wallets-reducer";
import {
  useL1TokenBalance,
  useL2TokenBalance,
  useTokenBalance,
} from "@/composables/useTokenBalance";
import { isEth } from "@/app/lib/utils";
import { ChainType, tokens as tokensConst } from "@/constants/tokens";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import L2_ERC20 from "@/abi/L2/ERC20.json";
// Define the UI context's shape
interface WalletsProviderContextValue {
  accountHash: string;
  balances: any;
  refetch: () => void;
}

// Create the UI context
const WalletsProviderContext = createContext<
  WalletsProviderContextValue | undefined
>(undefined);

// Custom hook to use UI context
export const useWalletsProviderContext = (): WalletsProviderContextValue => {
  const context = useContext(WalletsProviderContext);
  if (!context) {
    throw new Error(
      "useWalletsProviderContext must be used within a WalletsProvider"
    );
  }
  return context;
};
import { ERC20 as L1_ERC20_ABI } from "@/abi/L1/ERC20";
import { formatEther, formatGwei } from "viem";

// UI Context Provider component
interface WalletsContextProviderProps {
  children: ReactNode;
}
const FETCH_TOKEN_BALANCE_MAX_RETRY = 1;
export const WalletsProvider: React.FC<WalletsContextProviderProps> = ({
  children,
}) => {
  const [accountHash, setAccountHash] = useState("");
  const calcAccountHash = (account1: string, account2: string) => {
    return hash.computeHashOnElements([
      BigInt(account1).toString(),
      BigInt(account2).toString(),
    ]);
  };
  const [{ tokens }, dispatch] = useReducer(reducer, initialState);
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useL2Account();
  const getL1TokenBalance = useL1TokenBalance("LORDS");

  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";

  const {
    data: l2LordsBalance,
    refetch,
    error,
  } = useContractRead({
    address: tokensConst.L2["LORDS"].tokenAddress[ChainType.L2[network]],
    abi: L2_C1ERC20,
    functionName: "balance_of",
    args: [l2Account as String],
    watch: false,
  });

  const { data: l2EthBalance } = useContractRead({
    address: tokensConst.L2["ETH"].tokenAddress[ChainType.L2[network]],
    abi: L2_ERC20,
    functionName: "balanceOf",
    args: [l2Account],
    watch: false,
  });

  const l1ERC20Contract = {
    address: tokensConst.L1["LORDS"].tokenAddress[
      ChainType.L1[network]
    ] as `0x${string}`,
    abi: L1_ERC20_ABI,
  };
  const {
    data: l1LordsBalance,
    isError,
    isLoading,
  } = useBalance({
    ...l1ERC20Contract,
    address: l1Account as `0x${string}`,
    token: "0x7543919933eef56f754daf6835fa97f6dfd785d8",
  });
  const { data: l1EthBalance } = useBalance({
    address: l1Account as `0x${string}`,
  });

  useEffect(() => {
    //TODO account change not triggered by starknet-react
    // if (l1Account || l2Account) {
    //   fetchTokensBalance(tokens);
    // } else {
    //   resetTokens();
    // }
    if (l2Account) {
      console.log("refectching l2 lords " + l2Account);
      refetch();
      console.log(error);
      console.log(l2LordsBalance);
    }
    if (l1Account && l2Account) {
      setAccountHash(calcAccountHash(l1Account, l2Account));
    } else if (accountHash) {
      setAccountHash("");
    }
  }, [l1Account, l2Account]);

  /*const updateTokenBalance = (symbol: any) => {
    console.log(
      symbol ? `Update ${symbol} token balance` : "Update all tokens balances"
    );
    const filteredTokens = tokens.filter(
      (t: { symbol: any }) => !symbol || t.symbol === symbol
    );
    fetchTokensBalance(filteredTokens);
  };

  const fetchTokensBalance = async (tokens: any[]) => {
    console.log("Updating tokens balance", tokens, l1Account, l2Account);
    tokens.forEach(async (token: any) => {
      if (!token.isLoading) {
        updateToken(token.index, { isLoading: true });

        const balance = token.isL1
          ? await getL1TokenBalance(token.symbol)
          : isEth(token.symbol)
          ? ethBalance?.balance
          : lordsBalance;
        console.log(balance);
        if (!balance) {
          console.error(
            `Failed to fetch token ${token.symbol} balance: failed, retry again`
          );
          return updateToken(token.index, { balance: null, isLoading: false });
        }

        console.log(
          `${token.symbol} (${
            token.isL1 ? "L1" : "L2"
          }) token balance is ${balance}`
        );
        return updateToken(token.index, { balance, isLoading: false });
      }
    });
  };*/

  const updateToken = (
    index: any,
    props: { balance?: any; isLoading: boolean }
  ) => {
    dispatch({
      type: actions.UPDATE_TOKEN,
      payload: {
        index,
        props,
      },
    });
  };

  const resetTokens = () => {
    dispatch({
      type: actions.RESET_TOKENS,
    });
  };

  const value = {
    accountHash,
    tokens,
    // updateTokenBalance,
    refetch,
    balances: {
      l1: {
        eth: l1EthBalance?.value,
        lords: l1LordsBalance?.value,
      },
      l2: {
        //@ts-ignore
        eth: l2EthBalance?.balance
          ? //@ts-ignore
            uint256.uint256ToBN(l2EthBalance?.balance)
          : 0n,
        lords: l2LordsBalance,
      },
    },
  };

  return (
    <WalletsProviderContext.Provider value={value}>
      {children}
    </WalletsProviderContext.Provider>
  );
};
