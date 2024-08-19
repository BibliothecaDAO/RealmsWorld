import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";
import { formatEther } from "viem";

import { StakingAddresses } from "@realms-world/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Button,
} from "@realms-world/ui";

export const LegacyClaim = () => {
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
  return (
    <Accordion className="col-span-full" type="multiple">
      <AccordionItem value={"lords"} className="mb-2">
        <AccordionTrigger className="flex w-full border p-4 text-xl">
          <div className="flex justify-start">
            Legacy (L1) Claimable Lords:
            <span className="ml-8 flex items-center">
              <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
              {totalClaimable.toString()}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border border-y-0 bg-background p-4">
          {error && <Alert variant={"destructive"}>{error.message}</Alert>}
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
                      size={"xs"}
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
                      size={"xs"}
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
                    <Button onClick={claimPoolV2} className="ml-3" size={"xs"}>
                      Claim
                    </Button>
                  ) : null}
                </dd>
              </div>
            </dl>
            <div className="mt-4 font-sans text-xl font-semibold">Carrack</div>
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
                      size={"sm"}
                    >
                      Claim
                    </Button>
                  ) : null}
                </dd>
              </div>
            </dl>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
