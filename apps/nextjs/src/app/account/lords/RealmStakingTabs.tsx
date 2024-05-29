import type { UsersRealmsQuery } from "@/.graphclient";
import { useUIStore } from "@/providers/UIStoreProvider";
import { AlertTriangleIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

export const RealmStakingTabs = ({
  data,
}: {
  data: UsersRealmsQuery | undefined;
}) => {
  const totalLegacyStaked =
    (+data?.wallet?.bridgedRealmsHeld ?? 0) +
    (+data?.wallet?.bridgedV2RealmsHeld ?? 0);
  const { toggleStakingMigration } = useUIStore((state: any) => state);

  const tabsData = [
    ...(totalLegacyStaked > 0
      ? [
          {
            id: "legacy",
            label: "Legacy Staked Realms",
            value: totalLegacyStaked,
            content: (
              <Card className="mt-4 bg-background">
                <CardHeader className="font-semibold">
                  Migrate your Realms to keep earning Lords and to vote in
                  governance
                </CardHeader>
                <CardContent>
                  <Button onClick={toggleStakingMigration}>Migrate Now</Button>
                </CardContent>
              </Card>
            ),
          },
        ]
      : []),
    {
      id: "unstaked",
      label: "Unstaked Realms",
      value: data?.wallet?.realmsHeld,
      content: (
        <Card className="mt-4 bg-background">
          <CardHeader>
            You have {data?.wallet?.realmsHeld} Unstaked Realms
          </CardHeader>
          <CardContent>{/* Content specific to Unstaked Realms */}</CardContent>
        </Card>
      ),
    },
    {
      id: "vRealms",
      label: "vRealms",
      value: 0, // Assuming this needs to be dynamically calculated or fetched
      content: (
        <Card className="mt-4 bg-background">
          <CardHeader>You have X vRealms</CardHeader>
          <CardContent>
            Your Realms are earning 49 Lords per week <Button>Unstake</Button>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <>
      {totalLegacyStaked > 0 && (
        <Alert variant={"warning"} className="mb-4">
          <AlertTriangleIcon className="h-5 w-5" />
          <AlertTitle>Migrate to new contract</AlertTitle>{" "}
          <AlertDescription>
            You have {totalLegacyStaked} Realms staked in legacy contracts that
            are no longer earning $LORDS.{" "}
            <Button
              size={"xs"}
              variant={"outline"}
              onClick={toggleStakingMigration}
            >
              Migrate Now
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue={tabsData[0]?.id}>
        <TabsList className="grid grid-cols-3 border-0">
          {tabsData.map((tab, index) => (
            <TabsTrigger asChild value={tab.id} key={index}>
              <Label
                htmlFor={tab.id}
                className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-background bg-popover p-4 hover:bg-accent hover:text-accent-foreground data-[state=active]:border-bright-yellow peer-data-[state=active]:border-bright-yellow"
              >
                <span className="mb-2 block text-2xl">{tab.value}</span>
                {tab.label}
              </Label>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsData.map((tab, index) => (
          <TabsContent value={tab.id} className="h-full" key={index}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};
