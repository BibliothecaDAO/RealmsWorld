import RWLogo from "@/components/icons/rw-logo.svg?react";
import { useStarknetWallet } from "@/hooks/use-starknet-wallet";
import { toast } from "@/hooks/use-toast";
import useIsWrongNetwork from "@/hooks/use-wrong-network";
import { getConnectorIcon } from "@/utils/connectWallet";
import {
  expectedStarknetChain,
  expectedStarknetChainId,
} from "@/utils/starknet-chain";
import { cn, shortenAddress } from "@/utils/utils";
import { Separator } from "@radix-ui/react-separator";
import { useAccount, useExplorer, useSwitchChain } from "@starknet-start/react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, ExternalLink, Unplug } from "lucide-react";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Breadcrumbs } from "./breadcrumbs";
import { ModeToggle } from "./mode-toggle";
import { StarknetWalletButton } from "./starknet-wallet-button";

export function Header() {
  const { address, connector } = useAccount();
  const { open } = useSidebar();
  const { disconnectWallet } = useStarknetWallet();
  const explorer = useExplorer();
  const { isWrongNetwork } = useIsWrongNetwork();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain({
    params: { chainId: expectedStarknetChainId },
  });

  const handleSwitchChain = async () => {
    try {
      await switchChainAsync();
    } catch (error) {
      console.error("Failed to switch network:", error);
      toast({
        variant: "destructive",
        title: "Unable to switch network",
        description: `Please switch to ${expectedStarknetChain.name} manually in your wallet, or disconnect.`,
      });
    }
  };
  return (
    <header
      className={cn(
        "bg-sidebar/85 sticky top-0 z-50 flex shrink-0 items-center border-b border-[color:var(--realm-border-strong)] backdrop-blur-xl transition-[width,height] ease-linear",
      )}
    >
      <div className="flex h-(--header-height) w-full gap-2">
        <div
          className={
            `${open ? "w-16 px-1 sm:w-(--sidebar-width)" : "w-(--sidebar-width-icon)"}` +
            " flex items-center justify-center border-r border-[color:var(--realm-border-strong)]"
          }
        >
          <Link to="/">
            <RWLogo
              className={
                `${open ? "w-full sm:w-20" : "w-10"}` +
                " h-auto transition-[width,height] duration-300"
              }
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          {address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 rounded-xl px-3"
                >
                  <img
                    className="w-7"
                    src={getConnectorIcon(connector)}
                    alt={connector?.name ?? "Wallet"}
                  />
                  {shortenAddress(address)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex flex-col gap-6 p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="mr-1 size-8">
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${address}`}
                      />
                    </Avatar>
                    <div className="text-xl">{shortenAddress(address)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={explorer.contract(address)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant={"outline"}
                        size="icon"
                        className="rounded-full"
                      >
                        <ExternalLink />
                      </Button>
                    </a>
                    <Button
                      variant={"outline"}
                      size="icon"
                      className="rounded-full"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(address);
                        } catch (error) {
                          console.error("Failed to copy address:", error);
                        }
                        toast({
                          description: (
                            <div className="flex items-center gap-2">
                              <Check className="text-success" />
                              <span>Address copied to clipboard</span>
                            </div>
                          ),
                        });
                      }}
                    >
                      <Copy />
                    </Button>
                    <Button
                      variant={"outline"}
                      className="rounded-full"
                      onClick={() => void disconnectWallet()}
                    >
                      <Unplug /> Disconnect
                    </Button>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <StarknetWalletButton />
          )}
          <Dialog open={isWrongNetwork}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wrong Network</DialogTitle>
                <DialogDescription>
                  Your wallet is connected to a different network. Please switch
                  to {expectedStarknetChain.name} to continue.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:space-x-0">
                <Button
                  variant="outline"
                  onClick={() => void disconnectWallet()}
                >
                  Disconnect
                </Button>
                <Button
                  onClick={() => void handleSwitchChain()}
                  disabled={isSwitchingChain}
                >
                  {isSwitchingChain
                    ? "Switching..."
                    : `Switch to ${expectedStarknetChain.name}`}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
