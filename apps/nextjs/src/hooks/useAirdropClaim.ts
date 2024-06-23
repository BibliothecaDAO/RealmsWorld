import { useEffect, useState } from "react"; // React

import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
//import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { encodePacked, getAddress, keccak256, parseUnits } from "viem"; // Ethers

import {
  useAccount as useL1Account,
  useReadContract,
  useWriteContract,
} from "wagmi";

import abi from "../abi/L1/MerkleClaim.json";
import airdrop from "../constants/airdrop.json";

function generateLeaf(address: string, value: string): Buffer {
  return Buffer.from(
    // Hash in appropriate Merkle format
    keccak256(encodePacked(["address", "uint256"], [address, value])).slice(2),
    "hex",
  );
}

// Setup merkle tree
const merkleTree = new MerkleTree(
  // Generate leafs
  Object.entries(airdrop.airdrop).map(([address, tokens]) =>
    generateLeaf(
      getAddress(address),
      parseUnits(tokens.toString(), airdrop.decimals).toString(),
    ),
  ),
  // Hashing function
  keccak256,
  { sortPairs: true },
);

export function useAirdropClaim() {
  const { address: addressL1 } = useL1Account();

  const { writeContract } = useWriteContract();

  const [dataLoading, setDataLoading] = useState<boolean>(true); // Data retrieval status
  const [numTokens, setNumTokens] = useState<number>(0); // Number of claimable tokens

  const claim = (amount: string, proof: string[]) => {
    return writeContract({
      address: stakingAddresses[NETWORK_NAME].paymentPoolV2 as `0x${string}`,
      abi: abi.abi,
      functionName: "claim",
      args: [amount, proof],
    });
  };

  const getAirdropAmount = (address: string): number => {
    if (address in airdrop.airdrop) {
      // Return number of tokens available
      return airdrop.airdrop[address as keyof typeof airdrop.airdrop];
    }

    // Else, return 0 tokens
    return 0;
  };

  const { data: balance } = useReadContract({
    address: stakingAddresses[NETWORK_NAME].paymentPoolV2 as `0x${string}`,
    abi: abi.abi,
    functionName: "hasClaimed",
    args: [addressL1?.toLowerCase()],
  });

  const claimAirdrop = (): void => {
    if (!addressL1) {
      throw new Error("Not Authenticated");
    }

    const formattedAddress = getAddress(addressL1).toLowerCase();

    console.log(formattedAddress);

    // Get tokens for address
    const numTokens: string = parseUnits(
      airdrop.airdrop[
        formattedAddress as keyof typeof airdrop.airdrop
      ].toString(),
      airdrop.decimals,
    ).toString();

    // Generate hashed leaf from address
    const leaf: Buffer = generateLeaf(formattedAddress, numTokens);

    // Generate airdrop proof
    const proof: string[] = merkleTree.getHexProof(leaf);

    // Try to claim airdrop and refresh sync status
    try {
      claim(numTokens, proof);

      //   await syncStatus();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Error when claiming tokens: ${e}`);
    }
  };

  useEffect(() => {
    setDataLoading(true);

    if (addressL1) {
      const tokens = getAirdropAmount(addressL1.toLowerCase());
      setNumTokens(tokens);
    }

    setDataLoading(false);
  }, [addressL1]);

  return {
    dataLoading,
    numTokens,
    claimAirdrop,
    balance,
  };
}
