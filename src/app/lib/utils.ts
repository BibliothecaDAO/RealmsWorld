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
  const remainder = value % 10n ** BigInt(decimals - displayDecimals)

  const formatted = formatUnits(value - remainder, decimals)
  return formatted
}