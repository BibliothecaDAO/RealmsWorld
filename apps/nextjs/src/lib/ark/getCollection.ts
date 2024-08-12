import type { Collection } from "@/types/ark"
import type { ArkClient } from "./client";

export interface CollectionApiResponse {
  data: Collection;
}

export async function getCollections({ client, collectionAddress }: { client: ArkClient, collectionAddress: string }) {
  try {
    return await client.fetch(`/collections/${collectionAddress}/0x534e5f4d41494e`)
  } catch (error) {
    throw new Error("failed to fetch collection data : " + error)
  }
}
