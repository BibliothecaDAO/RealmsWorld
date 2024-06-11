import type { Realm, UsersRealmsQuery } from "@/types/subgraph";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { GalleonStaking } from "@/abi/L1/v1GalleonStaking";
import { CarrackStaking } from "@/abi/L1/v2CarrackStaking";
import { RealmsTable } from "@/app/_components/RealmsTable";
import { columns } from "@/app/_components/RealmsTableColumns";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useWriteContract } from "wagmi";

import { StakingAddresses, StakingContracts } from "@realms-world/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@realms-world/ui";

export const StakingMigration = () => {
  const { address } = useAccount();
  const [selectedRows, setSelectedRows] = useState<Realm[]>();
  const {
    writeContractAsync: exitGalleon /*, isPending: isExitGalleonPending */,
  } = useWriteContract();
  const {
    writeContractAsync: exitCarrack /*, isPending: isExitCarrackPending*/,
  } = useWriteContract();
  const handleRowSelection = (newSelection: Realm[]) => {
    setSelectedRows(newSelection);
  };
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
  const galleonAddress = StakingAddresses[StakingContracts.GALLEON][
    SUPPORTED_L1_CHAIN_ID
  ] as `0x${string}`;
  const carrackAddress = StakingAddresses[StakingContracts.CARRACK][
    SUPPORTED_L1_CHAIN_ID
  ] as `0x${string}`;

  const steps = [
    ...(realmsData?.wallet?.bridgedRealmsHeld > 0
      ? [
          {
            title: `Unstake ${realmsData?.wallet?.bridgedRealmsHeld} Realms from Galleon`,
            content: (
              <div className="mt-4">
                <RealmsTable
                  data={realmsData?.bridgedRealms as Realm[]}
                  columns={columns}
                  onRowSelectionChange={handleRowSelection}
                />
                <Button
                  onClick={() =>
                    selectedRows &&
                    exitGalleon({
                      address: galleonAddress,
                      abi: GalleonStaking,
                      functionName: "exitShip",
                      args: [
                        selectedRows.map((realm) => BigInt(realm.tokenId)),
                      ],
                    })
                  }
                  disabled={!selectedRows}
                  className="w-full"
                >
                  Unstake Realms
                </Button>
              </div>
            ),
          },
        ]
      : []),
    ...(realmsData?.wallet?.bridgedV2RealmsHeld > 0
      ? [
          {
            title: `Unstake ${realmsData?.wallet?.bridgedV2RealmsHeld} Realms from Carrack`,
            content: (
              <div className="mt-4">
                {realmsData?.bridgedV2Realms.length && (
                  <RealmsTable
                    data={realmsData.bridgedV2Realms}
                    columns={columns as ColumnDef<unknown>[]}
                    onRowSelectionChange={handleRowSelection}
                  />
                )}
                <Button
                  onClick={() =>
                    selectedRows &&
                    exitCarrack({
                      address: carrackAddress,
                      abi: CarrackStaking,
                      functionName: "exitShip",
                      args: [
                        selectedRows.map((realm) => BigInt(realm.tokenId)),
                      ],
                    })
                  }
                  disabled={!selectedRows?.length}
                  className="w-full"
                >
                  Unstake Realms
                </Button>
              </div>
            ),
          },
        ]
      : []),
    {
      title: "Bridge your Realms to Starknet",
      content: (
        <div className="mt-4">
          <p className="text-xl">
            You are ready to discover your Realms on the Starknet L2
          </p>
          <Button>Go To Bridge</Button>
        </div>
      ),
    },
    { title: "Delegate voting power (optional)" },
  ];
  return (
    <div className="w-full">
      <Accordion type="multiple">
        {steps.map((step, index) => (
          <AccordionItem className="mb-2" key={step.title} value={step.title}>
            <AccordionTrigger className="border p-4">
              {index + 1}. {step.title}
            </AccordionTrigger>
            <AccordionContent className="border border-t-0 p-4">
              {step.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
