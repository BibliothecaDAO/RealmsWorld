import type { Web3Provider } from "@ethersproject/providers";
import { Proposal } from "@/types";
import { getAddress } from "@ethersproject/address";
import { validateAndParseAddress } from "starknet";

const IPFS_GATEWAY: string =
  import.meta.env.VITE_IPFS_GATEWAY || "https://cloudflare-ipfs.com";

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
