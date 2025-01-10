import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumbs } from "./breadcrumbs";
import {StarknetWalletButton} from "./starknet-wallet-button";
import { useAccount } from "@starknet-react/core";
import { Button } from "../ui/button";
import { shortenAddress } from "@/utils/utils";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  const {address} = useAccount()
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b px-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2 px-4 ">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />
        </div>
        {address ? <Button>{shortenAddress(address)}</Button> : <StarknetWalletButton />}
      </div>
    </header>
  );
}
