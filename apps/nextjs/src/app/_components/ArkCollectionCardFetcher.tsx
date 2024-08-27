"use client"

import type { RealmsL2CollectionInfo } from "@realms-world/constants/src/Collections";

import { getCollections } from "@/lib/ark/getCollection";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { CollectionCard } from "./CollectionCard";
import { useArkClient } from "@/lib/ark/useArkClient";
import { useEffect, useState } from "react";
import type { Collection } from "@/types/ark";


interface ArkCollectionCardFetcherProps {
  source: RealmsL2CollectionInfo
}

export const ArkCollectionCardFetcher = ({ source }: ArkCollectionCardFetcherProps) => {
  const { marketplace: arkClient } = useArkClient();
  const [collection, setCollection] = useState<Collection | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      const collectionAddress = source.addresses[SUPPORTED_L2_CHAIN_ID] as `0x${string}`;
      const { data } = await getCollections({ client: arkClient, collectionAddress });
      setCollection(data)
    }
    fetchCollection().catch(console.error);
  }, [source, arkClient]);

  return <CollectionCard
    name={source.name}
    price={collection?.floor ?? 0}
    symbol={"LORDS"}
    image={source.image}
    link={source.link}
  />;
}
