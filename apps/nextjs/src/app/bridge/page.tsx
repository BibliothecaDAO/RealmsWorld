import type { Metadata } from "next";

import { NavLink } from "@realms-world/ui";
import { cn } from "@realms-world/utils";

import { Transfer } from "./Transfer";

export const metadata: Metadata = {
  title: "Lords Bridge",
  description: "...",
};

export default function Page({
  searchParams: { action = "deposit" },
}: {
  searchParams: { action?: string };
}) {
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
                  ? "bg-medium-dark-green !text-bright-yellow hover:!bg-white/50"
                  : "!text-bright-yellow/40",
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
