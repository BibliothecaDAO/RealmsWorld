import { formatEther } from "viem";

export const TokenBalance = ({
  balance,
  symbol,
}: {
  balance: bigint;
  symbol: string;
}) => {
  return (
    <div className="h-full justify-center text-end pb-4">
      <span className="text-sm text-white/50">Available Balance</span>
      <div className="flex justify-end">
        <div className="flex text-sm">
          {parseInt(formatEther(balance)).toLocaleString()}
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
