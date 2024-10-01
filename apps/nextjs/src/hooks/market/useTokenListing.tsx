import { useEffect, useState } from "react";

import { getTokenMarketdata } from "@/lib/ark/getTokenMarketdata";
import { useArkClient } from "@/lib/ark/useArkClient";
import type { CollectionToken } from "@/types/ark";
import type { RouterOutputs } from "@realms-world/api";
import { findLowestPriceActiveListing } from "@/utils/getters";

export function useTokenListing(token: CollectionToken | RouterOutputs["erc721Tokens"]["all"]["items"][number]) {
  const { marketplace: arkClient } = useArkClient();
  const [listings, setListings] = useState(() => token.listings);
  useEffect(() => {
    async function fetchListings() {
      const l = await getTokenMarketdata({ client: arkClient, contractAddress: token.collection_address, tokenId: token.token_id });
      setListings(l.data.listings);
    }
    if (null === listings || undefined === listings) {

      fetchListings().catch(console.error)
    }
  }, [token, arkClient])

  if (undefined === listings || null === listings) return null;

  return findLowestPriceActiveListing(listings, token.owner);
}
