import { useStarknetWallet } from "@/hooks/use-starknet-wallet";
import { getConnectorIcon } from "@/utils/connectWallet";
import { cn } from "@/utils/utils";
import { ChevronDownIcon, WalletMinimal } from "lucide-react";

import { Button } from "../ui/button";

export const StarknetWalletButton = ({
  className,
  label,
  variant = "default",
}: {
  className?: string;
  label?: string;
  variant?: "default" | "reference";
}) => {
  const { lastConnector, connectors, requestConnect, openPicker } =
    useStarknetWallet();
  const hasConnectorPicker = connectors.length > 1;

  const connectPrimary = () => {
    void requestConnect();
  };

  if (variant === "reference") {
    return (
      <div className={cn("relative w-full", className)}>
        <Button
          onClick={connectPrimary}
          variant="outline"
          className="h-14 w-full justify-start rounded-2xl px-3 pr-16 shadow-sm"
        >
          <span className="bg-muted mr-3 inline-flex h-6 w-6 items-center justify-center rounded-md">
            {lastConnector ? (
              <img
                className="h-4 w-4"
                src={getConnectorIcon(lastConnector)}
                alt={`${lastConnector.name} logo`}
              />
            ) : (
              <WalletMinimal className="text-primary h-4 w-4" />
            )}
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-foreground text-base font-semibold">
              {label ?? "Connect wallet"}
            </span>
            <span className="text-muted-foreground text-xs">
              {lastConnector
                ? `Previously used ${lastConnector.name}`
                : "Choose a Starknet wallet"}
            </span>
          </span>
        </Button>

        {hasConnectorPicker ? (
          <button
            type="button"
            onClick={openPicker}
            aria-label="Choose a wallet"
            className="text-muted-foreground hover:bg-accent hover:text-foreground absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg transition"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex shrink-0 items-stretch", className)}>
      <Button
        onClick={connectPrimary}
        className={cn(
          "flex-1 rounded px-2.5",
          hasConnectorPicker && "rounded-r-none",
        )}
      >
        {lastConnector ? (
          <img
            className="w-7 pr-2"
            src={getConnectorIcon(lastConnector)}
            alt={`${lastConnector.name} logo`}
          />
        ) : null}
        <span className="mx-auto whitespace-nowrap">
          {label ?? "Connect wallet"}
        </span>
      </Button>
      {hasConnectorPicker ? (
        <Button
          onClick={openPicker}
          aria-label="Choose a wallet"
          className="border-l-primary-foreground/20 rounded rounded-l-none px-2"
        >
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
};
