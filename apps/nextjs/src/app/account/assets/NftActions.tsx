import type { paths } from "@reservoir0x/reservoir-sdk";
import { MAX_SELECTED_ITEMS } from "@/hooks/useNftSelection";
import Bridge from "@/icons/bridge.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { XIcon } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import type { ChainId } from "@realms-world/constants";
import { Badge, Button } from "@realms-world/ui";

type L1orL2Tokens =
  | NonNullable<
      paths["/tokens/v7"]["get"]["responses"]["200"]["schema"]["tokens"]
    >
  | NonNullable<
      paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"]["tokens"]
    >
  | RouterOutputs["erc721Tokens"]["all"]["items"];

export const NftActions = ({
  selectedTokenIds,
  selectBatchNfts,
  totalSelectedNfts,
  tokens,
  sourceChain,
  deselectAllNfts,
}: {
  selectedTokenIds: string[];
  selectBatchNfts: (contractAddress: string, tokenIds: string[]) => void;
  sourceChain: ChainId;
  totalSelectedNfts: number;
  tokens: L1orL2Tokens;
  deselectAllNfts: () => void;
}) => {
  const { toggleNftBridge, setNftBridgeModalProps } = useUIStore(
    (state) => state,
  );
  const isAllSelected =
    totalSelectedNfts === MAX_SELECTED_ITEMS ||
    totalSelectedNfts === tokens.length;
  const hasMoreThanMaxSelectNfts = tokens.length > MAX_SELECTED_ITEMS;

  let batchData: { contractAddress: string; tokenIds: string[] };
  if (tokens[0]) {
    let contractAddress = "0x";
    if ("token" in tokens[0]) {
      contractAddress = tokens[0]?.token?.contract ?? "0x";
    } else if ("contract_address" in tokens[0]) {
      contractAddress = tokens[0]?.contract_address ?? "0x";
    }
    const tokenIds = tokens.map((token) => {
      if ("token" in token) {
        return token.token?.tokenId ?? "";
      } else if ("contract_address" in token) {
        return token.token_id.toString();
      } else {
        return "";
      }
    });
    batchData = { contractAddress, tokenIds };
    /*} else if ("contract_address" in tokens[0]) {
      batchData = tokens[0]?.contract_address ?? "0x";
    } else {
      batchData = "0x";
    }*/
  }
  return (
    <div className="my-2 flex w-full justify-between">
      <div className="flex items-center gap-x-4">
        <span className="text-lg">Actions:</span>
        <Button
          onClick={() => {
            setNftBridgeModalProps({
              selectedTokenIds: selectedTokenIds,
              sourceChain: sourceChain,
            });
            toggleNftBridge();
            /*writeAsync({
                tokenIds: selectedTokenIds.map((id) => BigInt(id)),
                l2Address,
              })*/
          }}
          disabled={totalSelectedNfts < 1}
        >
          <Bridge className="mr-2 w-6" />
          Bridge
        </Button>
      </div>
      <div className="flex items-center gap-x-4">
        <Badge variant={"outline"} className="h-6 font-bold">
          {totalSelectedNfts} Realms
        </Badge>

        {isAllSelected ? (
          <Button
            variant={"secondary"}
            className="flex"
            onClick={deselectAllNfts}
            size="sm"
          >
            Deselect All
            <XIcon className="ml-2" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              selectBatchNfts(batchData.contractAddress, batchData.tokenIds);
            }}
            color="default"
            size="sm"
          >
            <span>
              {hasMoreThanMaxSelectNfts ? "Select 30 Max" : "Select All"}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
