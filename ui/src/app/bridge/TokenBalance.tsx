"use client";
import { useState, useEffect } from "react";
import { formatBigInt } from "../lib/utils";
import { Loader2 } from "lucide-react";
export const TokenBalance = ({
  balance,
  symbol,
  isLoading,
}: {
  balance: any;
  symbol: string;
  isLoading?: boolean;
}) => {
  const [balanceState, setBalanceState] = useState();
  useEffect(() => {
    setBalanceState(balance);
  }, [balance]);

  return (
    <div className="h-full justify-center text-end pb-4">
      <span className="text-sm text-white/50">Available Balance</span>
      <div className="flex justify-end">
        <div className="flex text-sm">
          {isLoading || typeof balanceState != "bigint" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : balanceState ? (
            formatBigInt(balanceState, 3)
              .toLocaleString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          ) : (
            "0"
          )}
          <div className="ml-2">{symbol}</div>
        </div>
        {/*<RefreshIcon
            size={RefreshIconSize.SMALL}
            onClick={onRefreshClick}
    />*/}
      </div>
    </div>
  );
};
