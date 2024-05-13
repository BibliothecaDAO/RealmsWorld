import { useState } from "react";
import { Realm } from "@/.graphclient";
import { RealmsTable } from "@/app/_components/RealmsTable";
import { columns } from "@/app/_components/RealmsTableColumns";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useERC721SetApprovalForAll } from "@/hooks/token/useERC721SetApprovalForAll";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import {
  Collections,
  getCollectionAddresses,
  StakingAddresses,
} from "@realms-world/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@realms-world/ui";

export const StakingMigration = () => {
  const { address } = useAccount();
  const [selectedRows, setSelectedRows] = useState({});

  const handleRowSelection = (newSelection: any) => {
    setSelectedRows(newSelection);
  };
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
    enabled: !!address,
    //refetchInterval: 10000,
  });
  const { writeAsync: setApproval } = useERC721SetApprovalForAll({
    onSuccess: (data) => console.log("sucess" + data),
  });

  const steps = [
    ...(realmsData?.wallet.bridgedRealmsHeld > 0
      ? [
          {
            title: `Unstake ${realmsData.wallet.bridgedRealmsHeld} Realms from Galleon`,
            content: (
              <div className="mt-4">
                <RealmsTable
                  data={realmsData?.bridgedRealms as Realm[]}
                  columns={columns}
                />
                <Button className="w-full">Unstake Realms</Button>
              </div>
            ),
          },
        ]
      : []),
    ...(realmsData?.wallet.bridgedV2RealmsHeld > 0
      ? [
          {
            title: `Unstake ${realmsData?.wallet?.bridgedV2RealmsHeld} Realms from Carrack`,
            content: (
              <div className="mt-4">
                <RealmsTable
                  data={realmsData?.bridgedV2Realms as Realm[]}
                  columns={columns}
                />
                <Button className="w-full">Unstake Realms</Button>
              </div>
            ),
          },
        ]
      : []),
    {
      title: "Approve Realms Transfer",
      content: (
        <div>
          <p>Approve the vRealms staking contract to transfer your NFTs</p>
          <Button
            className="mt-4"
            onClick={() =>
              setApproval({
                contractAddress: getCollectionAddresses(Collections.REALMS)[
                  SUPPORTED_L1_CHAIN_ID
                ] as `0x${string}`,
                operator: StakingAddresses.vlords[
                  SUPPORTED_L1_CHAIN_ID
                ] as `0x${string}`,
              })
            }
          >
            Approve Realms
          </Button>
        </div>
      ),
    },
    {
      title: "Stake Realms for vRealms",
      content: (
        <div className="mt-4">
          <RealmsTable
            data={realmsData?.realms as Realm[]}
            columns={columns}
            onRowSelectionChange={handleRowSelection}
          />
          <Button className="w-full">Stake Realms</Button>
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
