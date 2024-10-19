import type { Metadata } from "next";

import { NavLink } from "@realms-world/ui/components/ui/nav-link";
import { cn } from "@realms-world/utils";

import { Transfer } from "./Transfer";

export const metadata: Metadata = {
  title: "Lords Bridge",
  description: "...",
};

export default async function Page(
  props: {
    searchParams: Promise<{ action?: string }>;
  }
) {
  const searchParams = await props.searchParams;

  const {
    action = "deposit"
  } = searchParams;

  const tabs = [
    {
      name: "Deposit",
      link: "deposit",
    },
    {
      name: "Withdraw",
      link: "withdraw",
    },
  ];

  return (
    <div className="relative z-10 p-2">
      <h2 className="mx-auto mb-6 text-center">The Lords Bridge</h2>
      <div className="container mx-auto w-full flex-col rounded-lg border bg-background p-2 md:w-[500px]">
        <div className="mb-2 flex w-full justify-center space-x-2 rounded text-xl">
          {tabs.map((tab) => (
            <NavLink
              className={cn(
                "w-full text-base",
                action === tab.link
                  ? "hover:bg-bg-bright-yellow cursor-default !text-medium-dark-green/80"
                  : "bg-medium-dark-green !text-bright-yellow hover:bg-bright-yellow/50",
              )}
              size={"lg"}
              key={tab.name}
              exact
              href={`/bridge?action=${tab.link}`}
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <Transfer action={action} />
      </div>
    </div>
  );
}
