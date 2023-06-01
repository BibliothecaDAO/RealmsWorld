"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { shortenHex } from "@/functions/utils";
import { LogOut } from "lucide-react";
import {
  useConnectors,
  useAccount,
  useStarkName,
  useNetwork,
  useBalance,
} from "@starknet-react/core";
import { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import { useTokenContractAPI } from "@/composables/useTokenContract";

function StarkLogin() {
  const { available, connect, connectors, disconnect } = useConnectors();
  const { account, address, status } = useAccount();
  const { data, isLoading, isError } = useStarkName({
    address: address || "",
  });
  const [starknetID, setStarknetID] = useState("");
  useEffect(() => {
    if (data) {
      setStarknetID(data);
    }
  }, [data]);
  const { chain } = useNetwork();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const network =
    process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "goerli" : "mainnet";
  const NETWORK_ID = {
    mainnet: "0x534e5f4d41494e",
    goerli: "0x534e5f474f45524c49",
  };

  useEffect(() => {
    //if (!isConnected) return;

    if (
      (chain?.id === NETWORK_ID.goerli && network === "mainnet") ||
      (chain?.id === NETWORK_ID.mainnet && network === "goerli")
    ) {
      setIsWrongNetwork(true);
    } else {
      setIsWrongNetwork(false);
    }
  }, [chain, network, address /*, isConnected*/]);

  const {
    data: eth,
    isLoading: ethLoading,
    refetch,
  } = useBalance({
    address: address,
    watch: false,
  });
  const { balanceOfL2 } = useTokenContractAPI();

  const onDisconnect = () => {
    disconnect();
    //setIsConnected(false);
    setIsWrongNetwork(false);
    //setHasWallet(false);
  };

  if (status === "connected")
    return (
      <div className="grid grid-cols-4 align-items-center space-x-3">
        {address && (
          <>
            <Button
              variant="outline"
              size={"lg"}
              className="flex justify-around w-full col-span-2"
              onClick={() => onDisconnect()}
            >
              {starknetID ? starknetID : shortenHex(address || "", 8)}
              <span
                className={cn(
                  "border border-white/50 font-sans ml-3 px-1.5 py-0.5 rounded bg-sky-300/50 text-xs normal-case",
                  isWrongNetwork && "border-red-500 bg-orange-300/70"
                )}
              >
                {chain?.name}
              </span>
              <LogOut className="self-center w-4" />
            </Button>
          </>
        )}
        <Button variant="outline" size={"lg"} className="group">
          <span className="group-hover:hidden">{eth ? eth.formatted : 0}</span>
          <span className="group-hover:block hidden">Buy Lords</span>
        </Button>
        {/*balanceOfL2 && (
          <Button variant="outline" size={"lg"} className="group">
            <span className="group-hover:hidden">
              {balanceOfL2
                ? parseFloat(
                    formatEther(uint256.uint256ToBN(balanceOfL2.balance).toString())
                  ).toFixed(2)
                : 0}
            </span>
            <span className="group-hover:block hidden ">Buy Coins</span>
          </Button>
        )}
                <Button onClick={refetchLords}>Refetch Lrods</Button>*/}
        {isWrongNetwork && (
          <Dialog open={isWrongNetwork}>
            <DialogContent className="w-full">
              <DialogHeader>
                <DialogTitle>Wrong Network</DialogTitle>
              </DialogHeader>
              <span>
                The Atlas currently only supports {network}, please change the
                connected network in your wallet, or:
              </span>
              <Button
                variant={"default"}
                size={"lg"}
                className="mt-4"
                onClick={() => onDisconnect()}
              >
                Disconnect
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="self-center normal-case w-full"
          size={"lg"}
          variant={"outline"}
        >
          Connect Starknet Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>Connect Starknet Wallet</DialogHeader>
        <div className="self-center flex-col">
          {connectors.map((connector) => {
            if (connector.available()) {
              return (
                <Button
                  className="self-center w-full"
                  variant={"outline"}
                  size={"lg"}
                  key={connector.id()}
                  onClick={() => connect(connector)}
                >
                  Connect {connector.id()}
                </Button>
              );
            }
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StarkLogin;
