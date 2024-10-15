"use client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@realms-world/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@realms-world/ui/components/ui/dialog";
import { ScrollArea } from "@realms-world/ui/components/ui/scroll-area";

import type { Filters } from "@/types/ark";
import { getCollectionTraits } from "@/lib/ark/getCollectionTraits";
import CollectionFiltersTrait from "./CollectionFiltersTrait";
import { useArkClient } from "@/lib/ark/useArkClient";
import CollectionFiltersContent from "./CollectionFiltersContent";
import { useState } from "react";

interface CollectionFiltersProps {
  collectionAddress: string;
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => Promise<void>;
  isOpen: boolean;
  buyNow: boolean;
  setBuyNow: (buyNow: boolean) => void;
}

export default function CollectionFilters({
  collectionAddress,
  filters,
  onFiltersChange,
  isOpen,
  buyNow,
  setBuyNow,
}: CollectionFiltersProps) {
  const { marketplace: arkClient } = useArkClient();

  const { data } = useSuspenseQuery({
    queryKey: ["collectionTraits", collectionAddress],
    queryFn: async () => {
      return await getCollectionTraits({
        client: arkClient,
        collectionAddress,
      });
    },
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleTraitChange = async (name: string, value: string) => {
    const values = filters.traits[name] ?? [];

    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    const traits = Object.fromEntries(
      Object.entries({
        ...filters.traits,
        [name]: newValues,
      }).filter(([_, v]) => v.length > 0),
    );

    await onFiltersChange({
      ...filters,
      traits,
    });
  };

  if (!isOpen) {
    return null;
  }

  const filteredData =
    data &&
    Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        const filtered = Object.fromEntries(
          Object.entries(value).filter(([k]) =>
            k.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );

        return [key, filtered];
      }),
    );

  const hasTraits =
    filteredData &&
    Object.values(filteredData).some((trait) => Object.keys(trait).length > 0);

  const showTraitsSection = data && Object.keys(data).length > 0;

  return (
    <ScrollArea className="!sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] w-64 flex-shrink-0 border-r border-border lg:block">
      <CollectionFiltersContent buyNow={buyNow} setBuyNow={setBuyNow} />
      {showTraitsSection && (
        <div className="">
          <div className="px-5 pb-4 font-sans text-xl tracking-wider">
            Traits
          </div>
          {/*<div className="px-4 pb-4">
            <SearchInput
              value={searchQuery}
              className="h-10"
              placeholder="Search"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
      </div>*/}
          <div className="flex flex-col gap-2">
            {/*searchQuery.length > 0 && !hasTraits && (
              <div className="px-5">
                <div className="mb-2 text-sm text-muted-foreground">
                  No traits found for "{searchQuery}"
                </div>
              </div>
            )*/}
            {Object.keys(filteredData).map((key: string) => (
              <CollectionFiltersTrait
                key={key}
                name={key}
                trait={filteredData[key] ?? {}}
                selectedTraits={filters.traits}
                onChange={handleTraitChange}
              />
            ))}
          </div>
        </div>
      )}
    </ScrollArea>
  );
}
