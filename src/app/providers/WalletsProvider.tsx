"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { hash, number } from "starknet";
import { useAccount as useL1Account } from "wagmi";
import {
  useAccount as useL2Account,
  useConnectors,
} from "@starknet-react/core";

// Define the UI context's shape
interface WalletsProviderContextValue {
  accountHash: string;
  //toggleSidebar: () => void;
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

// UI Context Provider component
interface WalletsContextProviderProps {
  children: ReactNode;
}

export const WalletsProvider: React.FC<WalletsContextProviderProps> = ({
  children,
}) => {
  const [accountHash, setAccountHash] = useState("");
  const calcAccountHash = (account1: string, account2: string) => {
    return hash.computeHashOnElements([
      number.toBN(account1).toString(),
      number.toBN(account2).toString(),
    ]);
  };

  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useL2Account();

  useEffect(() => {
    //TODO account change not triggered by starknet-react
    console.log(l2Account);
    if (l1Account && l2Account) {
      console.log(calcAccountHash(l1Account, l2Account));
      setAccountHash(calcAccountHash(l1Account, l2Account));
    } else if (accountHash) {
      setAccountHash("");
    }
  }, [accountHash, l1Account, l2Account]);

  const value = {
    accountHash,
  };

  return (
    <WalletsProviderContext.Provider value={value}>
      {children}
    </WalletsProviderContext.Provider>
  );
};
