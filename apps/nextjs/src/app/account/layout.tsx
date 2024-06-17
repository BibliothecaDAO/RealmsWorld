import { StakingMigrationModal } from "@/app/_components/modal/StakingMigrationModal";
import { PageLayout } from "@/app/_components/PageLayout";

import { NavLink } from "@realms-world/ui";

import { NftBridgeModal } from "../_components/modal/NftBridgeModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    {
      name: "Assets",
      link: "assets",
    },
    {
      name: "Lords",
      link: "lords",
    },
    // {
    //   name: "Activity",
    //   link: "activity",
    // },
    {
      name: "Delegations",
      link: "delegation",
    },
    {
      name: "Profile",
      link: "profile",
    },
  ];
  return (
    <>
      <PageLayout size={"sm"} title="Account">
        <div className="mb-4 flex w-full space-x-4 border-b text-xl">
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
      </PageLayout>
      <StakingMigrationModal />
      <NftBridgeModal />
    </>
  );
}
