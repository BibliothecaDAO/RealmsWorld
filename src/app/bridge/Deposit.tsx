"use client";
import { useAccount } from "@starknet-react/core";
import NumberSelect from "../components/NumberSelect";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "../components/ui/select";
import { Tabs } from "@/app/components/Tabs";
import { useAccount as useL1Account } from "wagmi";
import { ConnectKitButton } from "connectkit";
import StarkLogin from "../components/wallet/StarkLogin";
import { useBridgeContract } from "@/composables/useBridgeContract";
import { parseEther } from "viem";
import { useState } from "react";
import { Input } from "../components/ui/input";

export const Deposit = () => {
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useAccount();

  const { deposit } = useBridgeContract();
  const [amount, setAmount] = useState("0");

  const onTransferToL2 = () => {
    deposit({
      args: [amount, l2Account, 1],
      value: parseEther("0.0001"),
    });
  };
  return (
    <div>
      <div className="flex flex-col mb-8">
        From Ethereum
        <div className="flex">
          <Input
            min={0}
            max={1000}
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
          <div className="w-24 text-center">Lords</div>
        </div>
      </div>
      <div className="flex flex-col mb-8">To Starknet</div>
      {!l1Account && (
        <ConnectKitButton.Custom>
          {({ isConnected, show, address }) => {
            return (
              <Button className="w-full" onClick={show}>
                {isConnected ? address : "Connect L1 Wallet"}
              </Button>
            );
          }}
        </ConnectKitButton.Custom>
      )}
      {!l2Account && <StarkLogin />}
      {l1Account && l2Account && (
        <Button onClick={() => onTransferToL2()}>Transfer to L2</Button>
      )}
    </div>
  );
};
