
import { useEffect, useState } from "react";

import { useArkClient } from "@/lib/ark/useArkClient";
import type { CollectionToken } from "@/types/ark";
import type { RouterOutputs } from "@realms-world/api";
import { getToken } from "@/lib/ark/getToken";

export function useTokenMetadata(token: CollectionToken | RouterOutputs["erc721Tokens"]["all"]["items"][number]) {
  const { marketplace: arkClient } = useArkClient();
  const [metadata, setMetadata] = useState(() => token.metadata);
  useEffect(() => {
    async function fetchListings() {
      const m = await getToken({ client: arkClient, contractAddress: token.collection_address, tokenId: token.token_id });
      setMetadata(m.data.metadata);
    }
    if (null === metadata || undefined === metadata) {

      fetchListings().catch(console.error)
    }
  }, [token, arkClient])

  if (undefined === metadata || null === metadata) return null;

  return metadata;
}
