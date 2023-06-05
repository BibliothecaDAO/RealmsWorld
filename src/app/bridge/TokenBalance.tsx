import { formatEther, formatGwei } from "viem";

export const TokenBalance = ({
  balance,
  symbol,
}: {
  balance: bigint;
  symbol: string;
}) => {
  return (
    <div className="right-0 absolute">
      <span className="text-sm">Available Balance</span>
      <div className="flex justify-end align-center">
        <div className="flex text-sm">
          {parseInt(formatEther(balance)).toLocaleString()}
          <div className="mx-2">{symbol}</div>
        </div>
        {/*<RefreshIcon
            size={RefreshIconSize.SMALL}
            onClick={onRefreshClick}
    />*/}
      </div>
    </div>
  );
};
