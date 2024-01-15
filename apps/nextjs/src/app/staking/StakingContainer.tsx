"use client";

import type { Realm } from "@/.graphclient";
import { useEffect, useState } from "react";
import { ERC721 } from "@/abi/L1/ERC721";
import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
import Lords from "@/icons/lords.svg";
import { getTokenContractAddresses } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@realms-world/ui";

import { PaymentPoolV2 } from "../_components/staking/PaymentPoolV2";
import { EthereumLoginButton } from "../_components/wallet/EthereumLoginButton";
import RealmsTable from "./RealmsTable";

const galleonAddress = stakingAddresses[NETWORK_NAME]
  .v1Galleon as `0x${string}`;
const carrackAddress = stakingAddresses[NETWORK_NAME]
  .v2Carrack as `0x${string}`;
const realmsAddress = getTokenContractAddresses("realms").L1;

export const StakingContainer = () => {
  const { address: addressL1 } = useAccount();
  const [hexProof, setHexProof] = useState();
  const [poolTotal, setPoolTotal] = useState<bigint>(0n);
  const [poolClaimAmount, setPoolClaimAmount] = useState<bigint>();

  const address = addressL1 ? addressL1.toLowerCase() : "0x";

  useEffect(() => {
    if (addressL1) {
      fetch(`/api/staking/${addressL1}`)
        .then((res) => res.json())
        .then((data) => {
          setHexProof(data.proof);
          setPoolTotal(parseEther(data.amount.toString()));
        });
    }
  }, [addressL1]);

  const { data: realmsData, isLoading: realmsDataIsLoading } = useQuery({
    queryKey: ["UsersRealms" + address],
    queryFn: async () =>
      await fetch(`/api/subgraph/getRealms?address=${address}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          return res.data;
        }),
    enabled: !!addressL1,
    refetchInterval: 10000,
  });

  const {
    data: lordsAvailableData,
    isError,
    isLoading: isGalleonLordsLoading,
  } = useReadContract({
    address: stakingAddresses[NETWORK_NAME].v1Galleon as `0x${string}`,
    abi: GalleonStaking,
    functionName: "lordsAvailable",
    args: [address as `0x${string}`],
  });
  const {
    data: galleonClaimData,
    isPending: isGalleonClaimLoading,
    writeContract: claimGalleonLords,
  } = useWriteContract();

  const { data: carrackLordsAvailableData, isLoading: isCarrackLordsLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].v2Carrack as `0x${string}`,
      abi: CarrackStaking,
      functionName: "lordsAvailable",
      args: [address as `0x${string}`],
    });

  const {
    data: carrackClaimData,
    isPending: isCarrackClaimLoading,
    writeContract: claimCarrackLords,
  } = useWriteContract();

  const {
    data: poolClaimData,
    isPending: isPoolClaimLoading,
    writeContract: claimPoolLords,
  } = useWriteContract();

  const {
    data: poolWithdrawlsData,
    isLoading: poolWithdrawalsLoading,
    isFetched,
  } = useReadContract({
    address: stakingAddresses[NETWORK_NAME].paymentPool as `0x${string}`,
    abi: paymentPoolAbi,
    functionName: "withdrawals",
    args: [address as `0x${string}`],
    query: { enabled: !!address && !!poolTotal },
  });

  useEffect(() => {
    if (isFetched && poolWithdrawlsData) {
      const claimable = poolTotal - poolWithdrawlsData;
      setPoolClaimAmount(claimable);
    }
  }, [isFetched]);

  if (!addressL1) {
    return (
      <div className="col-span-2 mx-auto mt-24 flex flex-col text-center">
        <h1>Realms (NFT) Staking for $LORDS rewards</h1>
        <h3 className="mb-12">Login to your Ethereum Wallet</h3>
        <EthereumLoginButton variant={"default"} />
      </div>
    );
  }
  return (
    <div className="text-center">
      <div className="col-span-2 flex flex-col ">
        <h3>Your Realms</h3>
        <div className="flex flex-col rounded border bg-dark-green pb-8 pt-6">
          {realmsDataIsLoading ? (
            "Loading"
          ) : (
            <>
              <span className="text-2xl">
                {realmsData?.wallet?.realmsHeld || 0}
              </span>
              <span className="mb-4">Realms Available</span>
              <StakingModal realms={realmsData?.realms} />
            </>
          )}
        </div>
      </div>
      <h3 className="mt-10">Rewards</h3>
      {/* <PaymentPoolV2 /> */}
      <h3 className="mt-10">Galleon</h3>
      <div className="flex-col pb-2 text-lg">
        <span className="bg-dark-green px-2 py-1">
          Rewards: 49x $LORDS per epoch (a bonus of 12% over Carrack)
        </span>
        <br />
        <span className="bg-dark-green px-2 py-1">
          Redemption: Lords are locked until DAO approves the migration to
          Starknet
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col justify-center rounded border bg-dark-green pb-8 pt-6">
          {realmsDataIsLoading ? (
            "Loading"
          ) : (
            <>
              <span className="text-2xl">
                {realmsData?.wallet?.bridgedRealmsHeld || 0}
              </span>
              <span className="mb-4">Realms Staked</span>
              <StakingModal
                unstake
                type="galleon"
                realms={realmsData?.bridgedRealms}
              />
            </>
          )}
        </div>
        <div className="flex flex-col rounded border bg-dark-green pb-8 pt-6">
          <span className="pb-4 text-lg">Lords Available</span>

          {!isGalleonLordsLoading && typeof lordsAvailableData == "bigint" ? (
            <div className="flex items-center justify-center">
              <span className="mr-6 text-sm">Epoch 1-10:</span>
              <span className="mr-3 flex">
                <Lords className="mr-2 h-5 w-5 fill-current" />
                {formatEther(lordsAvailableData)}
              </span>
              <Button
                disabled={
                  lordsAvailableData == 0n ||
                  isGalleonClaimLoading ||
                  isCarrackClaimLoading
                }
                size={"sm"}
                className="self-center"
                variant={"outline"}
                onClick={() =>
                  claimGalleonLords({
                    address: stakingAddresses[NETWORK_NAME]
                      .v1Galleon as `0x${string}`,
                    abi: GalleonStaking,
                    functionName: "claimLords",
                  })
                }
              >
                {isGalleonClaimLoading || isCarrackClaimLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Claiming
                  </>
                ) : (
                  "Claim"
                )}
              </Button>
            </div>
          ) : (
            "Loading"
          )}
          {!poolWithdrawalsLoading ? (
            <div className="mt-2 flex items-center justify-center">
              <span className="mr-6 text-sm">Epoch 11-35:</span>
              <span className="mr-3 flex">
                <Lords className="mr-2 h-5 w-5 fill-current" />
                {formatEther(poolClaimAmount ?? 0n).toLocaleString()} /{" "}
                {formatEther(poolTotal ?? 0n).toLocaleString() ?? 0n}
              </span>
              <Button
                disabled={
                  !poolClaimAmount ||
                  poolClaimAmount == 0n ||
                  isPoolClaimLoading
                }
                size={"sm"}
                className="self-center"
                variant={"outline"}
                onClick={() =>
                  claimPoolLords({
                    address: stakingAddresses[NETWORK_NAME]
                      .paymentPool as `0x${string}`,
                    abi: paymentPoolAbi,
                    functionName: "withdraw",
                    args: [
                      parseEther(poolClaimAmount?.toString() ?? "0"),
                      hexProof as any,
                    ],
                  })
                }
              >
                {isPoolClaimLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Claiming
                  </>
                ) : (
                  "Claim"
                )}
              </Button>
            </div>
          ) : (
            "Loading"
          )}
          <span className="mt-3 text-sm">
            Epoch 35+: <span className="ml-3">Future claim on Starknet</span>
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <h3>Carrack</h3>
        <div className="pb-2 text-lg">
          <span className="bg-dark-green px-2 py-1">
            Rewards: 43.75x $LORDS per epoch.
          </span>
          <br />
          <span className="bg-dark-green px-2 py-1">
            Claim: After each epoch (Realm must be staked for full epoch [1
            week]).
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col justify-center rounded border bg-dark-green pb-8 pt-6">
            {realmsDataIsLoading ? (
              "Loading"
            ) : (
              <>
                <span className="text-2xl">
                  {realmsData?.wallet?.bridgedV2RealmsHeld || 0}
                </span>
                <span className="mb-4">Staked Realms:</span>
                <StakingModal
                  unstake
                  type="carrack"
                  realms={realmsData?.bridgedV2Realms}
                />
              </>
            )}
          </div>
          <div className="flex flex-col rounded border bg-dark-green pb-8 pt-6">
            <span className="pb-4 text-lg">Lords Available</span>

            {isCarrackLordsLoading ? (
              "Loading"
            ) : (
              <>
                <span className="flex justify-center text-2xl">
                  <Lords className="mr-2 h-8 w-8 fill-current" />
                  {formatEther(carrackLordsAvailableData?.[0] || 0n)}
                </span>
                <span className="mb-4 text-sm">Epoch 35+</span>

                <Button
                  size={"lg"}
                  disabled={
                    !carrackLordsAvailableData?.[0] ||
                    carrackLordsAvailableData?.[0] == 0n
                  }
                  className="self-center"
                  variant={"outline"}
                  onClick={() =>
                    claimCarrackLords({
                      address: stakingAddresses[NETWORK_NAME]
                        .v2Carrack as `0x${string}`,
                      abi: CarrackStaking,
                      functionName: "claimLords",
                    })
                  }
                >
                  Claim
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StakingModal = ({
  realms,
  unstake,
  type,
}: {
  realms?: Pick<Realm, "id" | "name">[];
  unstake?: boolean;
  type?: "galleon" | "carrack";
}) => {
  const [shipType, setShipType] = useState<"galleon" | "carrack">();
  const [selectedRealms, setSelectedRealms] = useState<readonly string[]>([]);
  const { address } = useAccount();

  const { writeContractAsync: boardGalleon, isPending: isBoardGalleonPending } =
    useWriteContract();
  const { writeContractAsync: boardCarrack, isPending: isBoardCarrackPending } =
    useWriteContract();
  const { writeContractAsync: exitGalleon, isPending: isExitGalleonPending } =
    useWriteContract();
  const { writeContractAsync: exitCarrack, isPending: isExitCarrackPending } =
    useWriteContract();
  const {
    writeContractAsync: approveGalleon,
    isPending: isGalleonApproveLoading,
    data: approveGalleonData,
  } = useWriteContract();
  const { writeContractAsync: approveCarrack, data: approveCarrackData } =
    useWriteContract();
  const { data: isCarrackApprovedData, refetch: refetchCarrackApprovedData } =
    useReadContract({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "isApprovedForAll",
      args: [address, carrackAddress],
    });
  const { data: isGalleonApprovedData, refetch: refetchGalleonApprovedData } =
    useReadContract({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "isApprovedForAll",
      args: [address, galleonAddress],
    });

  const { data: approvedTransactionData, isSuccess } =
    useWaitForTransactionReceipt({
      hash: approveCarrackData ?? approveGalleonData,
    });

  useEffect(() => {
    refetchCarrackApprovedData(), refetchGalleonApprovedData();
  }, [isSuccess]);

  const isApproved =
    shipType === "galleon" ? isGalleonApprovedData : isCarrackApprovedData;

  const onApproveClick = async () => {
    const approvalFunction =
      shipType === "galleon"
        ? approveGalleon({
            address: realmsAddress as `0x${string}`,
            abi: ERC721,
            functionName: "setApprovalForAll",
            args: [galleonAddress, true],
          })
        : approveCarrack({
            address: realmsAddress as `0x${string}`,
            abi: ERC721,
            functionName: "setApprovalForAll",
            args: [carrackAddress, true],
          });

    if (!isApproved) {
      await approvalFunction;
    }
  };
  const onButtonClick = async () => {
    if (!unstake) {
      const boardingFunction =
        shipType === "galleon"
          ? boardGalleon({
              address: galleonAddress,
              abi: GalleonStaking,
              functionName: "boardShip",
              args: [selectedRealms.map(BigInt)],
            })
          : boardCarrack({
              address: carrackAddress,
              abi: CarrackStaking,
              functionName: "boardShip",
              args: [selectedRealms.map(BigInt)],
            });
      await boardingFunction;
    } else {
      const exitFunction =
        shipType === "galleon"
          ? exitGalleon({
              address: galleonAddress,
              abi: GalleonStaking,
              functionName: "exitShip",
              args: [selectedRealms.map(BigInt)],
            })
          : exitCarrack({
              address: carrackAddress,
              abi: CarrackStaking,
              functionName: "exitShip",
              args: [selectedRealms.map(BigInt)],
            });
      await exitFunction;
    }
    setSelectedRealms([]);
  };
  const isPending =
    isGalleonApproveLoading ||
    isExitGalleonPending ||
    isExitCarrackPending ||
    isBoardCarrackPending ||
    isBoardGalleonPending;

  const onSelectRealms = (realms: any) => {
    setSelectedRealms(realms);
  };
  useEffect(() => {
    if (type) {
      setShipType(type);
    }
  }, [type]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!realms?.length}
          className="self-center"
          size={"lg"}
          variant={"outline"}
        >
          {unstake ? "Unstake" : "Stake"} Realms
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-full w-full sm:!max-h-[720px]">
        <DialogHeader>
          <h6 className="my-0 py-0">
            {unstake ? "Exit" : "Board"} the{" "}
            <span className="capitalize">{shipType ?? "Ship"}</span>
          </h6>
        </DialogHeader>
        {shipType && realms ? (
          <>
            <div className="flex flex-col self-center">
              <RealmsTable
                realms={realms}
                selectedRealms={selectedRealms}
                onSelectRealms={onSelectRealms}
              />
            </div>
            {!unstake && !isApproved ? (
              <Button onClick={onApproveClick} size={"lg"}>
                Approve Realm Staking Contract
              </Button>
            ) : (
              <Button onClick={onButtonClick} disabled={isPending} size={"lg"}>
                {isPending && <Loader className="mr-2 animate-spin" />}
                {unstake ? "Unstake" : "Stake"} Realms
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col self-center">
            <h5>The Galleon</h5>
            <div className="pb-2 text-lg">
              Rewards: 49x $LORDS per epoch (a bonus of 12% over Carrack).
            </div>
            <Alert
              message={
                "Lords earnt after epoch 35 are locked until the DAO approves the migration to Starknet."
              }
              variant="warning"
            />
            <Button
              className="my-3"
              onClick={() => setShipType("galleon")}
              variant={"outline"}
            >
              Board The Galleon
            </Button>
            <h5>The Galleon</h5>
            <div className="pb-2 text-lg">
              Rewards: 43.75x $LORDS per epoch.
            </div>
            <div className="pb-2 text-lg">
              Claim: After each epoch (Realm must be staked for full epoch).
            </div>
            <Button onClick={() => setShipType("carrack")} variant={"outline"}>
              Board The Carrack
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
