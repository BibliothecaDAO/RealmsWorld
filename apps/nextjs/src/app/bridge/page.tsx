import type { Metadata } from "next";
import { NavLink } from "@/app/_components/ui/nav-link";

import { cn } from "../../lib/utils";
import { Transfer } from "./Transfer";

export const metadata: Metadata = {
  title: "Lords Bridge",
  description: "...",
};

export default async function Page({
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
    <>
      <h2 className="mx-auto mb-6 text-center">The Lords Bridge</h2>
      <div className="container mx-auto w-full flex-col rounded-lg border border-white/5 bg-white/5 p-2 md:w-[500px]">
        <div className="mb-2 flex w-full justify-center space-x-2  rounded text-xl">
          {tabs.map((tab) => (
            <NavLink
              className={cn(
                "w-full",
                action === tab.link
                  ? "bg-white/50 !text-white hover:!bg-white/50"
                  : "!text-white/50",
              )}
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
    </>
  );
}
