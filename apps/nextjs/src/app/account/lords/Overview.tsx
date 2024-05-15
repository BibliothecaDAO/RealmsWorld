"use client";

import { Suspense, useState } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { useLordship } from "@/hooks/staking/useLordship";
import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useAccount as useL2Account } from "@starknet-react/core";
import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import { useAccount } from "wagmi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Label,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@realms-world/ui";

import { FloatAnimation } from "./FloatAnimation";
import { RealmStakingTabs } from "./RealmStakingTabs";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const {
    data,
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    poolV1Balance,
    poolV2Balance,
  } = useStaking();
  const delegateData = useLordship(l1Address);

  return (
    <div className="w-full px-4">
      {l1Address && (
        <div className="flex gap-8">
          <div className="h-[400px]b mt-8 w-1/3 px-12">
            {/*<h2 className="mb-2 text-3xl">Realms</h2>
            <RealmStakingTabs data={data} />*/}
            <FloatAnimation />
          </div>
          <div className="w-full">
            <span className="mb-2 flex w-fit items-center pb-4 font-sans text-3xl">
              <LordsIcon className="mx-auto mr-2 h-7 w-7 fill-bright-yellow" />
              LORDS
            </span>
            <Accordion type="multiple">
              <AccordionItem value={"lords"} className="mb-2">
                <AccordionTrigger className="w-full border bg-muted-foreground p-4">
                  Legacy Claimable Lords: {totalClaimable.toString()}
                </AccordionTrigger>
                <AccordionContent className="border border-y-0 bg-background p-4">
                  <span className="text-base font-semibold">Galleon:</span>
                  <p>Epoch 0-10: {galleonLordsAvailable?.toLocaleString()}</p>
                  <p>Epoch 11-35: {poolV1Balance?.toLocaleString()}</p>
                  <p>Epoch 36-109: {poolV2Balance?.toLocaleString()}</p>
                  <span className="text-base font-semibold">Carrack:</span>
                  <p>Epoch 11-109: {carrackLordsAvailable?.toLocaleString()}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};
