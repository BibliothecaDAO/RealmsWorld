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
import airdrop from "../constants/airdrop.json";

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

  const claim = async (amount: string, proof: string[]) => {
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

  const claimAirdrop = async (): Promise<void> => {
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
      await claim(numTokens, proof);

      //   await syncStatus();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`Error when claiming tokens: ${e}`);
    }
  };

  console.log(balance);

  const syncStatus = async () => {
    // Toggle loading
    setDataLoading(true);

    if (addressL1) {
      const tokens = getAirdropAmount(addressL1.toLowerCase());
      setNumTokens(tokens);
    }

    setDataLoading(false);
  };

  useEffect(() => {
    const sync = async () => {
      await syncStatus();
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressL1]);

  return {
    dataLoading,
    numTokens,
    claimAirdrop,
    balance,
  };
}
