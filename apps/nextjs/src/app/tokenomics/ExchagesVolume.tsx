import React from "react"; // Ensure React is imported if not already

import ExchagesVolumeChart from "./ExchagesVolumeChart";

export const ExchagesVolume = ({
  exchangesVolume,
}: {
  exchangesVolume: {
    exchange: string;
    value: number;
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
              {Object.entries(exchangesVolume).map(([key, exchange]) => (
                <div className={`table-row`} key={key}>
                  <div className="table-cell flex-grow whitespace-nowrap px-6 py-4">
                    <span className="text-lg">{exchange.exchange}</span>
                  </div>
                  <div className="flex-grow whitespace-nowrap px-6 py-4">
                    ${exchange.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <ExchagesVolumeChart exchangesVolume={exchangesVolume} />
          </div>
        </div>
      </div>
    </>
  );
};
