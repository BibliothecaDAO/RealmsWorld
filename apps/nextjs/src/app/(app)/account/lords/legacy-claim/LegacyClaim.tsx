"use client";
import { useState, useMemo } from "react";
import { useStaking } from "@/hooks/staking/useStaking";
import {
  useLegacyReward,
  useLegacyRewardData,
} from "@/hooks/staking/useLegacyReward";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { Loader, MoveRightIcon } from "lucide-react";

import LordsIcon from "@/icons/lords.svg";
import { BridgeBadge } from "@/app/_components/modal/NftBridgeModal";
import { ExplorerLink } from "@/app/_components/wallet/ExplorerLink";

import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { StakingAddresses } from "@realms-world/constants";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@realms-world/ui/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@realms-world/ui/components/ui/collapsible";
import { Alert } from "@realms-world/ui/components/ui/alert";
import { Button } from "@realms-world/ui/components/ui/button";
import { Badge } from "@realms-world/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui/components/ui/card";
import { EthereumAccountLogin } from "../../_components/EthereumAccountLogin";

export const LegacyClaim: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address: l2Address } = useL2Account();
  const { address: l1Address } = useAccount();

  const {
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    paymentPoolV1,
    poolV1Balance,
    poolV2Balance,
    claimGalleon,
    claimCarrack,
    claimPoolV1,
    claimPoolV2,
    error,
  } = useStaking();

  const { reward, claim, writeReturn } = useLegacyReward();
  const { data } = useLegacyRewardData({ address: l1Address });

  const isLegacyClaimed = useMemo(
    () =>
      data?.[0]?.claimEvents.some((event) => event.status === "ACCEPTED_ON_L2"),
    [data],
  );

  const totalClaimableincLegacy = useMemo(
    () =>
      totalClaimable +
      (reward?.amount && !isLegacyClaimed ? parseInt(reward.amount) : 0),
    [totalClaimable, reward?.amount, isLegacyClaimed],
  );

  return (
    <>
      {l1Address ? (
        <div>
          <Card className="w-80">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="ml-8 flex items-center">
                  <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
                  {totalClaimableincLegacy.toString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>Total Claimable Lords</CardContent>
          </Card>
          <Card className="mt-8 rounded border p-4 md:w-1/2">
            {error && <Alert variant="destructive">{error.message}</Alert>}
            <div className="grid text-lg">
              <div className="font-sans text-xl font-semibold">Galleon</div>
              <dl className="grid gap-1">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Epoch 0-10:</dt>
                  <dd>
                    {galleonLordsAvailable
                      ? formatEther(galleonLordsAvailable).toLocaleString()
                      : 0}
                    {galleonLordsAvailable && galleonLordsAvailable > 0 ? (
                      <Button
                        onClick={() =>
                          claimGalleon({
                            address: StakingAddresses.galleon[
                              SUPPORTED_L1_CHAIN_ID
                            ] as `0x${string}`,
                            abi: GalleonStaking,
                            functionName: "claimLords",
                          })
                        }
                        className="ml-3"
                        size="xs"
                      >
                        Claim
                      </Button>
                    ) : null}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Epoch 11-35:</dt>
                  <dd>
                    {poolV1Balance
                      ? formatEther(poolV1Balance).toLocaleString()
                      : 0}
                    {poolV1Balance && paymentPoolV1?.proof ? (
                      <Button
                        onClick={() => {
                          claimPoolV1({
                            address: StakingAddresses.paymentpool[
                              SUPPORTED_L1_CHAIN_ID
                            ] as `0x${string}`,
                            abi: paymentPoolAbi,
                            functionName: "withdraw",
                            args: [poolV1Balance, paymentPoolV1.proof],
                          });
                        }}
                        className="ml-3"
                        size="xs"
                      >
                        Claim
                      </Button>
                    ) : null}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Epoch 36-109:</dt>
                  <dd>
                    {poolV2Balance.toLocaleString()}
                    {poolV2Balance && poolV2Balance > 0 ? (
                      <Button onClick={claimPoolV2} className="ml-3" size="xs">
                        Claim
                      </Button>
                    ) : null}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Epoch 109-141:</dt>
                  <dd className="flex items-center">
                    {isLegacyClaimed
                      ? "Claimed"
                      : (reward?.amount ?? 0).toLocaleString()}
                    {reward?.amount &&
                      parseInt(reward.amount) > 0 &&
                      !isLegacyClaimed && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="xs"
                              className="ml-4 w-full"
                              disabled={
                                data?.[0]?.claimEvents[0]?.status === "PENDING"
                              }
                            >
                              {data?.[0]?.claimEvents[0]?.status ===
                              "PENDING" ? (
                                <>
                                  <Loader className="mr-2 w-4 animate-spin" />
                                  Claim Processing
                                </>
                              ) : (
                                "Claim"
                              )}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            {!writeReturn.data ? (
                              <>
                                <DialogTitle>Claim Galleon Lords</DialogTitle>
                                <p>
                                  Lords from Epoch 110-141 are now claimable on
                                  Starknet
                                </p>
                                <div className="flex w-full justify-between">
                                  <BridgeBadge
                                    isL1={true}
                                    address={l1Address}
                                  />
                                  <MoveRightIcon className="w-10 self-center" />
                                  <BridgeBadge
                                    isL1={false}
                                    address={l2Address}
                                  />
                                </div>
                                <Card className="w-1/3">
                                  <CardHeader>
                                    <CardTitle className="flex">
                                      <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
                                      {reward.amount}
                                    </CardTitle>
                                    <CardDescription>Claimable</CardDescription>
                                  </CardHeader>
                                </Card>
                                <Button
                                  disabled={writeReturn.isPending}
                                  className="w-full"
                                  onClick={() =>
                                    claim({ claimId: reward.id, l2Address })
                                  }
                                >
                                  Claim
                                </Button>
                                {writeReturn.error && (
                                  <Alert
                                    className="overflow-y-auto text-wrap"
                                    variant="destructive"
                                  >
                                    {writeReturn.error.message}
                                  </Alert>
                                )}
                              </>
                            ) : (
                              <>
                                <DialogTitle>Claim Sent</DialogTitle>
                                <p>
                                  Claim sent to Starknet{" "}
                                  <ExplorerLink
                                    type="tx"
                                    chainId={SUPPORTED_L1_CHAIN_ID}
                                    hash={writeReturn.data}
                                  />
                                </p>
                                <p>
                                  Your Lords will be transferred to your L2
                                  wallet in the next few minutes
                                </p>
                                <p>
                                  Status:{" "}
                                  <Badge className="ml-2" variant="secondary">
                                    {data?.[0]?.claimEvents[0]?.status}
                                  </Badge>{" "}
                                </p>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      )}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 font-sans text-xl font-semibold">
                Carrack
              </div>
              <dl className="grid gap-1">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Epoch 11-109:</dt>
                  <dd>
                    {carrackLordsAvailable
                      ? formatEther(carrackLordsAvailable).toLocaleString()
                      : 0}
                    {carrackLordsAvailable ? (
                      <Button
                        onClick={() =>
                          claimCarrack({
                            address: StakingAddresses.carrack[
                              SUPPORTED_L1_CHAIN_ID
                            ] as `0x${string}`,
                            abi: CarrackStaking,
                            functionName: "claimLords",
                          })
                        }
                        className="ml-3"
                        size="sm"
                      >
                        Claim
                      </Button>
                    ) : null}
                  </dd>
                </div>
              </dl>
            </div>
          </Card>
        </div>
      ) : (
        <EthereumAccountLogin />
      )}
    </>
  );
};
