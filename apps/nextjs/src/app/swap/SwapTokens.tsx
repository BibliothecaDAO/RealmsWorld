"use client";

import type { Quote } from "@avnu/avnu-sdk";
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { NETWORK_NAME, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { executeSwap, fetchQuotes } from "@avnu/avnu-sdk";
import { useAccount } from "@starknet-react/core";
import { parseUnits } from "ethers";
import { formatEther } from "viem";

import { LORDS } from "@realms-world/constants";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from "@realms-world/ui";

import { TokenBalance } from "../bridge/TokenBalance";
import { useWalletsProviderContext } from "../providers/WalletsProvider";

const AVNU_OPTIONS = {
  baseUrl: `https://${NETWORK_NAME == "MAIN" ? "starknet" : "goerli"}.api.avnu.fi`,
};

const ethAddress =
  "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

export const SwapTokens = () => {
  const [sellAmount, setSellAmount] = useState<string>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { account } = useAccount();
  const { balances, l2loading } = useWalletsProviderContext();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!account) return;
    setErrorMessage("");
    setQuotes([]);
    setSellAmount(event.target.value);
    setLoading(true);
    const params = {
      sellTokenAddress: ethAddress,
      buyTokenAddress: LORDS[SUPPORTED_L2_CHAIN_ID]?.address ?? "0x",
      sellAmount: parseUnits(event.target.value, 18),
      takerAddress: account.address,
      size: 1,
    };
    fetchQuotes(params, AVNU_OPTIONS)
      .then((quotes) => {
        setLoading(false);
        setQuotes(quotes);
      })
      .catch(() => setLoading(false));
  };

  const handleSwap = async () => {
    if (!account || !sellAmount || !quotes?.[0]) return;
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    executeSwap(account, quotes[0], {}, AVNU_OPTIONS)
      .then(() => {
        setSuccessMessage("success");
        setLoading(false);
        setQuotes([]);
      })
      .catch((error: Error) => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  };

  /*if (!account) {
    return <button onClick={handleConnect}>Connect Wallet</button>
  }*/

  const supportedTokens = [{
    ETH: {
      decimals: 18
    },
    USDC: { 
      decimals: 6
    }
  }]

  return (
    <div className="container mx-auto mt-24 max-w-[460px]">
      <div className="rounded border bg-black/20  p-4 focus-within:!border-bright-yellow/80 hover:border-bright-yellow/40">
        <p className="text-sm">You pay</p>
        <div className="flex">
        <Input
          className="mb-0 flex-grow-1 !bg-transparent text-3xl focus:ring-0"
          onChange={handleChangeInput}
          //disabled={loading}
          placeholder="0"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded" variant={"outline"}>
              Direction
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {supportedTokens.map((token, index)=> 
            <DropdownMenuItem key={index} defaultValue={'ETH'}>{token.ETH.decimals}</DropdownMenuItem>

            )}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <TokenBalance
          onClick={() => setSellAmount(balances.l2?.eth?.toString() ?? "0")}
          balance={balances.l2?.eth ?? BigInt(0)}
          symbol="Lords"
          isLoading={l2loading && !balances.l2?.lords}
        />
      </div>
      <div>&darr;</div>
      <div className="rounded border p-4">
        <p className="text-xl">You receive</p>
        <Input
          readOnly
          placeholder="0"
          type="text"
          disabled={loading}
          id="buy-amount"
          value={quotes?.[0] ? formatEther(quotes[0].buyAmount) : ""}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        quotes?.[0] && <button onClick={handleSwap}>Swap</button>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>Success</p>}
    </div>
  );
};
