"use client";
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
  return (
    <div className="h-full justify-center text-end pb-4">
      <span className="text-sm text-white/50">Available Balance</span>
      <div className="flex justify-end">
        <div className="flex text-sm">
          {isLoading || !balance ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            formatBigInt(balance, 3)
              .toLocaleString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
