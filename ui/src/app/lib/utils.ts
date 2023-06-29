import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { tokens } from '@/constants/tokens';
import { formatUnits } from 'viem'

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
