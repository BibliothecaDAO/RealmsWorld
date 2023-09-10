"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { EthereumLoginButton } from "@/app/_components/wallet/EthereumLoginButton";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import { useTransferToL1 } from "@/hooks/useTransferToL1";
import { useTransferToL2 } from "@/hooks/useTransferToL2";
import EthereumLogo from "@/icons/ethereum.svgr";
import LordsIcon from "@/icons/lords.svgr";
import StarknetLogo from "@/icons/starknet.svgr";
import { useAccount } from "@starknet-react/core";
import { ArrowUpDown } from "lucide-react";
import { useAccount as useL1Account } from "wagmi";

import { useWalletsProviderContext } from "../providers/WalletsProvider";
import { TokenBalance } from "./TokenBalance";

export const Transfer = ({ action }: { action: string }) => {
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useAccount();
  // const [toastOpen, setToastOpen] = useState(false);
  const [amount, setAmount] = useState("0");
  const { balances, l2loading } = useWalletsProviderContext();

  const transferToL1 = useTransferToL1();
  const transferToL2 = useTransferToL2();

  const onTransferClick = async () => {
    if (action == "withdraw") {
      transferToL1(amount);
    } else {
      transferToL2(amount);
    }
  };

  const renderNetwork = (
    networkName: string,
    networkLogo: JSX.Element,
    isWithdraw: boolean,
  ) => {
    return (
      <>
        <div className="relative flex items-center justify-between">
          <div className="flex-col">
            <span className="rounded border border-white/20 bg-white/40 px-2 text-xs font-bold uppercase tracking-wide text-white/50">
              {isWithdraw ? "from" : "to"}
            </span>
            <div className="my-1 flex text-lg ">
              <div className="mr-2 h-[32px] w-[32px] self-center rounded-full bg-white">
                {networkLogo}
              </div>
              <h5 className="self-center">{networkName}</h5>
            </div>
          </div>
          <TokenBalance
            balance={
              isWithdraw
                ? balances.l2?.lords || BigInt(0)
                : balances.l1?.lords || BigInt(0)
            }
            symbol="Lords"
            isLoading={isWithdraw ? l2loading : false}
          />
        </div>
      </>
    );
  };

  const renderL1Network = () => {
    return renderNetwork(
      "Ethereum",
      <EthereumLogo className="m-auto mt-1 h-6 w-6" />,
      action != "withdraw",
    );
  };

  const renderL2Network = () => {
    return renderNetwork(
      "Starknet",
      <StarknetLogo className="m-auto mt-1 h-6 w-6" />,
      action == "withdraw",
    );
  };
  const renderTokenInput = () => {
    return (
      <div className="relative w-full">
        <Input
          min={0}
          max={1000}
          value={amount}
          placeholder="0.00"
          className="h-14 p-4 text-lg leading-6 placeholder:text-white/30 hover:bg-black/30"
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <div className="absolute right-0 top-0 flex pr-4 pt-4">
          <LordsIcon className="mr-3 h-6 w-6 fill-white" />
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="relative">
        <div className="relative mb-2 rounded border border-white/5 bg-white/10 p-4">
          {action == "withdraw" ? renderL2Network() : renderL1Network()}
          {renderTokenInput()}
          {/*allowance: {allowance?.toString()}*/}
        </div>

        <Link
          className="w-full"
          href={`/bridge?action=${
            action == "deposit" ? "withdraw" : "deposit"
          }`}
        >
          <div className="absolute left-1/2 z-10 -ml-4 -mt-5 flex h-8 w-8 rounded-2xl border border-white/5 bg-white stroke-black hover:bg-white/90">
            <ArrowUpDown
              className={`${
                action == "deposit" ? "rotate-180" : ""
              } m-auto h-4 w-4 transform self-center stroke-inherit duration-300`}
            />
          </div>
        </Link>

        <div className="relative mb-4  flex flex-col rounded border border-white/5 bg-white/10 p-4">
          {action == "withdraw" ? renderL1Network() : renderL2Network()}
        </div>

        {!l1Account && <EthereumLoginButton />}
        {!l2Account && <StarknetLoginButton />}
        {l1Account && l2Account && (
          <Button
            className="mt-2 w-full"
            onClick={() => onTransferClick()}
            size={"lg"}
            disabled={amount == "0"}
            variant={"default"}
          >
            {!amount
              ? "Please Enter Amount"
              : action == "deposit"
              ? "Transfer to L2"
              : "Transfer to L1"}
          </Button>
        )}
      </div>
    </>
  );
};
