"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { formatBigInt } from "../../lib/utils";

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
    <div className="h-full justify-center pb-4 text-end">
      <span className="text-sm text-white/50">Available Balance</span>
      <div className="flex justify-end">
        <div className="flex text-sm">
          {isLoading || typeof balanceState != "bigint" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
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
