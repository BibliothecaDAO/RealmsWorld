"use client";

import type { Quote } from "@avnu/avnu-sdk";
import type { ChangeEvent } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { NETWORK_NAME, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import useDebounce from "@/hooks/useDebounce";
import LordsIcon from "@/icons/lords.svg";
import { executeSwap, fetchQuotes } from "@avnu/avnu-sdk";
import { useAccount, useBalance } from "@starknet-react/core";
import { ArrowUpDown } from "lucide-react";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";

import { LORDS } from "@realms-world/constants";
import { SUPPORTED_TOKENS } from "@realms-world/constants/src/Tokens";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@realms-world/ui";

import { StarknetLoginButton } from "../_components/wallet/StarknetLoginButton";
import { useWalletsProviderContext } from "../../providers/WalletsProvider";
import { TokenBalance } from "../bridge/TokenBalance";

const AVNU_OPTIONS = {
  baseUrl: `https://${NETWORK_NAME == "MAIN" ? "starknet" : "sepolia"}.api.avnu.fi`,
};

export const SwapTokens = ({
  initialLordsSupply,
  showSwitchButton = true,
}: {
  initialLordsSupply?: string | null;
  showSwitchButton?: boolean;
}) => {
  const [isBuyLords, setIsBuyLords] = useState(true);
  const [sellAmount, setSellAmount] = useState<string>();
  const [buyAmount, setBuyAmount] = useState<string>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const { address, account } = useAccount();
  const { balances, l2loading } = useWalletsProviderContext();
  const [selectedToken, setSelectedToken] = useState("ETH");

  const getTokenBySymbol = (symbol: string) => {
    const token = SUPPORTED_TOKENS[SUPPORTED_L2_CHAIN_ID].find(
      (token) => token.symbol === symbol,
    );
    return token;
  };
  const selectedTokenObj = useMemo(() => {
    return getTokenBySymbol(selectedToken);
  }, [selectedToken]);

  const { data } = useBalance({
    address,
    token: selectedTokenObj?.address,
    watch: false,
  });
  const isDebouncing = useDebounce(sellAmount, 350) !== sellAmount;
  const isBuyInputDebouncing = useDebounce(buyAmount, 350) !== buyAmount;

  useEffect(() => {
    if (initialLordsSupply) setBuyAmount(initialLordsSupply);
  }, [initialLordsSupply]);

  const fetchSellAmountFromBuyAmount = useCallback(() => {
    if (!selectedTokenObj || !buyAmount || isBuyInputDebouncing) return;
    setLoading(true);
    const params = {
      sellTokenAddress: isBuyLords
        ? selectedTokenObj.address
        : LORDS[SUPPORTED_L2_CHAIN_ID]?.address ?? "0x",
      buyTokenAddress: isBuyLords
        ? LORDS[SUPPORTED_L2_CHAIN_ID]?.address ?? "0x"
        : selectedTokenObj.address,
      sellAmount: parseUnits("1", 18),
      takerAddress: address,
      size: 1,
    };

    fetchQuotes(params, AVNU_OPTIONS)
      .then((quotes) => {
        setLoading(false);
        if (quotes[0]) {
          // cross-multiplication
          // For 1 unit of tokenA => you get y amount of tokenB
          // Then for x, a specific amount of tokenB => You need to have 1 * x / y
          const sellAmountFromBuyAmount =
            (parseUnits("1", 18) * parseUnits(buyAmount, 18)) /
            quotes[0]?.buyAmount;

          setSellAmount(
            isBuyLords
              ? formatEther(sellAmountFromBuyAmount)
              : formatUnits(quotes[0].buyAmount, selectedTokenObj.decimals),
          );
        }
      })
      .catch(() => setLoading(false));
  }, [address, isBuyLords, isBuyInputDebouncing, selectedTokenObj, buyAmount]);

  const fetchAvnuQuotes = useCallback(() => {
    if (!selectedTokenObj || !sellAmount || isDebouncing) return;
    setLoading(true);
    const params = {
      sellTokenAddress: isBuyLords
        ? selectedTokenObj.address
        : LORDS[SUPPORTED_L2_CHAIN_ID]?.address ?? "0x",
      buyTokenAddress: isBuyLords
        ? LORDS[SUPPORTED_L2_CHAIN_ID]?.address ?? "0x"
        : selectedTokenObj.address,
      sellAmount: parseUnits(
        sellAmount,
        !isBuyLords ? 18 : selectedTokenObj.decimals,
      ),
      takerAddress: address,
      size: 1,
    };
    fetchQuotes(params, AVNU_OPTIONS)
      .then((quotes) => {
        setLoading(false);
        setQuotes(quotes);
      })
      .catch(() => setLoading(false));
  }, [address, isBuyLords, isDebouncing, selectedTokenObj, sellAmount]);

  const sellBalance = !isBuyLords ? balances.l2.lords ?? 0 : data?.value ?? 0;

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setQuotes([]);
    setSellAmount(event.target.value);
  };

  const handleChangeBuyInput = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setQuotes([]);
    setBuyAmount(event.target.value);
  };

  const handleTokenSelect = (event: string) => {
    setLoading(true);
    setQuotes([]);
    if (event == "USDC") {
      setSellAmount(parseFloat(sellAmount ?? "0").toFixed(6));
    }
    setSelectedToken(event);
  };
  const handleSwitch = () => {
    setQuotes([]);
    setIsBuyLords((prevIsBuyLords) => !prevIsBuyLords);
  };

  useEffect(() => {
    if (sellAmount && selectedTokenObj && !isDebouncing) {
      fetchAvnuQuotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyLords, selectedTokenObj, isDebouncing, sellAmount]);

  useEffect(() => {
    if (buyAmount && selectedTokenObj && !isBuyInputDebouncing) {
      fetchSellAmountFromBuyAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyLords, selectedTokenObj, isBuyInputDebouncing, buyAmount]);

  const handleSwap = () => {
    if (!account || !sellAmount || !quotes[0]) return;
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

  const renderTokensInput = () => {
    return (
      <div className="flex pb-2">
        {isBuyLords ? (
          <Input
            disabled={loading}
            className="flex-grow-1 mb-0 !bg-transparent text-xl focus:ring-0"
            onChange={handleChangeInput}
            value={sellAmount}
            //disabled={loading}
            placeholder="0"
          />
        ) : (
          <Input
            onChange={handleChangeBuyInput}
            placeholder="0"
            type="text"
            className="!bg-transparent text-xl placeholder:text-slate-400 focus:ring-0"
            disabled={loading}
            id="buy-amount"
            value={
              quotes[0]
                ? formatUnits(
                    quotes[0].buyAmount,
                    selectedTokenObj?.decimals ?? 18,
                  )
                : buyAmount
            }
          />
        )}
        <div className="grow-0">
          <Select value={selectedToken} onValueChange={handleTokenSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select Token" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_TOKENS[SUPPORTED_L2_CHAIN_ID].filter(
                (token) => token.symbol !== "LORDS",
              ).map((token, index) => (
                <SelectItem key={index} value={token.symbol ?? ""}>
                  <span className="flex pr-6 text-lg">
                    <Image
                      className="mr-2"
                      src={`/tokens/${token.symbol}.svg`}
                      width={20}
                      height={20}
                      alt={token.name ?? ""}
                    />
                    {token.symbol}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderLordsInput = () => {
    return (
      <div className="relative w-full">
        {isBuyLords ? (
          <Input
            onChange={handleChangeBuyInput}
            placeholder="0"
            type="text"
            className="!bg-transparent text-xl placeholder:text-slate-400 focus:ring-0"
            disabled={loading}
            id="buy-amount"
            value={quotes[0] ? formatEther(quotes[0].buyAmount) : buyAmount}
          />
        ) : (
          <Input
            className="flex-grow-1 mb-0 !bg-transparent text-xl focus:ring-0"
            onChange={handleChangeInput}
            value={sellAmount}
            disabled={loading}
            placeholder="0"
          />
        )}
        <div className="absolute right-0 top-0 flex pr-4 pt-2">
          <LordsIcon className="mr-3 h-6 w-6 fill-white" />
        </div>
      </div>
    );
  };

  const buttonContent = () => {
    switch (true) {
      case sellAmount === "0" || !sellAmount:
        return "Enter amount";
      case loading:
        return <p>Loading...</p>;
      case parseEther(sellAmount ?? "0") > sellBalance:
        return "Insufficient Balance";
      case !!quotes[0]:
        return "Swap";

      default:
        return null; // Or any default case you'd like to handle
    }
  };

  return (
    <>
      <div className="rounded border bg-black/20 p-4 focus-within:!border-bright-yellow/80 hover:border-bright-yellow/40">
        <p className="text-sm">You pay</p>
        {isBuyLords ? renderTokensInput() : renderLordsInput()}
        <div className="flex justify-between">
          <span className="text-sm text-bright-yellow/50">
            {quotes[0] && `≈ $${quotes[0]?.buyAmountInUsd.toFixed(2)}`}
          </span>
          <TokenBalance
            onClick={() => setSellAmount(formatEther(BigInt(sellBalance)))}
            balance={sellBalance}
            symbol=""
            isLoading={l2loading && !balances.l2.lords}
          />
        </div>
      </div>
      {showSwitchButton && (
        <button
          className="absolute left-1/2 z-10 -ml-4 -mt-2 flex h-8 w-8 rounded-2xl border border-white/5 bg-bright-yellow/60 stroke-black hover:bg-white/90"
          onClick={() => handleSwitch()}
          tabIndex={0}
        >
          <ArrowUpDown
            className={`${
              isBuyLords ? "rotate-180" : ""
            } m-auto h-4 w-4 transform self-center stroke-inherit duration-300`}
          />
        </button>
      )}
      <div className="mt-4 rounded border bg-black/20 p-4 focus-within:!border-bright-yellow/80 hover:border-bright-yellow/40">
        <p className="text-sm">You receive</p>
        {isBuyLords ? renderLordsInput() : renderTokensInput()}
        <span className="text-sm text-bright-yellow/50">
          {quotes[0] && `≈ $${quotes[0]?.sellAmountInUsd.toFixed(2)}`}
        </span>
      </div>
      {!account ? (
        <StarknetLoginButton buttonClass="w-full mt-2" />
      ) : (
        <Button
          disabled={
            loading || !sellAmount || parseEther(sellAmount) > sellBalance
          }
          onClick={handleSwap}
          className="mt-2 w-full"
        >
          {buttonContent()}
        </Button>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>Success</p>}
    </>
  );
};
