import { cn } from "../lib/utils";
import { BridgeModalProvider } from "../providers/BridgeModalProvider";
import { Transfer } from "./Transfer";
import { NavLink } from "@/app/components/ui/nav-link";
import { BridgeModalWrapper } from "./BridgeModalWrapper";

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
    <BridgeModalProvider>
      <div className="mx-auto bg-white/5 w-full rounded-lg container flex-col mt-20 md:w-[500px] p-8">
        <div className="flex w-full flex text-xl p-1.5 mb-3 justify-center bg-white/10 rounded">
          {tabs.map((tab) => (
            <NavLink
              className={cn(
                "w-full",
                action === tab.link
                  ? "hover:!bg-white/50 bg-white/50 !text-white"
                  : "!text-white/50"
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
      <BridgeModalWrapper />
    </BridgeModalProvider>
  );
}
