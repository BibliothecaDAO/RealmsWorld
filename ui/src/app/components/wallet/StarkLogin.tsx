"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { LogOut, Mail } from "lucide-react";
import { useConnectors, useAccount, useNetwork } from "@starknet-react/core";
import { formatBigInt } from "@/app/lib/utils";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import Starknet from "@/icons/starknet.svg";
import Lords from "@/icons/lords.svg";
import EthereumLogo from "@/icons/ethereum.svg";
import { motion } from "framer-motion";

export const StarkLogin = () => {
  const { connect, connectors, disconnect } = useConnectors();
  const { address, status } = useAccount();
  const { balances } = useWalletsProviderContext();
  const { chain } = useNetwork();

  if (status === "connected")
    return (
      <div className=" border rounded p-2 pt-4 border-white/20">
        <div className="flex mb-3 justify-between">
          <div className="flex">
            <Starknet className="w-8 px-1" />
            <div className="self-center"> {chain?.name}</div>
          </div>
          <div>
            <Button
              variant="outline"
              size={"xs"}
              className=""
              onClick={() => disconnect()}
            >
              <LogOut className="self-center w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 align-items-center space-x-3">
          <div className="px-4 pt-4 pb-2 border rounded border-white/20">
            <div className="text-2xl flex">
              <EthereumLogo className="w-4 mr-2" />
              {formatBigInt(balances.l2.eth, 3)}
            </div>
          </div>
          <div className="px-4 pt-4 pb-2 border rounded   flex justify-between border-white/20">
            <div className="text-2xl flex">
              <Lords className="w-6 fill-current pr-2" />
              {balances.l2.lords && balances.l2.lords > 0
                ? formatBigInt(balances.l2.lords, 3)
                : 0}
            </div>
            <Button
              href="/bridge"
              size={"xs"}
              variant={"subtle"}
              className="self-center"
            >
              Bridge
            </Button>
          </div>
        </div>
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
          <Starknet className="w-8 px-1" /> Connect Starknet Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full min-w-[350px] !pt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          //className="fixed top-0 left-0 z-50 h-full w-72 bg-grey-11 md:w-[70vw]"
        >
          <DialogHeader>
            <h6 className="text-base -mt-3 mb-6">Connect Starknet Wallet</h6>
          </DialogHeader>
          <div className="self-center flex space-y-2 flex-col">
            {connectors.map((connector) => {
              if (connector.available()) {
                return (
                  <Button
                    className="self-center w-full justify-between px-4 capitalize text-lg font-light py-6 font-sans"
                    variant={"outline"}
                    size={"lg"}
                    key={connector.id}
                    onClick={() => connect(connector)}
                  >
                    {connector.id.replace(/([A-Z])/g, " $1") ??
                      "Continue with email"}
                    {connector.icon ? (
                      <img className="w-6 mr-3" src={connector.icon} alt="" />
                    ) : (
                      <Mail className="mr-3 " />
                    )}
                  </Button>
                );
              }
            })}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default StarkLogin;
