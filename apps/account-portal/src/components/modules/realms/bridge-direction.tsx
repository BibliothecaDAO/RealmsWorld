import EthereumIcon from "@/components/icons/ethereum.svg?react";
import StarknetIcon from "@/components/icons/starknet.svg?react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

export type BridgeChain = "Ethereum" | "Starknet";

function ChainPill({ label, chain }: { label: string; chain: BridgeChain }) {
  const Icon = chain === "Ethereum" ? EthereumIcon : StarknetIcon;
  return (
    <div className="realm-subtle-panel flex min-w-0 flex-1 items-center gap-3 rounded-lg px-3 py-2.5 sm:px-4">
      <span className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-md">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="realm-label">{label}</p>
        <p className="realm-group-title truncate">{chain}</p>
      </div>
    </div>
  );
}

/** From → To chain selector with a swap button. */
export function BridgeDirection({
  from,
  onSwap,
}: {
  from: BridgeChain;
  onSwap?: () => void;
}) {
  const to: BridgeChain = from === "Ethereum" ? "Starknet" : "Ethereum";
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <ChainPill label="From" chain={from} />
      <Button
        size="icon"
        variant="outline"
        onClick={onSwap}
        aria-label="Swap bridge direction"
        className="size-10 shrink-0 rounded-full"
      >
        <ArrowLeftRight />
      </Button>
      <ChainPill label="To" chain={to} />
    </div>
  );
}
