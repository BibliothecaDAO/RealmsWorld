import Link from "next/link";
import { useLordsPrice } from "@/hooks/lords/useLordsPrice";
import { useLordsBalance as useL2LordsBalance } from "@/hooks/token/starknet/useLordsBalance";
import { useLordsBalance } from "@/hooks/token/useLordsBalance";
import Bridge from "@/icons/bridge.svg";
import EthereumLogo from "@/icons/ethereum.svg";
import LordsIcon from "@/icons/lords.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { ArrowLeftRight } from "lucide-react";
import { formatEther } from "viem";

import { Button } from "@realms-world/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@realms-world/ui/components/ui/dropdown-menu";

export const LordsDropdown = () => {
  const { data: l1Data } = useLordsBalance();
  const { data: l2Data } = useL2LordsBalance();
  const { lordsPrice } = useLordsPrice();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} className="mr-3" variant={"outline"}>
          <LordsIcon className="mr-2 w-[1.55rem] fill-current" />{" "}
          {parseInt(
            formatEther((l2Data?.value ?? 0n) + (l1Data?.value ?? 0n)),
          ).toLocaleString()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[250px]">
        <div className="flex items-center justify-between p-2">
          <div className="flex">
            <StarknetLogo className="mr-2 w-6" />
            {l2Data && parseInt(formatEther(l2Data.value)).toLocaleString()}
          </div>
          <div className="flex">
            <EthereumLogo className="mr-2 w-6" />
            {l1Data && parseInt(formatEther(l1Data.value)).toLocaleString()}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            className="flex w-full items-center justify-between text-lg"
            href="/swap"
          >
            <span className="flex">
              <ArrowLeftRight className="mr-3 w-5" />
              Swap
            </span>
            <span className="text-sm text-muted-foreground">
              $USD {lordsPrice?.usdPrice.toFixed(2)}
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex w-full text-lg" href="/bridge">
            <Bridge className="mr-3 w-5" /> Bridge
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
