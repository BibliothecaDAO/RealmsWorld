import { useEffect, useState } from "react"; // React

import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
import { getAddress, parseUnits, solidityPackedKeccak256 } from "ethers"; // Ethers
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import {
  useAccount as useL1Account,
  useReadContract,
  useWriteContract,
} from "wagmi";

import abi from "../abi/L1/MerkleClaim.json";

const config = {
  decimals: 18,
  airdrop: {
    "0xedb229008E8876e0E4ADb08075D8F8B31630241C": 10,
    "0x4e7Cdd4F96a9720DC6379C24fe78879eAD04b070": 100,
  },
};

function generateLeaf(address: string, value: string): Buffer {
  return Buffer.from(
    // Hash in appropriate Merkle format
    solidityPackedKeccak256(["address", "uint256"], [address, value]).slice(2),
    "hex",
  );
}

// Setup merkle tree
const merkleTree = new MerkleTree(
  // Generate leafs
  Object.entries(config.airdrop).map(([address, tokens]: any) =>
    generateLeaf(
      getAddress(address),
      parseUnits(tokens.toString(), config.decimals).toString(),
    ),
  ),
  // Hashing function
  keccak256,
  { sortPairs: true },
);

export function useAirdropClaim() {
  const { address: addressL1 } = useL1Account();

  const { data: hash, writeContract } = useWriteContract();

  const [dataLoading, setDataLoading] = useState<boolean>(true); // Data retrieval status
  const [numTokens, setNumTokens] = useState<number>(0); // Number of claimable tokens
  const [alreadyClaimed, setAlreadyClaimed] = useState<boolean>(false); // Claim status

  const claim = async (amount: any, proof: any) => {
    return writeContract({
      address: stakingAddresses[NETWORK_NAME].paymentPoolV2 as `0x${string}`,
      abi: abi.abi,
      functionName: "claim",
      args: [],
    });
  };

  const getAirdropAmount = (address: string): number => {
    if (address in config.airdrop) {
      // Return number of tokens available
      return config.airdrop[address];
    }

    // Else, return 0 tokens
    return 0;
  };

  const getClaimedStatus = async (address: string): Promise<boolean> => {
    // Collect token contract
    const { data: balance } = useReadContract({
      address: stakingAddresses[NETWORK_NAME].paymentPoolV2 as `0x${string}`,
      abi: abi.abi,
      functionName: "hasClaimed",
      args: ["0x03A71968491d55603FFe1b11A9e23eF013f75bCF"],
    });
    // Return claimed status
    return balance.toString();
  };

  const claimAirdrop = async (): Promise<void> => {
    // If not authenticated throw
    if (!addressL1) {
      throw new Error("Not Authenticated");
    }

    // Get properly formatted address
    const formattedAddress: string = getAddress(addressL1);
    // Get tokens for address
    const numTokens: string = parseUnits(
      config.airdrop[getAddress(address)].toString(),
      config.decimals,
    ).toString();

    // Generate hashed leaf from address
    const leaf: Buffer = generateLeaf(formattedAddress, numTokens);
    // Generate airdrop proof
    const proof: string[] = merkleTree.getHexProof(leaf);

    // Try to claim airdrop and refresh sync status
    try {
      await claim(numTokens, proof);

      //   await syncStatus();
    } catch (e) {
      console.error(`Error when claiming tokens: ${e}`);
    }
  };

  /**
   * After authentication, update number of tokens to claim + claim status
   */
  const syncStatus = async (): Promise<void> => {
    // Toggle loading
    setDataLoading(true);

    // Force authentication
    if (addressL1) {
      // Collect number of tokens for address
      const tokens = getAirdropAmount(addressL1);
      setNumTokens(tokens);

      // Collect claimed status for address, if part of airdrop (tokens > 0)
      if (tokens > 0) {
        const claimed = await getClaimedStatus(addressL1);
        setAlreadyClaimed(claimed);
      }
    }

    // Toggle loading
    setDataLoading(false);
  };

  // On load:
  useEffect(() => {
    syncStatus();
  }, [addressL1]);

  return {
    dataLoading,
    numTokens,
    alreadyClaimed,
    claimAirdrop,
  };
}
