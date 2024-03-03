/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type { Realm } from "@/.graphclient";
import { useEffect, useState } from "react";
import { ERC721 } from "@/abi/L1/ERC721";
import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { NETWORK_NAME, SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
import Lords from "@/icons/lords.svg";
import { useQuery } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
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
const realmsAddress = getCollectionAddresses(Collections.REALMS)[
  SUPPORTED_L1_CHAIN_ID
];

export const StakingContainer = () => {
  const { address: addressL1, isConnected } = useAccount();
  const [hexProof, setHexProof] = useState<`0x${string}` | undefined>();
  const [poolTotal, setPoolTotal] = useState<bigint>();
  const address = addressL1 ? addressL1.toLowerCase() : "0x";

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

  const { data: lordsAvailableData, isLoading: isGalleonLordsLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].v1Galleon as `0x${string}`,
      abi: GalleonStaking,
      functionName: "lordsAvailable",
      args: [address as `0x${string}`],
    });

  const { isPending: isGalleonClaimLoading, writeContract: claimGalleonLords } =
    useWriteContract();

  const { data: carrackLordsAvailableData, isLoading: isCarrackLordsLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].v2Carrack as `0x${string}`,
      abi: CarrackStaking,
      functionName: "lordsAvailable",
      args: [address as `0x${string}`],
    });

  const { isPending: isCarrackClaimLoading, writeContract: claimCarrackLords } =
    useWriteContract();

  const {
    isPending: isPoolClaimLoading,
    writeContract: claimPoolLords,
    error: poolClaimError,
  } = useWriteContract();

  const { data: poolBalanceData, isLoading: poolBalanceLoading } =
    useReadContract({
      address: stakingAddresses[NETWORK_NAME].paymentPool as `0x${string}`,
      abi: paymentPoolAbi,
      functionName: "balanceForProofWithAddress",
      args: hexProof &&
        addressL1 && [addressL1.toLowerCase() as `0x${string}`, hexProof],
      // query: { enabled: !!address && !!poolTotal }
    });
  useEffect(() => {
    const fetchStakingData = async () => {
      if (addressL1) {
        try {
          const response = await fetch(`/api/staking/${addressL1}`);
          const data: { proof: `0x${string}`; amount: number } =
            await response.json();
          setHexProof(data.proof);
          if (data.amount) {
            setPoolTotal(parseEther(data.amount.toString()));
          } else {
            setPoolTotal(0n);
          }
        } catch (error) {
          console.error("Error fetching staking data:", error);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchStakingData();
  }, [addressL1]);

  if (isConnected && addressL1) {
    return (
      <div className="text-center">
        {poolClaimError && (
          <Alert
            message={poolClaimError.message.toString()}
            variant="warning"
          />
        )}
        <div className="col-span-2 flex flex-col ">
          <h3>Your Realms</h3>
          <div className="flex flex-col rounded border bg-dark-green pb-8 pt-6">
            {realmsDataIsLoading ? (
              "Loading"
            ) : (
              <>
                <span className="text-2xl">
                  {realmsData?.wallet?.realmsHeld ?? 0}
                </span>
                <span className="mb-4">Realms Available</span>
                <StakingModal realms={realmsData?.realms} />
              </>
            )}
          </div>
        </div>
        <h3 className="mt-10">Epoch 35-109 Rewards</h3>
        <PaymentPoolV2 />
        <h3 className="mt-10">Galleon</h3>
        <div className="flex-col pb-2 text-lg">
          <span className="bg-dark-green px-2 py-1">
            Rewards: 49x $LORDS per epoch
          </span>
          <br />
          <span className="bg-dark-green px-2 py-1">
            Redemption: Claimable after each fully staked epoch (1 week)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col justify-center rounded border bg-dark-green pb-8 pt-6">
            {realmsDataIsLoading ? (
              "Loading"
            ) : (
              <>
                <span className="text-2xl">
                  {realmsData?.wallet?.bridgedRealmsHeld ?? 0}
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
            {!poolBalanceLoading ? (
              <div className="mt-2 flex items-center justify-center">
                <span className="mr-6 text-sm">Epoch 11-35:</span>
                <span className="mr-3 flex">
                  <Lords className="mr-2 h-5 w-5 fill-current" />
                  {poolBalanceLoading ? (
                    <Loader className="h-5 w-5" />
                  ) : poolBalanceData != undefined && poolTotal ? (
                    <>
                      {formatEther(poolBalanceData).toLocaleString()} /{" "}
                      {formatEther(poolTotal ?? 0n).toLocaleString() ?? 0n}
                    </>
                  ) : (
                    0
                  )}
                </span>
                {poolBalanceData != undefined && (
                  <Button
                    disabled={!poolBalanceData || poolBalanceData == 0n}
                    size={"sm"}
                    className="self-center"
                    variant={"outline"}
                    onClick={() => {
                      claimPoolLords({
                        address: stakingAddresses[NETWORK_NAME]
                          .paymentPool as `0x${string}`,
                        abi: paymentPoolAbi,
                        functionName: "withdraw",
                        args: [poolBalanceData, hexProof!],
                      });
                    }}
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
                )}
              </div>
            ) : (
              "Loading"
            )}
          </div>
        </div>
        {realmsData?.bridgedV2Realms.length ??
        (carrackLordsAvailableData && carrackLordsAvailableData?.[0] > 0n) ? (
          <div className="mt-10 flex flex-col">
            <h3>Carrack</h3>
            <div className="pb-2 text-lg">
              <span className="bg-dark-green px-2 py-1">
                Rewards: 49x $LORDS per epoch
              </span>
              <br />
            </div>

            <div className="mt-10 flex flex-col">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col justify-center rounded border bg-dark-green pb-8 pt-6">
                  {realmsDataIsLoading ? (
                    "Loading"
                  ) : (
                    <>
                      <span className="text-2xl">
                        {realmsData?.wallet?.bridgedV2RealmsHeld ?? 0}
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
                        {formatEther(carrackLordsAvailableData?.[0] ?? 0n)}
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
        ) : null}
      </div>
    );
  }
  return (
    <div className="col-span-2 mx-auto mt-24 flex flex-col text-center">
      <h1>Realms (NFT) Staking for $LORDS rewards</h1>
      <h3 className="mb-12">Login to your Ethereum Wallet</h3>
      <EthereumLoginButton variant={"default"} />
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
  const { writeContractAsync: exitGalleon, isPending: isExitGalleonPending } =
    useWriteContract();
  const { writeContractAsync: exitCarrack, isPending: isExitCarrackPending } =
    useWriteContract();
  const {
    writeContractAsync: approveGalleon,
    isPending: isGalleonApproveLoading,
    data: approveGalleonData,
  } = useWriteContract();
  const { data: isGalleonApprovedData, refetch: refetchGalleonApprovedData } =
    useReadContract({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "isApprovedForAll",
      args: [address!, galleonAddress],
    });

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: approveGalleonData,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetchGalleonApprovedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const isApproved = isGalleonApprovedData;

  const onApproveClick = async () => {
    if (!isApproved) {
      await approveGalleon({
        address: realmsAddress as `0x${string}`,
        abi: ERC721,
        functionName: "setApprovalForAll",
        args: [galleonAddress, true],
      });
    }
  };
  const onButtonClick = async () => {
    if (!unstake) {
      await boardGalleon({
        address: galleonAddress,
        abi: GalleonStaking,
        functionName: "boardShip",
        args: [selectedRealms.map(BigInt)],
      });
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
    isBoardGalleonPending;

  const onSelectRealms = (realms: readonly string[]) => {
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
            <div className="pb-2 text-lg">Rewards: 49x $LORDS per epoch.</div>
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
