import dynamic from "next/dynamic";
import { StakingMigrationModal } from "@/app/_components/modal/StakingMigrationModal";
import { PageLayout } from "@/app/_components/PageLayout";
import { SessionProvider } from "next-auth/react";

import { NavLink } from "@realms-world/ui/components/ui/nav-link";

import { AuthWrapper } from "./AuthWrapper";

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
      name: "Delegates",
      link: "delegates",
    },
    {
      name: "Profile",
      link: "profile",
    },
  ];

  const NftBridgeModal = dynamic(
    () => import("@/app/_components/modal/NftBridgeModal"),
    {
      ssr: false,
    },
  );

  return (
    <SessionProvider>
      <PageLayout size={"sm"} title="Account">
        <div className="mb-4 flex w-full space-x-4 border-b text-xl">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              exact
              variant={"ghost"}
              href={`/account${tab.link && "/" + tab.link}`}
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <AuthWrapper>{children}</AuthWrapper>
      </PageLayout>
      <StakingMigrationModal />
      <NftBridgeModal />
    </SessionProvider>
  );
}
