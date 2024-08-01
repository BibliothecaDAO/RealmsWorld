import React, { useState } from "react"; // Ensure React is imported if not already
import Image from "next/image";
import EthereumLogo from "@/icons/ethereum.svg";
import { formatUnits } from "viem";

import type { DaoAccounts } from "@realms-world/constants";

import type { EthplorerAddressInfoResponse, EthplorerToken } from "./page";
import LordsChart from "./LordsChart";

export const Treasury = ({
  accounts,
}: {
  accounts: Record<
    string,
    {
      name: string;
      address: string;
      value: number;
      ETH: {
        price: {
          rate: string;
          ts: number;
        };
        rawBalance: string;
      };
      tokens: EthplorerToken[];
    }
  >;
}) => {
  // State to keep track of the selected row using DaoAccounts enum
  const [selectedAccount, setSelectedAccount] = useState<DaoAccounts | null>(
    null,
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-full md:flex md:min-w-0">
          <div className="w-full md:w-3/5">
            <p className="pb-4">
              These accounts are governed by the DAO using Frontinus House.
              Anyone is able to make a proposal to be voted on.
            </p>
            <div className="table w-full">
              <div className="table-header-group">
                <div className="table-cell flex-grow border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </div>
                <div className="table-cell flex-grow border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Total USD Value
                </div>
              </div>
              {Object.entries(accounts).map(([key, account], index) => (
                <div
                  className={`table-row  ${selectedAccount === (key as DaoAccounts) ? "bg-bright-yellow/50" : "hover:bg-bright-yellow/20"}`}
                  onClick={() => setSelectedAccount(key as DaoAccounts)}
                  onKeyDown={(event) =>
                    event.key === "Enter" &&
                    setSelectedAccount(key as DaoAccounts)
                  }
                  tabIndex={0}
                  role="button"
                  key={index}
                >
                  <div className="table-cell flex-grow whitespace-nowrap px-6 py-4">
                    <span className="text-lg">{key}</span>
                    <br />
                    {/*<span className="opacity-40">{account.description}</span>*/}
                  </div>
                  <div className="flex-grow whitespace-nowrap px-6 py-4">
                    ${account.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <LordsChart accounts={accounts} />
          </div>
        </div>
        <AccountView
          account={selectedAccount ? accounts[selectedAccount] : undefined}
        />
      </div>
    </>
  );
};

const AccountView = ({
  account,
}: {
  account?: Partial<EthplorerAddressInfoResponse>;
}) => {
  return (
    <div className="mt-12 overflow-x-auto">
      <div className="min-w-full">
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-cell border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Token Name
            </div>
            <div className="table-cell border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Balance
            </div>
            <div className="table-cell border-b px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Total USD
            </div>
          </div>
          {parseFloat(account?.ETH?.rawBalance ?? "0") > 0 && (
            <div className="table-row hover:bg-bright-yellow/20">
              <div className="table-cell whitespace-nowrap px-6 py-4">
                Ether
              </div>
              <div className="table-cell whitespace-nowrap px-6 py-4">
                <span className="flex">
                  <EthereumLogo className="mr-2 w-6" />
                  {formatUnits(BigInt(account?.ETH?.rawBalance ?? 0), 18)}
                </span>
              </div>
              <div className="table-cell whitespace-nowrap px-6 py-4">
                $
                {(account?.ETH?.price.rate
                  ? parseFloat(
                      formatUnits(BigInt(account.ETH.rawBalance), 18),
                    ) * parseFloat(account.ETH.price.rate)
                  : 0
                ).toLocaleString()}
              </div>
            </div>
          )}
          {account?.tokens?.map((token, index) => (
            <div className="table-row hover:bg-bright-yellow/20" key={index}>
              <div className="table-cell whitespace-nowrap px-6 py-4">
                {token.tokenInfo.name}
              </div>
              <div className="table-cell whitespace-nowrap px-6 py-4">
                <span className="flex">
                  <Image
                    className="mr-2"
                    src={`https://ethplorer.io${token.tokenInfo.image}`}
                    alt={token.tokenInfo.name}
                    width={24}
                    height={24}
                  />
                  {parseFloat(
                    formatUnits(
                      BigInt(token.rawBalance),
                      parseInt(token.tokenInfo.decimals),
                    ),
                  ).toLocaleString()}
                </span>
              </div>

              <div className="table-cell whitespace-nowrap px-6 py-4">
                $
                {(
                  token.tokenInfo.price.rate *
                  parseFloat(
                    formatUnits(
                      BigInt(token.rawBalance),
                      parseInt(token.tokenInfo.decimals),
                    ),
                  )
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
