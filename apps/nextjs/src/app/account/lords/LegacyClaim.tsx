import { useState } from 'react';
import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";
import {
  Alert,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@realms-world/ui";
import { formatEther } from "viem";
import { paymentPoolAbi } from "@/abi/L1/PaymentPool";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { StakingAddresses } from "@realms-world/constants";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useLegacyReward, useLegacyRewardData } from '@/hooks/staking/useLegacyReward';
import { BridgeBadge } from '@/app/_components/modal/NftBridgeModal';
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount } from "wagmi";
import { MoveRightIcon } from 'lucide-react';
import { ExplorerLink } from '@/app/_components/wallet/ExplorerLink';

export const LegacyClaim = () => {
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
    error
  } = useStaking();

  const { reward, loading, claim, writeReturn } = useLegacyReward();
  const data = useLegacyRewardData({ address: l1Address });

  const isLegacyClaimed = data.data?.[0]?.claimEvents.some(event => event.status === 'ACCEPTED_ON_L2');
  return (
    <Collapsible
      className="col-span-full"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="flex w-full border p-4 text-xl">
        <div className="flex justify-start">
          Legacy (L1) Claimable Lords:
          <span className="ml-8 flex items-center">
            <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
            {totalClaimable.toString()}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="border border-t-0 bg-background p-4">
        {error && <Alert variant={"destructive"}>{error.message}</Alert>}
        <div className="grid text-lg">
          <div className="font-sans text-xl font-semibold">Galleon</div>
          <dl className="grid gap-1">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Epoch 0-10:</dt>
              <dd>
                {galleonLordsAvailable ? formatEther(galleonLordsAvailable).toLocaleString() : 0}
                {galleonLordsAvailable && galleonLordsAvailable > 0 ? (
                  <Button onClick={() => claimGalleon({
                    address: StakingAddresses.galleon[SUPPORTED_L1_CHAIN_ID] as `0x${string}`,
                    abi: GalleonStaking,
                    functionName: "claimLords",
                  })} className="ml-3" size={"xs"}>
                    Claim
                  </Button>
                ) : null}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Epoch 11-35:</dt>
              <dd>{poolV1Balance ? formatEther(poolV1Balance).toLocaleString() : 0}
                {poolV1Balance && paymentPoolV1?.proof ? (
                  <Button
                    onClick={() => {
                      claimPoolV1({
                        address: StakingAddresses.paymentpool[SUPPORTED_L1_CHAIN_ID] as `0x${string}`,
                        abi: paymentPoolAbi,
                        functionName: "withdraw",
                        args: [poolV1Balance, paymentPoolV1.proof],
                      })
                    }} className="ml-3" size={"xs"}>
                    Claim
                  </Button>
                ) : null}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Epoch 36-109:</dt>
              <dd>{poolV2Balance.toLocaleString()}
                {poolV2Balance && poolV2Balance > 0 ? (
                  <Button onClick={claimPoolV2} className="ml-3" size={"xs"}>
                    Claim
                  </Button>
                ) : null}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Epoch 109-142:</dt>
              <dd className='flex items-center'>
                {
                  isLegacyClaimed ? 'Claimed'
                    : (reward?.amount ?? 0).toLocaleString()}
                {reward?.amount && parseInt(reward.amount) > 0 && !isLegacyClaimed ? (
                  <Dialog >
                    <DialogTrigger asChild>
                      <Button variant={"outline"} className="w-full ml-4">
                        Claim
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      {!writeReturn.data ? (<><DialogTitle>Claim Galleon Lords</DialogTitle>
                        <p>Lords from Epoch 110-142 are now claimable on Starknet</p>
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
                        <Card className='w-1/3'>
                          <CardHeader>
                            <CardTitle className='flex'>
                              <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
                              {reward.amount}
                            </CardTitle>
                            <CardDescription>Claimable</CardDescription>
                          </CardHeader>
                        </Card>
                        <Button disabled={writeReturn.isPending} className='w-full' onClick={() => claim({ claimId: reward.id, l2Address })}>Claim</Button>
                        {writeReturn.error && <Alert className='text-wrap overflow-y-auto' variant={"destructive"}>{writeReturn.error.message}</Alert>}
                      </>) : <><DialogTitle>Claim Sent</DialogTitle><p>Claim sent to Starknet <ExplorerLink type='tx' chainId={SUPPORTED_L1_CHAIN_ID} hash={writeReturn.data} /></p>
                        <p>{data[0].claimEvents[0].status}</p>
                      </>}
                    </DialogContent>
                  </Dialog>
                ) : null}</dd>
            </div>
          </dl>
          <div className="mt-4 font-sans text-xl font-semibold">Carrack</div>
          <dl className="grid gap-1">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Epoch 11-109:</dt>
              <dd>
                {carrackLordsAvailable ? formatEther(carrackLordsAvailable).toLocaleString() : 0}
                {carrackLordsAvailable ? (
                  <Button onClick={() =>
                    claimCarrack({
                      address: StakingAddresses.carrack[SUPPORTED_L1_CHAIN_ID] as `0x${string}`,
                      abi: CarrackStaking,
                      functionName: "claimLords",
                    })} className="ml-3" size={"sm"}>
                    Claim
                  </Button>
                ) : null}
              </dd>
            </div>
          </dl>
        </div>

      </CollapsibleContent>
    </Collapsible>
  );
};



