import { NETWORK_NAME } from "@/constants/env";
import { erc721Tokens } from "@/constants/erc721Tokens";
import { ChainType, tokens } from "@/constants/tokens";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEth = (symbol: string) => {
  return symbol === tokens.L1.ETH.symbol;
};

export const formatBigInt = (
  value: bigint,
  displayDecimals = 18,
  decimals = 18,
): string => {
  const remainder = value % 10n ** BigInt(decimals - displayDecimals);

  return formatUnits(value - remainder, decimals);
};

export function padAddress(address: string) {
  if (address !== "") {
    const length = address.length;
    const neededLength = 66 - length;
    let zeros = "";
    for (let i = 0; i < neededLength; i++) {
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
    L2: erc721Tokens[name]?.contractAddresses.L2?.[ChainType.L2[NETWORK_NAME]],
  };
}
export function shortenHex(hexString: string, numDigits = 6) {
  if (hexString.length <= numDigits) {
    return hexString;
  }

  const halfDigits = Math.floor(numDigits / 2);
  const firstHalf = hexString.slice(0, halfDigits);
  const secondHalf = hexString.slice(-halfDigits);
  return `${firstHalf}...${secondHalf}`;
}

export function buildQueryString(queryObject: any) {
  const queryParams = Object.entries(queryObject)
    .map(([key, value]: any) => {
      if (typeof value === "object") {
        return Object.entries(value)
          .map(
            ([subKey, subValue]: any) =>
              `${encodeURIComponent(key)}[${encodeURIComponent(
                subKey,
              )}]=${encodeURIComponent(subValue)}`,
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&")
    .replace(/%2B/g, "+");

  return `${queryParams}`;
}

export function formatQueryString(querybatch: any, type = "contract") {
  if (querybatch && Array.isArray(querybatch) && querybatch.length > 0) {
    const queryString = querybatch
      .map((contractObj) => `${type}=${contractObj[type]}`)
      .join("&");
    return queryString;
  }
  return "";
}

export const isStarknetAddress = (address: string) => {
  return address.length == 66;
};
