"use client";
import { formatEther } from "viem";
import { formatBigInt } from "../lib/utils";

export const TokenBalance = ({
  balance,
  symbol,
}: {
  balance: any;
  symbol: string;
}) => {
  return (
    <div className="h-full justify-center text-end pb-4">
      <span className="text-sm text-white/50">Available Balance</span>
      <div className="flex justify-end">
        <div className="flex text-sm">
          {formatBigInt(balance, 3)
            .toLocaleString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
