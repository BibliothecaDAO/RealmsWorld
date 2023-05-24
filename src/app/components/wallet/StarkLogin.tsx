"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "../ui/button";
import { shortenHex } from "@/functions/utils";
import { LogOut } from "lucide-react";
import {
  useConnectors,
  useAccount,
  useStarkName,
  useContractRead,
  useNetwork,
} from "@starknet-react/core";
import { useState, useEffect } from "react";
import compiledErc20 from "@/abi/compiledErc20.json";
import { uint256 } from "starknet";
import { formatEther } from "ethers/lib/utils.js";
import { cn } from "@/app/lib/utils";
import { tokens } from "@/constants/tokens";

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
    error,
    refetch,
  } = useContractRead({
    address: tokens.L2.ETH.tokenAddress?.[NETWORK_ID[network]],
    abi: compiledErc20,
    functionName: "balanceOf",
    args: [address],
    watch: false,
  });
  const { data: lords, isLoading: lordsLoading } = useContractRead({
    address: tokens.L2.LORDS.tokenAddress?.[NETWORK_ID[network]],
    abi: compiledErc20,
    functionName: "balanceOf",
    args: [address],
    watch: false,
  });

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
          <span className="group-hover:hidden">
            {eth
              ? parseFloat(
                  formatEther(uint256.uint256ToBN(eth.balance).toString())
                ).toFixed(2)
              : 0}
          </span>
          <span className="group-hover:block hidden">Buy Lords</span>
        </Button>
        {lords && (
          <Button variant="outline" size={"lg"} className="group">
            <span className="group-hover:hidden">
              {lords
                ? parseFloat(
                    formatEther(uint256.uint256ToBN(lords.balance).toString())
                  ).toFixed(2)
                : 0}
            </span>
            <span className="group-hover:block hidden ">Buy Coins</span>
          </Button>
        )}
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
