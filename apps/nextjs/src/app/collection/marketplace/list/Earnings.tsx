import type { FC } from "react";
import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Tooltip,
  TooltipProvider,
} from "@realms-world/ui";
import { formatBN } from "@realms-world/utils";

interface EarningsBreakdownProps {
  price: number;
  usdPrice?: number;
  quantity: number;
  collection?: any;
  royaltiesBps: number;
}

const Earnings: FC<EarningsBreakdownProps> = ({
  price,
  usdPrice,
  quantity,
  collection,
  royaltiesBps,
}) => {
  const profit = (1 - (royaltiesBps || 0) * 0.0001) * Number(price) * quantity;
  100;

  if (Number(price) > 0 && royaltiesBps) {
    return (
      <Collapsible
        className="w-full overflow-visible"
        style={{ width: "100%", borderRadius: 0, overflow: "visible" }}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant={"ghost"}
            className="flex	 w-full items-start justify-between"
          >
            <div className="flex items-center gap-2">
              <h6 className="mt-0">Total Earnings</h6>
              <span>
                <FontAwesomeIcon icon={faChevronDown} width={16} height={16} />
              </span>
            </div>
            <div className="flex flex-col items-end">
              {formatBN(profit, 3, 18)}
              {usdPrice ? formatBN(profit * (usdPrice || 0), 3, 18) : null}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-lg">Total Listing Value</span>
              {formatBN(Number(price) * quantity, 3, 18)}
            </div>
            {royaltiesBps ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">Creator Royalties</span>
                  <TooltipProvider>
                    <Tooltip
                      side="right"
                      width={200}
                      content={
                        "A fee on every order that goes to the collection creator."
                      }
                    />
                  </TooltipProvider>
                </div>

                <div className="flex items-center gap-1">
                  <span>-</span>
                  {formatBN(
                    quantity * Number(price) * (royaltiesBps || 0) * 0.0001,
                    3,
                    18,
                  )}
                </div>
              </div>
            ) : null}
            {/*marketplace?.fee?.bps ? (
            <Flex justify="between" align="center">
              <Text style="subtitle2" color="subtle">
                {marketplace?.name || "Marketplace"} Fee
              </Text>

              <Flex align="center" css={{ gap: "$1" }}>
                <Text style="subtitle2" color="subtle">
                  -
                </Text>
                <FormatCryptoCurrency
                  amount={
                    quantity * Number(price) * (marketplace?.fee?.percent / 100)
                  }
                  address={currency.contract}
                  symbol={currency.symbol}
                  textStyle="subtitle2"
                  textColor="subtle"
                />
              </div>
            </div>
                ) : null*/}
            <hr />
            <div className="flex items-center justify-between">
              <span className="text-lg">Total Earnings</span>
              {formatBN(profit, 3, 18)}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="flex w-full items-start justify-between">
      <h6>Total Earnings</h6>
      <div className="flex flex-col items-end">
        <h6>{formatBN(profit, 3, 18)}</h6>

        {usdPrice ? formatBN(profit * (usdPrice || 0), 3, 18) : null}
      </div>
    </div>
  );
};

export default Earnings;
