import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChainType, tokens } from '@/constants/tokens';
import { formatUnits } from 'viem'
import { erc721Tokens } from "@/constants/erc721Tokens";
import { NETWORK_NAME } from "@/constants/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEth = (symbol: string) => {
  return symbol === tokens.L1.ETH.symbol;
};

export const formatBigInt = (value: bigint, displayDecimals = 18, decimals = 18): string => {
  const remainder = value % (10n ** BigInt(decimals - displayDecimals));

  return formatUnits(value - remainder, decimals);;
};

export function padAddress(address: string) {
  if (address !== "") {
    const length = address.length;
    const neededLength = 66 - length;
    let zeros = "";
    for (var i = 0; i < neededLength; i++) {
      zeros += "0";
    }
    const newHex = address.substring(0, 2) + zeros + address.substring(2);
    return newHex;
  } else {
    return "";
  }
}

export function getTokenContractAddresses(name: keyof typeof erc721Tokens) {
  return {
    L1: erc721Tokens[name]?.contractAddresses.L1?.[ChainType.L1[NETWORK_NAME]],
    L2: erc721Tokens[name]?.contractAddresses.L2?.[ChainType.L2[NETWORK_NAME]]
  }
}