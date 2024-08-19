import type { Web3Provider } from "@ethersproject/providers";
import { MAX_SYMBOL_LENGTH } from "@/data/constants";
import type { Proposal } from "@/types";
import { getAddress } from "@ethersproject/address";
import { validateAndParseAddress } from "starknet";

const IPFS_GATEWAY: string =
  import.meta.env.VITE_IPFS_GATEWAY || "https://cloudflare-ipfs.com";

export function shorten(
  str: string,
  key?: number | "symbol" | "name" | "choice",
): string {
  if (!str) return str;
  let limit;
  if (typeof key === "number") limit = key;
  if (key === "symbol") limit = MAX_SYMBOL_LENGTH;
  if (key === "name") limit = 64;
  if (key === "choice") limit = 12;
  if (limit)
    return str.length > limit ? `${str.slice(0, limit).trim()}...` : str;
  return shortenAddress(str);
}

export function shortenAddress(str = "") {
  const formatted = formatAddress(str);

  return `${formatted.slice(0, 6)}...${formatted.slice(formatted.length - 4)}`;
}
export function formatAddress(address: string) {
  if (address.length === 42) return getAddress(address);
  try {
    return validateAndParseAddress(address);
  } catch {
    return address;
  }
}
export function getUrl(uri: string) {
  const ipfsGateway = `https://${IPFS_GATEWAY}`;
  if (!uri) return null;
  if (
    !uri.startsWith("ipfs://") &&
    !uri.startsWith("ipns://") &&
    !uri.startsWith("https://") &&
    !uri.startsWith("http://")
  ) {
    return `${ipfsGateway}/ipfs/${uri}`;
  }

  const uriScheme = uri.split("://")[0];
  if (uriScheme === "ipfs")
    return uri.replace("ipfs://", `${ipfsGateway}/ipfs/`);
  if (uriScheme === "ipns")
    return uri.replace("ipns://", `${ipfsGateway}/ipns/`);
  return uri;
}
export function getProposalId(proposal: Proposal) {
  const proposalId = proposal.proposal_id.toString();

  if (proposalId.startsWith("0x")) {
    return `#${proposalId.slice(2, 7)}`;
  }

  if ([46, 59].includes(proposalId.length)) {
    return `#${proposalId.slice(-5)}`;
  }

  return `#${proposalId}`;
}
export async function verifyNetwork(
  web3Provider: Web3Provider,
  chainId: number,
) {
  if (!web3Provider.provider.request) return;

  const network = await web3Provider.getNetwork();
  if (network.chainId === chainId) return;

  const encodedChainId = `0x${chainId.toString(16)}`;

  try {
    await web3Provider.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: encodedChainId }],
    });
  } catch (err) {
    //@ts-expect-error
    if (err.code !== 4902) throw new Error(err.message);

    const network = await web3Provider.getNetwork();
    if (network.chainId !== chainId) {
      const error = new Error(
        "User rejected network change after it being added",
      );
      (error as any).code = 4001;
      throw error;
    }
  }
}
export function _rt(date: number) {
  const seconds = Math.floor(new Date().getTime() / 1000 - date);
  const years = Math.floor(seconds / 31536000);
  const months = Math.floor(seconds / 2592000);
  const days = Math.floor(seconds / 86400);
  if (days > 548) {
    return years + " years ago";
  }
  if (days >= 320 && days <= 547) {
    return "a year ago";
  }
  if (days >= 45 && days <= 319) {
    return months + " months ago";
  }
  if (days >= 26 && days <= 45) {
    return "a month ago";
  }

  const hours = Math.floor(seconds / 3600);

  if (hours >= 36 && days <= 25) {
    return days + " days ago";
  }
  if (hours >= 22 && hours <= 35) {
    return "a day ago";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes >= 90 && hours <= 21) {
    return hours + " hours ago";
  }
  if (minutes >= 45 && minutes <= 89) {
    return "an hour ago";
  }
  if (seconds >= 90 && minutes <= 44) {
    return minutes + " minutes ago";
  }
  if (seconds >= 45 && seconds <= 89) {
    return "a minute ago";
  }
  if (seconds >= 0 && seconds <= 45) {
    return "a few seconds ago";
  }
}
