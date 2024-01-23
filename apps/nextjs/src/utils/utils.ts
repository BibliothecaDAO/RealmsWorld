import type { ERC721Tokens } from "@/constants/erc721Tokens";
import { NETWORK_NAME } from "@/constants/env";
import { erc721Tokens } from "@/constants/erc721Tokens";
import { ChainType, tokens } from "@/constants/tokens";
import { formatUnits } from "viem";

import type { RouterOutputs } from "@realms-world/api";

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

export function padAddress(address?: string) {
  if (address) {
    const length = address.length;
    const neededLength = 66 - length;
    let zeros = "";
    for (let i = 0; i < neededLength; i++) {
      zeros += "0";
    }
    const newHex = address?.substring(0, 2) + zeros + address.substring(2);
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

export function findTokenName(contractAddress?: string): string {
  for (const tokenName in erc721Tokens) {
    const contractAddresses =
      erc721Tokens[tokenName as keyof ERC721Tokens].contractAddresses;

    for (const chainType in contractAddresses) {
      const addresses = contractAddresses[chainType as keyof typeof ChainType];

      for (const chainName in addresses) {
        if (addresses[chainName] === contractAddress) {
          return tokenName;
        }
      }
    }
  }
  return contractAddress; // Return null if the contract address is not found in the object for the specified network type
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

export function isStarknetAddress(address: string) {
  return address?.length == 66 || address.length == 65;
}

export const isBrowserLocaleClockType24h = () => {
  const language =
    typeof window !== "undefined" ? window.navigator.language : "en-US";

  const hr = new Intl.DateTimeFormat(language, {
    hour: "numeric",
  }).format();

  return Number.isInteger(Number(hr));
};

export function getTokenName(
  tokenDetails: RouterOutputs["erc721Tokens"]["all"]["items"][number],
) {
  if (!tokenDetails) {
    return "Invalid token details";
  }

  return tokenDetails.name
    ? decodeURIComponent(tokenDetails.name)
    : `#${tokenDetails.token_id}`;
}
