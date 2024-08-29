import type { Collection } from "@/types/ark";

import type { ArkClient } from "./client";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

export interface CollectionApiResponse {
  data: Collection;
}

interface GetCollectionParams {
  client: ArkClient;
  collectionAddress: string;
}

export async function getCollections({
  client,
  collectionAddress,
}: GetCollectionParams): Promise<CollectionApiResponse> {
  try {
    return await client.fetch(
      `/collections/${collectionAddress}/${SUPPORTED_L2_CHAIN_ID}`,
    );
  } catch (error) {
    throw new Error("failed to fetch collection data : " + (error as string));
  }
}
