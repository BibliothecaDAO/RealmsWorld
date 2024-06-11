"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NftActions } from "@/app/account/assets/NftActions";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import useNftSelection from "@/hooks/useNftSelection";
import { cleanQuery } from "@/lib/reservoir/getToken";
import { useUIStore } from "@/providers/UIStoreProvider";
import { api } from "@/trpc/react";
import { useInView } from "framer-motion";

import type { RouterInputs } from "@realms-world/api";
import { getCollectionFromAddress } from "@realms-world/constants";

import { TokenCardSkeleton } from "../../TokenCardSkeleton";
import { L2ERC721Card } from "./L2ERC721Card";

const L2ERC721Table = ({
  contractAddress,
  ownerAddress,
  infiniteScroll = true,
  loadMoreAssetName = "",
  limit = 24,
  selectable = false,
}: {
  contractAddress: string;
  ownerAddress?: string;
  infiniteScroll?: boolean;
  loadMoreAssetName?: string;
  limit?: number;
  selectable?: boolean;
}) => {
  const { isGrid } = useUIStore((state) => state);
  const grid =
    "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1 w-full";

  const ref = useRef(null);

  const searchParams = useSearchParams();

  const sortDirection = searchParams.get("sortDirection");
  const sortBy = searchParams.get("sortBy");
  const buyNowOnly = searchParams.get("Status");

  const attributesObject: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    attributesObject[key] = value;
  }
  const attributeFilter = cleanQuery(attributesObject);

  const filters: RouterInputs["erc721Tokens"]["all"] = {
    limit,
    contractAddress,
    attributeFilter: attributeFilter,
    sortDirection: sortDirection,
    orderBy: sortBy,
    buyNowOnly: buyNowOnly == "Buy Now Only",
  };

  if (ownerAddress) {
    filters.owner = ownerAddress;
  }

  const [erc721Tokens, { fetchNextPage, hasNextPage, isFetching }] =
    api.erc721Tokens.all.useSuspenseInfiniteQuery(filters, {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      refetchInterval: 30000,
    });

  const isInView = useInView(ref, { once: false });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isInView && infiniteScroll) fetchNextPage();
  }, [fetchNextPage, infiniteScroll, isInView]);

  const {
    deselectAllNfts,
    isNftSelected,
    selectBatchNfts,
    //selectedCollectionAddress,
    toggleNftSelection,
    totalSelectedNfts,
    selectedTokenIds,
  } = useNftSelection({ userAddress: ownerAddress as `0x${string}` });

  return (
    <>
      {selectable && erc721Tokens.pages[0]?.items.length ? (
        <NftActions
          selectedTokenIds={selectedTokenIds}
          totalSelectedNfts={totalSelectedNfts}
          selectBatchNfts={selectBatchNfts}
          tokens={erc721Tokens.pages[0]?.items}
          deselectAllNfts={deselectAllNfts}
          sourceChain={SUPPORTED_L2_CHAIN_ID}
        />
      ) : null}
      <div className={isGrid ? grid : list}>
        {erc721Tokens.pages[0]?.items.length
          ? erc721Tokens.pages.map((page) =>
              page.items.map((token, index) => {
                const isSelected = isNftSelected(
                  token.token_id.toString(),
                  token.contract_address ?? "0x",
                );
                return (
                  <>
                    {selectable ? (
                      <button
                        key={index}
                        onClick={() =>
                          toggleNftSelection(
                            token.token_id.toString(),
                            token.contract_address ?? "0x",
                          )
                        }
                      >
                        <L2ERC721Card
                          selectable
                          isSelected={isSelected}
                          token={token}
                          layout={isGrid ? "grid" : "list"}
                        />
                      </button>
                    ) : (
                      <Link
                        href={`/collection/${token.contract_address && getCollectionFromAddress(token.contract_address)}/${
                          token.token_id
                        }`}
                        className={`${isGrid ? "" : "flex"}`}
                      >
                        <L2ERC721Card
                          key={index}
                          token={token}
                          layout={isGrid ? "grid" : "list"}
                        />
                      </Link>
                    )}
                  </>
                );
              }),
            )
          : "No Assets Found"}
        {!infiniteScroll &&
          erc721Tokens.pages[0]?.items.length !== undefined &&
          erc721Tokens.pages[0]?.items.length > 9 && (
            <Link href={`/user/${ownerAddress}/${loadMoreAssetName}`}>
              <div
                className={`group flex min-h-[454px] transform cursor-pointer items-center justify-center border-2 bg-dark-green duration-300 hover:border-bright-yellow`}
              >
                <h2>View more</h2>
              </div>
            </Link>
          )}

        {infiniteScroll &&
          isFetching &&
          hasNextPage &&
          Array.from({ length: 3 }).map((_, index) => (
            <TokenCardSkeleton key={index} />
          ))}
      </div>
      {infiniteScroll && <div className="col-span-12 mt-6" ref={ref} />}
    </>
  );
};
export default L2ERC721Table;
