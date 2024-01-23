"use client";

import type { ReactNode } from "react";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { ERC20 as L1_ERC20_ABI } from "@/abi/L1/ERC20";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import L2_ERC20 from "@/abi/L2/ERC20.json";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens as tokensConst } from "@/constants/tokens";
import {
  useContractRead,
  useAccount as useL2Account,
} from "@starknet-react/core";
import { hash, uint256 } from "starknet";
import { useBalance, useAccount as useL1Account } from "wagmi";

import { initialState, reducer } from "./wallets-reducer";

interface WalletsProviderContextValue {
  accountHash: string;
  balances: {
    l1: {
      lords?: bigint;
      eth?: bigint;
    };
    l2: {
      lords?: bigint;
      eth?: bigint;
    };
  };
  l2loading: boolean;
  refetch: () => void;
}

const WalletsProviderContext = createContext<
  WalletsProviderContextValue | undefined
>(undefined);

export const useWalletsProviderContext = (): WalletsProviderContextValue => {
  const context = useContext(WalletsProviderContext);
  if (!context) {
    throw new Error(
      "useWalletsProviderContext must be used within a WalletsProvider",
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
  const [{ tokens }] = useReducer(reducer, initialState);
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useL2Account();

  const {
    data: l2LordsBalance,
    isFetching: l2LordsIsLoading,
    refetch: l2LordsRefetch,
  } = useContractRead({
    address: tokensConst.L2.LORDS.tokenAddress[ChainType.L2[NETWORK_NAME]]!,
    abi: L2_C1ERC20,
    functionName: "balance_of",
    enabled: !!l2Account,
    args: l2Account ? [l2Account] : undefined,
    watch: true,
  });

  const { data: l2EthBalance, isFetching: l2EthIsLoading } = useContractRead({
    address: tokensConst.L2.ETH.tokenAddress[ChainType.L2[NETWORK_NAME]]!,
    abi: L2_ERC20,
    functionName: "balanceOf",
    enabled: !!l2Account,
    args: l2Account ? [l2Account] : undefined,
    watch: true,
  });

  const l1ERC20Contract = {
    address: tokensConst.L1.LORDS.tokenAddress[
      ChainType.L1[NETWORK_NAME]
    ] as `0x${string}`,
    abi: L1_ERC20_ABI,
  };

  const { data: l1LordsBalance, refetch: l1LordsRefetch } = useBalance({
    ...l1ERC20Contract,
    address: l1Account!,
    token: tokensConst.L1.LORDS.tokenAddress[
      ChainType.L1[NETWORK_NAME]
    ] as `0x${string}`,
  });

  const { data: l1EthBalance } = useBalance({
    address: l1Account!,
  });

  useEffect(() => {
    if (l1Account && l2Account) {
      setAccountHash(calcAccountHash(l1Account, l2Account));
    } else if (accountHash) {
      setAccountHash("");
    }
  }, [l1Account, l2Account]);

  const refetch = async () => {
    l2LordsRefetch;
    await l1LordsRefetch();
  };

  const value = {
    accountHash,
    tokens,
    // updateTokenBalance,
    l2loading: l2LordsIsLoading || l2EthIsLoading,
    refetch: refetch,
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
        lords: l2LordsBalance as bigint,
      },
    },
  };

  return (
    <WalletsProviderContext.Provider value={value}>
      {children}
    </WalletsProviderContext.Provider>
  );
};
