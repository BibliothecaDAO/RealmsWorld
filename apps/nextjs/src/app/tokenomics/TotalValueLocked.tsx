import React from "react"; // Ensure React is imported if not already

import TotalValueLockedChart from "./TotalValueLockedChart";

export const TotalValueLocked = ({
  totalValueLocked,
}: {
  totalValueLocked: {
    exchange: string;
    valueUsd: number;
  }[];
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-full md:flex md:min-w-0">
          <div className="w-full md:w-3/5">
            <div className="table w-full">
              <div className="table-header-group">
                <div className="table-cell flex-grow border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </div>
                <div className="table-cell flex-grow border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Total USD Value
                </div>
              </div>
              {Object.entries(totalValueLocked).map(([key, exchange]) => (
                <div className={`table-row`} key={key}>
                  <div className="table-cell flex-grow whitespace-nowrap px-6 py-4">
                    <span className="text-lg">{exchange.exchange}</span>
                  </div>
                  <div className="flex-grow whitespace-nowrap px-6 py-4">
                    ${exchange.valueUsd.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <TotalValueLockedChart totalValueLocked={totalValueLocked} />
          </div>
        </div>
      </div>
    </>
  );
};
