"use client";
import { getBuiltGraphSDK, Realm, UsersRealmsQuery } from "@/.graphclient";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { stakingAddresses } from "@/constants/staking";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
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

const network =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";
const galleonAddress = stakingAddresses[network].v1Galleon;
const carrackAddress = stakingAddresses[network].v2Carrack;

export const StakingContainer = () => {
  const { address: addressL1 } = useAccount();
  const sdk = getBuiltGraphSDK({
    subgraphName: process.env.NEXT_PUBLIC_SUBGRAPH_NAME,
    apibaraHandle: process.env.NEXT_PUBLIC_APIBARA_HANDLE,
  });
  const address = addressL1 ? addressL1.toLowerCase() : "0x";

  const { data: realmsData } = useQuery({
    queryKey: ["UsersRealms" + address],
    queryFn: () => sdk.UsersRealms({ address, addressId: address }),
    enabled: !!address,
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
    isLoading,
  } = useContractRead({
    address: stakingAddresses[network].v1Galleon as `0x${string}`,
    abi: GalleonStaking,
    functionName: "lordsAvailable",
    args: [address as `0x${string}`],
  });

  const { data: carrackLordsAvailableData } = useContractRead({
    address: stakingAddresses[network].v2Carrack as `0x${string}`,
    abi: CarrackStaking,
    functionName: "lordsAvailable",
    args: [address as `0x${string}`],
  });
  return (
    <div className="sm:max-w-3xl mx-auto mt-24">
      <div className="grid grid-cols-2 gap-6 text-center">
        <div className="flex flex-col col-span-2 ">
          <h3>Your Realms</h3>
          <div className="border rounded pt-6 pb-8 flex flex-col">
            {realmsData?.wallet?.realmsHeld ? (
              <>
                <span className="text-2xl">
                  {realmsData?.wallet?.realmsHeld}
                </span>
                <span className="mb-4">Realms Available</span>
                <StakingModal realms={realmsData?.realms} />
              </>
            ) : (
              "Loading"
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
            {realmsData?.wallet?.bridgedRealmsHeld ? (
              <>
                <span className="text-2xl">
                  {realmsData?.wallet?.bridgedRealmsHeld}
                </span>
                <span className="mb-4">Realms Staked</span>
                <StakingModal unstake realms={realmsData?.bridgedRealms} />
              </>
            ) : (
              "Loading"
            )}
          </div>
          <div className="border rounded pt-6 pb-8 flex flex-col mt-6">
            {!isLoading && typeof lordsAvailableData == "bigint" ? (
              <>
                <span className="text-2xl flex justify-center">
                  <Lords className="w-8 h-8 fill-current mr-2" />
                  {formatEther(lordsAvailableData)}
                </span>
                <span>Lords Available</span>
                <span className="mb-4 text-sm">Epoch 1-10</span>

                <Button size={"lg"} className="self-center" variant={"outline"}>
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
            {realmsData?.wallet?.bridgedV2RealmsHeld ? (
              <>
                <span className="text-2xl">
                  {realmsData?.wallet?.bridgedV2RealmsHeld}
                </span>
                <span className="mb-4">Staked Realms:</span>
                <StakingModal unstake realms={realmsData?.bridgedV2Realms} />
              </>
            ) : (
              "Loading"
            )}
          </div>
          <div className="border rounded pt-6 pb-8 flex flex-col mt-6">
            {!isLoading && typeof carrackLordsAvailableData?.[0] == "bigint" ? (
              <>
                <span className="text-2xl flex justify-center">
                  <Lords className="w-8 h-8 fill-current mr-2" />
                  {formatEther(carrackLordsAvailableData?.[0])}
                </span>
                <span>Lords Available</span>
                <span className="mb-4 text-sm">Epoch 35+</span>

                <Button size={"lg"} className="self-center" variant={"outline"}>
                  Claim
                </Button>
              </>
            ) : (
              "Loading"
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h3>Data</h3>
          <div className="border rounded pt-6 pb-8">
            <p>Current Epoch:</p>
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
  const onButtonClick = async () => {
    if (!unstake) {
      if (shipType == "galleon") {
        await boardGalleon({ args: [selectedRealms.map(BigInt)] });
      } else {
        await boardCarrack({ args: [selectedRealms.map(BigInt)] });
      }
    } else {
      if (shipType == "galleon") {
        await exitGalleon({ args: [selectedRealms.map(BigInt)] });
      } else {
        await exitCarrack({ args: [selectedRealms.map(BigInt)] });
      }
    }
  };
  const onSelectRealms = (realms: any) => {
    console.log(realms);
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
        {shipType ? (
          <>
            <div className="self-center flex flex-col">
              <RealmsTable
                realms={realms}
                selectedRealms={selectedRealms}
                onSelectRealms={onSelectRealms}
              />
            </div>
            <Button onClick={onButtonClick} size={"lg"}>
              {unstake ? "Unstake" : "Stake"} Realms
            </Button>
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
