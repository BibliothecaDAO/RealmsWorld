import { NavLink } from "@realms-world/ui";

import { BaseCard } from "../_components/BaseCard";
import { PageLayout } from "../_components/PageLayout";

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
    <PageLayout size={"sm"} title="Account">
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
    </PageLayout>
  );
}
