"use client";
import { getBuiltGraphSDK, Realm, UsersRealmsQuery } from "@/.graphclient";
import { useQuery } from "@tanstack/react-query";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { stakingAddresses } from "@/constants/staking";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { ERC721 } from "@/abi/L1/ERC721";
import { realms } from "@/constants/whiteListedContracts";

import { formatEther } from "viem";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import RealmsTable from "./RealmsTable";
import Lords from "@/icons/lords.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Info } from "lucide-react";
import { Alert } from "../components/ui/alert";
import { useEffect, useState } from "react";
import EthereumLogin from "../components/wallet/EthereumLogin";
import Link from "next/link";

const network =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
const galleonAddress = stakingAddresses[network].v1Galleon;
const carrackAddress = stakingAddresses[network].v2Carrack;
const realmsAddress = realms[network];

export const StakingContainer = () => {
  const { address: addressL1 } = useAccount();
  const sdk = getBuiltGraphSDK({
    realmsSubgraph: process.env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME,
  });
  const address = addressL1 ? addressL1.toLowerCase() : "0x";

  const { data: realmsData, isLoading: realmsDataIsLoading } = useQuery({
    queryKey: ["UsersRealms" + address],
    queryFn: () => sdk.UsersRealms({ address, addressId: address }),
    enabled: !!address,
    refetchInterval: 10000,
  });
  const { data: totalStakedRealmsData } = useQuery({
    queryKey: ["StakedRealmsTotal"],
    queryFn: () =>
      sdk.WalletsRealms({ addresses: [galleonAddress, carrackAddress] }),
    enabled: !!address,
  });
  const totalStakedRealms = totalStakedRealmsData?.wallets.reduce(
    (total, wallet) => {
      return total + parseInt(wallet.realmsHeld, 10);
    },
    0
  );
  const {
    data: lordsAvailableData,
    isError,
    isLoading: isGalleonLordsLoading,
  } = useContractRead({
    address: stakingAddresses[network].v1Galleon as `0x${string}`,
    abi: GalleonStaking,
    functionName: "lordsAvailable",
    args: [address as `0x${string}`],
  });

  const { data: carrackLordsAvailableData, isLoading: isCarrackLordsLoading } =
    useContractRead({
      address: stakingAddresses[network].v2Carrack as `0x${string}`,
      abi: CarrackStaking,
      functionName: "lordsAvailable",
      args: [address as `0x${string}`],
    });

  if (!addressL1) {
    return (
      <div className="max-w-xl m-auto mt-24">
        <h1>Realms Staking</h1>
        <h3 className="mb-12">Login to your Ethereum Wallet</h3>
        <EthereumLogin />
      </div>
    );
  }
  return (
    <div className="sm:max-w-3xl mx-auto mt-24">
      <div className="grid grid-cols-2 gap-6 text-center">
        <div className="flex flex-col col-span-2 ">
          <h3>Your Realms</h3>
          <div className="border rounded pt-6 pb-8 flex flex-col">
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

        <div className="flex flex-col">
          <Tooltip>
            <TooltipTrigger className="flex justify-center">
              <h3>Galleon</h3>
              <Info className="w-5 h-5 mt-2 ml-2" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-lg pb-2">
                Rewards: 49x $LORDS per epoch (a bonus of 12% over Carrack).
              </div>
              <Alert
                message={
                  "Lords earnt after epoch 35 are locked until the DAO approves the migration to Starknet."
                }
                variant="warning"
              />
            </TooltipContent>
          </Tooltip>
          <div className="border rounded pt-6 pb-8 flex flex-col">
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
          <div className="border rounded pt-6 pb-8 flex flex-col mt-6">
            {!isGalleonLordsLoading && typeof lordsAvailableData == "bigint" ? (
              <>
                <span className="text-2xl flex justify-center">
                  <Lords className="w-8 h-8 fill-current mr-2" />
                  {formatEther(lordsAvailableData)}
                </span>
                <span>Lords Available</span>
                <Tooltip>
                  <TooltipTrigger className="flex justify-center">
                    <span className="mb-4 text-sm">Epoch 1-10</span>

                    <Info className="w-5 h-5 mt-2 ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-lg pb-2">
                      Weeks 10-35 can be redeemed at{" "}
                      <Link
                        target="_blank"
                        href={"https://bibliothecadao.xyz/claim"}
                      >
                        <span className="font-bold">Claim Site</span>
                      </Link>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Button
                  disabled={lordsAvailableData == 0n}
                  size={"lg"}
                  className="self-center"
                  variant={"outline"}
                >
                  Claim
                </Button>
              </>
            ) : (
              "Loading"
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <Tooltip>
            <TooltipTrigger className="flex justify-center">
              <h3>Carrack</h3>
              <Info className="w-5 h-5 mt-2 ml-2" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-lg pb-2">
                Rewards: 43.75x $LORDS per epoch.
              </div>
              <div className="text-lg pb-2">
                Claim: After each epoch (Realm must be staked for full epoch).
              </div>
            </TooltipContent>
          </Tooltip>
          <div className="border rounded pt-6 pb-8 flex flex-col">
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
          <div className="border rounded pt-6 pb-8 flex flex-col mt-6">
            {isCarrackLordsLoading ? (
              "Loading"
            ) : (
              <>
                <span className="text-2xl flex justify-center">
                  <Lords className="w-8 h-8 fill-current mr-2" />
                  {formatEther(carrackLordsAvailableData?.[0] || 0n)}
                </span>
                <span>Lords Available</span>
                <span className="mb-4 text-sm">Epoch 35+</span>

                <Button
                  size={"lg"}
                  disabled={
                    !carrackLordsAvailableData?.[0] ||
                    carrackLordsAvailableData?.[0] == 0n
                  }
                  className="self-center"
                  variant={"outline"}
                >
                  Claim
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h3>Data</h3>
          <div className="border rounded pt-6 pb-8">
            {/*<p>Current Epoch:</p>*/}
            <p>Total Realms Staked: {totalStakedRealms}</p>
          </div>
        </div>
      </div>
      {/*<p>Lords to be claimed on Starknet:</p>*/}
    </div>
  );
};

const StakingModal = ({
  realms,
  unstake,
  type,
}: {
  realms?: Pick<Realm, "id" | "name">[];
  unstake?: Boolean;
  type?: "galleon" | "carrack";
}) => {
  const [shipType, setShipType] = useState<"galleon" | "carrack">();
  const [selectedRealms, setSelectedRealms] = useState<readonly string[]>([]);
  const { address } = useAccount();

  const {
    writeAsync: boardGalleon,
    data: depositData,
    error: depositError,
  } = useContractWrite({
    address: galleonAddress as `0x${string}`,
    abi: GalleonStaking,
    functionName: "boardShip",
  });
  const {
    writeAsync: boardCarrack,
    /*data: depositData,
    error: depositError,*/
  } = useContractWrite({
    address: carrackAddress as `0x${string}`,
    abi: CarrackStaking,
    functionName: "boardShip",
  });
  const { writeAsync: exitGalleon } = useContractWrite({
    address: galleonAddress as `0x${string}`,
    abi: GalleonStaking,
    functionName: "exitShip",
  });
  const { writeAsync: exitCarrack } = useContractWrite({
    address: carrackAddress as `0x${string}`,
    abi: CarrackStaking,
    functionName: "exitShip",
  });
  const {
    writeAsync: approveGalleon,
    isLoading: isGalleonApproveLoading,
    data: approveGalleonData,
  } = useContractWrite({
    address: realmsAddress as `0x${string}`,
    abi: ERC721,
    functionName: "setApprovalForAll",
    args: [galleonAddress as `0x${string}`, true],
  });
  const { writeAsync: approveCarrack, data: approveCarrackData } =
    useContractWrite({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "setApprovalForAll",
      args: [carrackAddress as `0x${string}`, true],
    });
  const { data: isCarrackApprovedData, refetch: refetchCarrackApprovedData } =
    useContractRead({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "isApprovedForAll",
      args: [address as `0x${string}`, carrackAddress as `0x${string}`],
    });
  const { data: isGalleonApprovedData, refetch: refetchGalleonApprovedData } =
    useContractRead({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "isApprovedForAll",
      args: [address as `0x${string}`, galleonAddress as `0x${string}`],
    });

  const { data: approvedTransactionData, isSuccess } = useWaitForTransaction({
    hash: approveCarrackData?.hash || approveGalleonData?.hash,
  });

  useEffect(() => {
    refetchCarrackApprovedData(), refetchGalleonApprovedData();
  }, [isSuccess]);

  const isApproved =
    shipType === "galleon" ? isGalleonApprovedData : isCarrackApprovedData;

  const onApproveClick = async () => {
    const approvalFunction =
      shipType === "galleon" ? approveGalleon : approveCarrack;

    if (!isApproved) {
      await approvalFunction();
    }
  };
  const { data, isError, isLoading } = useWaitForTransaction({
    hash: "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060",
  });
  const onButtonClick = async () => {
    if (!unstake) {
      const boardingFunction =
        shipType === "galleon" ? boardGalleon : boardCarrack;
      await boardingFunction({ args: [selectedRealms.map(BigInt)] });
    } else {
      const exitFunction = shipType === "galleon" ? exitGalleon : exitCarrack;
      await exitFunction({ args: [selectedRealms.map(BigInt)] });
    }
    setSelectedRealms([]);
  };

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
      <DialogContent className="w-full max-h-full sm:!max-h-[720px]">
        <DialogHeader>
          <h6 className="my-0 py-0">
            {unstake ? "Exit" : "Board"} the{" "}
            <span className="capitalize">{shipType ?? "Ship"}</span>
          </h6>
        </DialogHeader>
        {shipType && realms ? (
          <>
            <div className="self-center flex flex-col">
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
              <Button
                onClick={onButtonClick}
                disabled={isGalleonApproveLoading}
                size={"lg"}
              >
                {unstake ? "Unstake" : "Stake"} Realms
              </Button>
            )}
          </>
        ) : (
          <div className="self-center flex flex-col">
            <h5>The Galleon</h5>
            <div className="text-lg pb-2">
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
            <div className="text-lg pb-2">
              Rewards: 43.75x $LORDS per epoch.
            </div>
            <div className="text-lg pb-2">
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
