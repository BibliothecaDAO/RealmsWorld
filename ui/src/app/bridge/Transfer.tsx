"use client";
import { useAccount } from "@starknet-react/core";

import { Button } from "../components/ui/button";
import { useAccount as useL1Account } from "wagmi";
import { ConnectKitButton } from "connectkit";
import StarkLogin from "@/app/components/wallet/StarkLogin";
import { useBridgeContract } from "@/composables/useBridgeContract";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { useTokenContractAPI } from "@/composables/useTokenContract";
import { tokens, ChainType } from "@/constants/tokens";
import { TokenBalance } from "./TokenBalance";
import EthereumLogo from "@/icons/ethereum.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useTransferToL2 } from "@/composables/useTransferToL2";
import { useTransferToL1 } from "@/composables/useTransferToL1";
import LordsIcon from "@/icons/lords.svg";
import { Toast, ToastDescription, ToastTitle } from "../components/ui/toast";
import { useWalletsProviderContext } from "../providers/WalletsProvider";

const network =
  process.env.NEXT_PUBLIC_IS_TESTNET === "true" ? "GOERLI" : "MAIN";

export const Transfer = ({ action }: { action: string }) => {
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useAccount();
  const [toastOpen, setToastOpen] = useState(false);
  const { amount, setAmount, calls } = useBridgeContract();
  const { balances } = useWalletsProviderContext();

  const transferToL1 = useTransferToL1();
  const transferToL2 = useTransferToL2();

  const onTransferClick = async () => {
    if (action == "withdraw") {
      transferToL1(amount);
    } else {
      transferToL2(amount);
    }
  };

  const renderL1Network = () => {
    return (
      <>
        <div className="relative flex items-center justify-between">
          <div className="flex-col">
            <span className="px-2 text-xs tracking-wide text-black/60 font-bold uppercase rounded bg-white/40">
              From
            </span>
            <div className="flex text-lg my-1 ">
              <div className="mr-2 bg-white rounded-full h-[32px] w-[32px] self-center">
                <div className="w-4 h-4 m-auto mt-0.5">
                  <EthereumLogo />
                </div>
              </div>
              <h5 className="self-center">Ethereum</h5>
            </div>
          </div>
          <TokenBalance
            balance={balances.l1?.lords || BigInt(0)}
            symbol="Lords"
          />
        </div>
      </>
    );
  };
  const renderL2Network = () => {
    return (
      <>
        <div className="relative flex items-center justify-between">
          <div className="flex-col">
            <span className="px-2 text-xs tracking-wide text-black/60 font-bold uppercase rounded bg-white/40">
              To
            </span>
            <div className="flex text-lg my-1">
              <div className="mr-2 bg-white rounded-full h-[32px] w-[32px] self-center">
                <div className="w-6 h-6 m-auto mt-1">
                  <StarknetLogo />
                </div>
              </div>
              <h5 className="self-center">Starknet</h5>
            </div>
          </div>

          <TokenBalance
            balance={balances.l2?.lords || BigInt(0)}
            symbol="Lords"
          />
        </div>
      </>
    );
  };
  const renderTokenInput = () => {
    return (
      <div className="w-full relative">
        <Input
          min={0}
          max={1000}
          value={amount}
          placeholder="0.00"
          className="leading-6 p-4 h-14 text-lg placeholder:text-white/30 hover:bg-black/30"
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <div className="absolute right-0 top-0 pt-4 pr-4 flex">
          <LordsIcon className="fill-white w-6 h-6 mr-3" />
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="mb-2 bg-white/10 rounded p-4 relative border border-white/5">
        {action == "withdraw" ? renderL2Network() : renderL1Network()}
        {renderTokenInput()}
        {/*allowance: {allowance?.toString()}*/}
      </div>

      <Link
        href={`/bridge?action=${action == "deposit" ? "withdraw" : "deposit"}`}
      >
        <div className="w-8 h-8 border absolute left-1/2 -mt-5 -ml-4 rounded-2xl stroke-black hover:bg-white/90 flex bg-white z-10 border-white/5">
          <ArrowUpDown className={`${action == "deposit" ? "rotate-180" : ""} w-4 h-4 m-auto stroke-inherit self-center duration-300 transform`} />
        </div>
      </Link>

      <div className="flex flex-col  bg-white/10 rounded p-4 relative border border-white/5">
        {action == "withdraw" ? renderL1Network() : renderL2Network()}
      </div>

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
        <Button
          className="w-full mt-2"
          onClick={() => onTransferClick()}
          size={"lg"}
          disabled={!amount}
          variant={'default'}
        >
          {!amount
            ? "Please Enter Amount"
            : action == "deposit"
              ? "Transfer to L2"
              : "Transfer to L1"}
        </Button>
      )}
    </div>
  );
};
