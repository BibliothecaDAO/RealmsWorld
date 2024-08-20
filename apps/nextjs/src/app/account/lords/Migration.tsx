import type { UsersRealmsQuery } from "@/types/subgraph";
import { useState } from "react";
import Link from "next/link";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { RealmsTable } from "@/app/_components/RealmsTable";
import { columns } from "@/app/_components/RealmsTableColumns";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useAccount, useWriteContract } from "wagmi";

import type { StepItem } from "@realms-world/ui";
import { StakingAddresses, StakingContracts } from "@realms-world/constants";
import { Button, Step, Stepper, toast, useStepper } from "@realms-world/ui";

function UnstakeStep({
  step,
  realmsData,
}: {
  step: Pick<StepItem, "id">;
  realmsData: UsersRealmsQuery;
}) {
  const { nextStep } = useStepper();
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const { writeContractAsync: exitGalleon, isPending: isExitGalleonPending } =
    useWriteContract();
  const { writeContractAsync: exitCarrack, isPending: isExitCarrackPending } =
    useWriteContract();

  const exitFunction =
    step.id === "unstake-galleon" ? exitGalleon : exitCarrack;
  const isPending =
    step.id === "unstake-galleon" ? isExitGalleonPending : isExitCarrackPending;
  const galleonAddress = StakingAddresses[StakingContracts.GALLEON][
    SUPPORTED_L1_CHAIN_ID
  ] as `0x${string}`;
  const carrackAddress = StakingAddresses[StakingContracts.CARRACK][
    SUPPORTED_L1_CHAIN_ID
  ] as `0x${string}`;

  return (
    <div className="mt-4 w-full">
      <RealmsTable
        data={
          step.id === "unstake-galleon"
            ? realmsData.bridgedRealms
            : realmsData.bridgedV2Realms
        }
        columns={columns}
        onRowSelectionChange={setSelectedRows}
        rowSelection={selectedRows}
      />
      <Button
        onClick={async () => {
          await exitFunction({
            address:
              step.id === "unstake-galleon" ? galleonAddress : carrackAddress,
            abi:
              step.id === "unstake-galleon" ? GalleonStaking : CarrackStaking,
            functionName: "exitShip",
            args: [
              Object.keys(selectedRows)
                .map((index) => {
                  const realmId = (
                    step.id === "unstake-galleon"
                      ? realmsData.bridgedRealms
                      : realmsData.bridgedV2Realms
                  )[parseInt(index)]?.id;
                  return realmId ? BigInt(realmId) : undefined;
                })
                .filter((id) => id !== undefined),
            ],
          });
          toast({
            title: "Unstaked Realms",
            description: `${Object.keys(selectedRows).length} Realms will soon be available to bridge`,
          });
          nextStep();
        }}
        disabled={!Object.keys(selectedRows).length || isPending}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Unstaking
          </>
        ) : (
          "Unstake Realms"
        )}
      </Button>
    </div>
  );
}

export const StakingMigration = () => {
  const { address } = useAccount();

  const { data: realmsData /*, isLoading: realmsDataIsLoading*/ } = useQuery({
    queryKey: ["UsersRealms" + address],
    queryFn: async () =>
      await fetch(`/api/subgraph/getRealms?address=${address}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res: { data: UsersRealmsQuery }) => {
          return res.data;
        }),
    enabled: !!address,
    //refetchInterval: 10000,
  });

  const steps = [
    ...(realmsData?.bridgedRealms.length
      ? [
        {
          label: `Unstake`,
          description: `${realmsData.wallet?.bridgedRealmsHeld} Realms from Galleon`,
          id: "unstake-galleon",
        },
      ]
      : []),
    ...(realmsData?.bridgedV2Realms.length
      ? [
        {
          label: `Unstake`,
          description: `${realmsData.wallet?.bridgedRealmsHeld} Realms from Carrack`,
          id: "unstake-carrack",
        },
      ]
      : []),
    {
      label: "Bridge",
      description: `Realms to Starknet`,
      id: "bridge",
    },
    {
      label: "Delegate",
      description: "Allocate your Realms' voting power",
      id: "delegate",
    },
  ] satisfies StepItem[];
  return (
    <div className="w-full">
      <Stepper
        initialStep={0}
        variant="circle-alt"
        steps={steps}
        orientation="horizontal"
      >
        {steps.map((stepProps) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="my-2 flex items-center justify-center rounded-md border bg-secondary p-2 text-primary">
                {(stepProps.id === "unstake-galleon" ||
                  stepProps.id === "unstake-carrack") &&
                  realmsData && (
                    <>
                      <UnstakeStep step={stepProps} realmsData={realmsData} />
                    </>
                  )}
                {stepProps.id === "bridge" && (
                  <div className="mt-4">
                    <p className="text-xl">
                      You are ready to discover your Realms on the Starknet L2
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/account/assets">Go To Bridge</Link>
                    </Button>
                  </div>
                )}
                {stepProps.id === "delegate" && (
                  <div className="mt-4">
                    <p className="text-xl">
                      Delegate your Realms voting power (to yourself or others)
                      to start receiving Lords
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/account/delegates">Go To Delegates</Link>
                    </Button>{" "}
                  </div>
                )}
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
};

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="my-2 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
