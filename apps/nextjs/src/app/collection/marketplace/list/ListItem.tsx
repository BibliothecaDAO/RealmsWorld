import type { ExpirationOption } from "@/types";
import type { ReservoirChain } from "@reservoir0x/reservoir-sdk";
import type { CSS } from "@stitches/react";
import type { FC } from "react";
import React from "react";
import Image from "next/image";
import { useTimeDiff } from "@/hooks/useTimeDiff";
import Starknet from "@/icons/starknet.svg";

import type { RouterOutputs } from "@realms-world/api";
import { formatBN } from "@realms-world/utils";

interface ListItemProps {
  token:
    | RouterOutputs["erc721Tokens"]["all"]["items"][number]
    | RouterOutputs["erc721Tokens"]["byId"];
  price?: number;
  quantity?: number;
  chain?: ReservoirChain | null;
  expirationOption?: ExpirationOption;
  containerCss?: CSS;
}

const ListIem: FC<ListItemProps> = ({
  token,
  price,
  chain,
  expirationOption,
  containerCss,
}) => {
  const expirationDisplay =
    expirationOption?.value === "custom" && expirationOption.relativeTime
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useTimeDiff(expirationOption.relativeTime)
      : `in ${expirationOption?.text.toLowerCase()}`;

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    <div className={"flex items-center justify-between p-4 " + containerCss}>
      <div className="flex items-center gap-3 overflow-hidden">
        {token?.image && (
          <Image
            src={token?.image}
            alt={token?.name ?? "token"}
            height={56}
            width={56}
            className="aspect-square"
          />
        )}
        <div className="flex flex-col gap-1 overflow-hidden">
          <h6 className="text-ellipsify">
            {token?.token_id ? `#${token?.token_id}` : token?.name}
          </h6>
          <div className="flex items-center gap-1">
            {/*<span className="text-ellipsify">{collection?.name}</span>*/}
            {chain && !expirationOption ? (
              <>
                <Starknet />
                <span className="text-ellipsify">Starknet</span>
              </>
            ) : null}
          </div>
          {/*quantity && quantity > 1 ? (
            <Flex
              css={{
                width: 'max-content',
                backgroundColor: '$neutralBg',
                borderRadius: 4,
                py: '$1',
                px: '$2',
              }}
            >
              <Text style="body3" color="subtle" ellipsify>
                {quantity} items
              </Text>
            </div>
            ) : null*/}
        </div>
      </div>

      <div className="flex flex-shrink flex-col items-end gap-1 overflow-hidden">
        {price && formatBN(price, 4, 18)}
        {expirationOption ? <span>Expires {expirationDisplay}</span> : null}
      </div>
    </div>
  );
};

export default ListIem;
