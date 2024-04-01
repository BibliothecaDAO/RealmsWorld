"use client";

import { useLordsPrice } from "@/hooks/useLordsPrice";

import { Button } from "@realms-world/ui";

import { BaseDashboardCard } from "./BaseDashboardCard";
import LordsChart, { data } from "./LordsChart";

export const DashBoard = () => {
  const { lordsPrice } = useLordsPrice();

  const totalAccounts = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <BaseDashboardCard
        title="USD Price"
        dataTitle={`$${lordsPrice.usdPrice.toLocaleString()}`}
      >
        <Button
          href="https://coinmarketcap.com/currencies/lords/"
          size={"xs"}
          variant={"outline"}
        >
          Coin Gecko
        </Button>
      </BaseDashboardCard>
      <BaseDashboardCard
        title="Holders ETH + Starknet"
        dataTitle={(lordsPrice.holderCount + 85571).toLocaleString()}
      />
      <BaseDashboardCard
        title="Volume 24hrs"
        dataTitle={`$${lordsPrice.volume24hr.toLocaleString()}`}
      />
      <BaseDashboardCard title="Max Supply" dataTitle={`500,000,000`} />
      <BaseDashboardCard
        title="Market Cap"
        dataTitle={`$${lordsPrice.marketCap.toLocaleString()}`}
      />
      <BaseDashboardCard
        title="Total DAO Treasury"
        dataTitle={`$${(totalAccounts * lordsPrice.usdPrice).toLocaleString()}`}
      />
      <BaseDashboardCard
        className="sm:col-span-2 sm:row-span-3"
        title="DAO Controlled Accounts"
        subtitle="Treasury"
      >
        <div className="overflow-x-auto">
          <p className="pb-4">
            These accounts are governed by the DAO using Frontinus House. Anyone
            is able to make a proposal to be voted on.
          </p>
          <div className="min-w-full md:min-w-0">
            <table className="min-w-full divide-y ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    $LORDS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    USD Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900 ">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="text-lg"> {item.name}</span>
                      <br />
                      <span className="opacity-40">{item.description}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {item.value.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      ${(item.value * lordsPrice.usdPrice).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <LordsChart />
      </BaseDashboardCard>
    </div>
  );
};
