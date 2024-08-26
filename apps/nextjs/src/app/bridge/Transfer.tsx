"use client";

import { useState } from "react";
import Link from "next/link";
import { EthereumLoginButton } from "@/app/_components/wallet/EthereumLoginButton";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import { ActionType, TransferToL1Steps } from "@/constants/transferSteps";
import { useWriteInitiateWithdrawLords } from "@/hooks/bridge/useWriteInitiateWithdrawLords";
import { useTransfer } from "@/hooks/useTransfer";
//import { useTransferToL1 } from "@/hooks/useTransferToL1";
import { useTransferToL2 } from "@/hooks/useTransferToL2";
import EthereumLogo from "@/icons/ethereum.svg";
import LordsIcon from "@/icons/lords.svg";
import StarknetLogo from "@/icons/starknet.svg";
import { useAccount } from "@starknet-react/core";
import { ArrowUpDown } from "lucide-react";
import { formatEther } from "viem";
import { useAccount as useL1Account } from "wagmi";

import { Badge, Button, Input } from "@realms-world/ui";

import { useWalletsProviderContext } from "../../providers/WalletsProvider";
import { TokenBalance } from "./TokenBalance";

export const Transfer = ({ action }: { action: string }) => {
  const { address: l1Address } = useL1Account();
  const { address: l2Address } = useAccount();
  // const [toastOpen, setToastOpen] = useState(false);
  const [amount, setAmount] = useState<string>("0");
  const { balances } = useWalletsProviderContext();
  const { sendAsync: iniateWithdrawal } = useWriteInitiateWithdrawLords({
    amount,
  });
  const { handleData } = useTransfer(TransferToL1Steps);

  const transferToL2 = useTransferToL2();

  const onTransferClick = async () => {
    if (action == "withdraw") {
      const data = await iniateWithdrawal();
      if (data.transaction_hash) {
        handleData({
          type: ActionType.TRANSFER_TO_L1,
          sender: l2Address,
          recipient: l1Address,
          name: "Lords",
          symbol: "LORDS",
          amount: amount,
          l2hash: data.transaction_hash,
        });
      }
    } else {
      if (l2Address) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        transferToL2({ amount, l2Address });
      }
    }
  };

  const renderNetwork = (
    networkName: string,
    networkLogo: JSX.Element,
    isWithdraw: boolean,
    isL2?: boolean,
  ) => {
    return (
      <>
        <div className="relative -mt-1 flex items-center justify-between">
          <div className="flex-col">
            <Badge variant={"secondary"} className="bg-background">
              {isWithdraw ? "From" : "To"}
            </Badge>
            <div className="mb-4 mt-1 flex text-lg">
              <div className="mr-2 h-[36px] w-[36px] self-center rounded-full bg-background">
                {networkLogo}
              </div>
              <h5 className="self-center">{networkName}</h5>
            </div>
          </div>
          <TokenBalance
            onClick={() =>
              setAmount(
                isL2
                  ? formatEther(balances.l2.lords ?? BigInt(0))
                  : formatEther(balances.l1.lords ?? BigInt(0)),
              )
            }
            balance={
              isL2
                ? (balances.l2.lords ?? BigInt(0))
                : (balances.l1.lords ?? BigInt(0))
            }
            symbol="Lords"
            isLoading={isL2 ? !balances.l2.lords : false}
          />
        </div>
      </>
    );
  };

  const renderL1Network = (action: string) => {
    return renderNetwork(
      "Ethereum",
      <EthereumLogo className="m-auto mt-1 h-7 w-7" />,
      action != "withdraw",
    );
  };

  const renderL2Network = (action: string) => {
    return renderNetwork(
      "Starknet",
      <StarknetLogo className="m-auto mt-1 h-7 w-7" />,
      action == "withdraw",
      true,
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
          {action == "withdraw"
            ? renderL2Network(action)
            : renderL1Network(action)}
          {renderTokenInput()}
          {/*allowance: {allowance?.toString()}*/}
        </div>

        <Link
          className="w-full"
          href={`/bridge?action=${action == "deposit" ? "withdraw" : "deposit"
            }`}
        >
          <div className="absolute left-1/2 z-10 -ml-4 -mt-5 flex h-8 w-8 rounded-2xl border border-white/5 bg-bright-yellow/60 stroke-black hover:bg-white/90">
            <ArrowUpDown
              className={`${action == "deposit" ? "rotate-180" : ""
                } m-auto h-4 w-4 transform self-center stroke-inherit duration-300`}
            />
          </div>
        </Link>

        <div className="relative mb-4 flex flex-col rounded border border-white/5 bg-white/10 p-4">
          {action == "withdraw"
            ? renderL1Network(action)
            : renderL2Network(action)}
        </div>
        <div className="flex gap-x-4 p-2">
          {!l1Address && <EthereumLoginButton />}
          {!l2Address && <StarknetLoginButton />}
          {l1Address && l2Address && (
            <Button
              className="mt-2 w-full"
              onClick={() => onTransferClick()}
              size={"lg"}
              disabled={amount == "0"}
              variant={"default"}
            >
              {amount == "0"
                ? "Please Enter Amount"
                : action == "deposit"
                  ? "Transfer to L2"
                  : "Transfer to L1"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
