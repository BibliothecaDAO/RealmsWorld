"use client";

import { useEffect, useState } from "react";
import type { Realm } from "@/.graphclient";
import { ERC721 } from "@/abi/L1/ERC721";
import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { Alert } from "@/app/_components/ui/alert";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import EthereumLogin from "@/app/_components/wallet/EthereumLogin";
import { stakingAddresses } from "@/constants/staking";
import Lords from "@/icons/lords.svgr";
import { getTokenContractAddresses } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import RealmsTable from "./RealmsTable";

const network =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
const galleonAddress = stakingAddresses[network].v1Galleon;
const carrackAddress = stakingAddresses[network].v2Carrack;
const realmsAddress = getTokenContractAddresses("realms").L1;

export const StakingContainer = () => {
  const { address: addressL1 } = useAccount();
  const [hexProof, setHexProof] = useState();
  const [poolTotal, setPoolTotal] = useState<bigint>(0n);
  const [poolClaimAmount, setPoolClaimAmount] = useState<bigint>();
  /*const sdk = getBuiltGraphSDK({
    realmsSubgraph: process.env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME,
  });*/
  const address = addressL1 ? addressL1.toLowerCase() : "0x";

  useEffect(() => {
    fetch(`/api/staking/${addressL1}`)
      .then((res) => res.json())
      .then((data) => {
        setHexProof(data.proof);
        setPoolTotal(parseEther(data.amount.toString()));
      });
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
  }); /*
  const { data: totalStakedRealmsData } = useQuery({
    queryKey: ["StakedRealmsTotal"],
    queryFn: () =>
      sdk.WalletsRealms({ addresses: [galleonAddress, carrackAddress] }),
    enabled: !!addressL1,
  });*/

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
  const {
    data: galleonClaimData,
    isLoading: isGalleonClaimLoading,
    write: claimGalleonLords,
  } = useContractWrite({
    address: stakingAddresses[network].v1Galleon as `0x${string}`,
    abi: GalleonStaking,
    functionName: "claimLords",
  });

  const { data: carrackLordsAvailableData, isLoading: isCarrackLordsLoading } =
    useContractRead({
      address: stakingAddresses[network].v2Carrack as `0x${string}`,
      abi: CarrackStaking,
      functionName: "lordsAvailable",
      args: [address as `0x${string}`],
    });

  const {
    data: carrackClaimData,
    isLoading: isCarrackClaimLoading,
    write: claimCarrackLords,
  } = useContractWrite({
    address: stakingAddresses[network].v2Carrack as `0x${string}`,
    abi: CarrackStaking,
    functionName: "claimLords",
  });

  const {
    data: poolClaimData,
    isLoading: isPoolClaimLoading,
    write: claimPoolLords,
  } = useContractWrite({
    address: stakingAddresses[network].paymentPool as `0x${string}`,
    abi: paymentPoolAbi,
    functionName: "withdraw",
    args: [parseEther(poolClaimAmount?.toString() ?? "0"), hexProof as any],
  });

  const { refetch, isLoading: poolWithdrawalsLoading } = useContractRead({
    address: stakingAddresses[network].paymentPool as `0x${string}`,
    abi: paymentPoolAbi,
    functionName: "withdrawals",
    args: [address as `0x${string}`],
    onSuccess(data) {
      console.log(parseFloat(formatEther(data)));
      const claimable = poolTotal - data;
      setPoolClaimAmount(claimable);
    },
    enabled: !!address && !!poolTotal,
  });

  if (!addressL1) {
    return (
      <div className="col-span-2 mx-auto mt-24 flex flex-col text-center">
        <h1>Realms (NFT) Staking for $LORDS rewards</h1>
        <h3 className="mb-12">Login to your Ethereum Wallet</h3>
        <EthereumLogin />
      </div>
    );
  }
  return (
    <div className="text-center">
      <div className="col-span-2 flex flex-col ">
        <h3>Your Realms</h3>
        <div className="flex flex-col rounded border pb-8 pt-6">
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

      <h3 className="mt-10">Galleon</h3>
      <div className="pb-2 text-lg">
        <p>Rewards: 49x $LORDS per epoch (a bonus of 12% over Carrack)</p>
        <p>
          Redemption: Lords are locked until DAO approves the migration to
          Starknet
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col justify-center rounded border pb-8 pt-6">
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
        <div className="flex flex-col rounded border pb-8 pt-6">
          <span className="pb-4 text-lg">Lords Available</span>

          {!isGalleonLordsLoading && typeof lordsAvailableData == "bigint" ? (
            <div className="flex items-center justify-center">
              <span className="mr-6 text-sm">Epoch 1-10:</span>
              <span className="mr-3 flex">
                <Lords className="mr-2 h-5 w-5 fill-current" />
                {formatEther(lordsAvailableData)}
              </span>
              <Button
                disabled={lordsAvailableData == 0n || isGalleonClaimLoading}
                size={"sm"}
                className="self-center"
                variant={"outline"}
                onClick={() => claimGalleonLords()}
              >
                {isGalleonClaimLoading ? (
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
                disabled={poolClaimAmount == 0n || isPoolClaimLoading}
                size={"sm"}
                className="self-center"
                variant={"outline"}
                onClick={() => claimPoolLords()}
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
          <p>Rewards: 43.75x $LORDS per epoch.</p>
          <p>
            Claim: After each epoch (Realm must be staked for full epoch [1
            week]).
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col justify-center rounded border pb-8 pt-6">
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
          <div className="flex flex-col rounded border pb-8 pt-6">
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
                  onClick={() => claimCarrackLords()}
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
      args: [address!, carrackAddress as `0x${string}`],
    });
  const { data: isGalleonApprovedData, refetch: refetchGalleonApprovedData } =
    useContractRead({
      address: realmsAddress as `0x${string}`,
      abi: ERC721,
      functionName: "isApprovedForAll",
      args: [address!, galleonAddress as `0x${string}`],
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
