import { MAX_SELECTED_ITEMS } from "@/hooks/useNftSelection";
import Bridge from "@/icons/bridge.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { XIcon } from "lucide-react";
import { CollectionAddresses } from "@realms-world/constants";
import type { ChainId } from "@realms-world/constants";
import { Badge } from "@realms-world/ui/components/ui/badge";
import { Button } from "@realms-world/ui/components/ui/button";

export const NftActions = ({
  selectedTokenIds,
  selectBatchNfts,
  totalSelectedNfts,
  batchTokenIds,
  sourceChain,
  deselectAllNfts,
}: {
  selectedTokenIds: string[];
  selectBatchNfts: (contractAddress: string, tokenIds: string[]) => void;
  sourceChain: ChainId;
  totalSelectedNfts: number;
  batchTokenIds?: string[];
  deselectAllNfts: () => void;
}) => {
  const { toggleNftBridge, setNftBridgeModalProps } = useUIStore(
    (state) => state,
  );
  const isAllSelected =
    totalSelectedNfts === MAX_SELECTED_ITEMS ||
    totalSelectedNfts === batchTokenIds?.length;
  const hasMoreThanMaxSelectNfts =
    batchTokenIds && batchTokenIds.length > MAX_SELECTED_ITEMS;

  let batchData: { contractAddress: string; tokenIds: string[] };
  if (batchTokenIds?.[0] && CollectionAddresses.realms[sourceChain]) {
    /*let contractAddress = "0x";
    if ("token" in tokens[0]) {
      contractAddress = tokens[0]?.token?.contract ?? "0x";
    } else if ("contract_address" in tokens[0]) {
      contractAddress = tokens[0]?.contract_address ?? "0x";
    }*/
    /*const tokenIds = tokens.map((token) => {
      if ("token" in token) {
        return token.token?.tokenId ?? "";
      } else if ("contract_address" in token) {
        return token.token_id.toString();
      } else {
        return "";
      }
    });*/
    batchData = {
      contractAddress: CollectionAddresses.realms[sourceChain],
      tokenIds: batchTokenIds,
    };
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
