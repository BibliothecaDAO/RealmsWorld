import type { Metadata } from "next";
import { NavLink } from "@/app/_components/ui/nav-link";

import { cn } from "../../utils/utils";
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
      <div className=" bg-medium-dark-green/5 container mx-auto w-full flex-col rounded-lg border p-2 md:w-[500px]">
        <div className="mb-2 flex w-full justify-center space-x-2  rounded text-xl">
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
    </>
  );
}
