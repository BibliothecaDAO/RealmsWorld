"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import { hash, uint256 } from "starknet";
import { useBalance, useAccount as useL1Account } from "wagmi";
import {
  useAccount as useL2Account,
  useContractRead,
} from "@starknet-react/core";
import { initialState, reducer } from "./wallets-reducer";
import { ChainType, tokens as tokensConst } from "@/constants/tokens";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import L2_ERC20 from "@/abi/L2/ERC20.json";
import { ERC20 as L1_ERC20_ABI } from "@/abi/L1/ERC20";

interface WalletsProviderContextValue {
  accountHash: string;
  balances: any;
  l2loading: boolean;
  // refetch: () => void;
}

const WalletsProviderContext = createContext<
  WalletsProviderContextValue | undefined
>(undefined);

export const useWalletsProviderContext = (): WalletsProviderContextValue => {
  const context = useContext(WalletsProviderContext);
  if (!context) {
    throw new Error(
      "useWalletsProviderContext must be used within a WalletsProvider"
    );
  }
  return context;
};

interface WalletsContextProviderProps {
  children: ReactNode;
}

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
  const { address: l2Account, isConnected } = useL2Account();

  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";

  const stubAccount = l2Account ? [l2Account] : undefined;
  const {
    data: l2LordsBalance,
    isLoading: l2LordsIsLoading,
    error: l2LordsError,
    refetch: l2LordsRefetch,
    isFetched,
  } = useContractRead({
    address: tokensConst.L2["LORDS"].tokenAddress[ChainType.L2[network]],
    abi: L2_C1ERC20,
    functionName: "balance_of",
    args: stubAccount,
    watch: true,
  });

  const {
    data: l2EthBalance,
    isLoading: l2EthIsLoading,
    error: l2EthError,
    refetch: l2EthRefetch,
  } = useContractRead({
    address: tokensConst.L2["ETH"].tokenAddress[ChainType.L2[network]],
    abi: L2_ERC20,
    functionName: "balanceOf",
    args: stubAccount,
    watch: true,
  });

  useMemo(() => {
    l2LordsRefetch();
  }, [l2LordsBalance, l2EthBalance, l2LordsIsLoading, l2EthIsLoading]);

  const l1ERC20Contract = {
    address: tokensConst.L1["LORDS"].tokenAddress[
      ChainType.L1[network]
    ] as `0x${string}`,
    abi: L1_ERC20_ABI,
  };

  const { data: l1LordsBalance } = useBalance({
    ...l1ERC20Contract,
    address: l1Account as `0x${string}`,
    token: tokensConst.L1["LORDS"].tokenAddress[
      ChainType.L1[network]
    ] as `0x${string}`,
  });

  const { data: l1EthBalance } = useBalance({
    address: l1Account as `0x${string}`,
  });

  useEffect(() => {
    if (l1Account && l2Account) {
      setAccountHash(calcAccountHash(l1Account, l2Account));
    } else if (accountHash) {
      setAccountHash("");
    }
  }, [l1Account, l2Account]);

  const value = {
    accountHash,
    tokens,
    // updateTokenBalance,
    l2loading: l2LordsIsLoading || l2EthIsLoading,
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
