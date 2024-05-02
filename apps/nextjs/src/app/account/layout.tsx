import { NavLink } from "@realms-world/ui";

import { PageLayout } from "@/app/_components/PageLayout";
import { StakingMigrationModal } from "@/app/_components/modal/StakingMigrationModal";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const tabs = [
    {
      name: "Assets",
      link: "assets",
    },
    {
      name: "Staking",
      link: "staking",
    },
    {
      name: "Activity",
      link: "activity",
    },
  ];
  return (
    <PageLayout size={"sm"}>
      <div className=" mb-4 flex w-full space-x-4 border-b py-3 text-xl">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            exact
            href={`/account${tab.link && "/" + tab.link}`}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
      {children}
      <StakingMigrationModal />
    </PageLayout>
  );
}
