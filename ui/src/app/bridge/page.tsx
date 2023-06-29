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
      <h2 className="mx-auto mb-6 text-center">The Lords Bridge</h2>
      <div className="mx-auto bg-white/5 w-full rounded-lg container flex-col md:w-[500px] p-2 border border-white/5">

        <div className="flex w-full text-xl mb-2 justify-center  rounded space-x-2">
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
