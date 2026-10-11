import type { ReactNode } from "react";
import { getDelegatesQueryOptions } from "@/lib/getDelegates";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

import { DelegateCard } from "./delegate-card";

/** Responsive grid shared by the delegate list, its skeleton and stories. */
export function DelegateGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
}

export function DelegateListEmpty({ searchQuery }: { searchQuery?: string }) {
  return (
    <div className="border-border text-muted-foreground flex flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-12 text-center text-sm">
      <Users className="text-primary size-6" />
      <p className="realm-group-title">No delegates found</p>
      {searchQuery ? <p>Nothing matches “{searchQuery}”.</p> : null}
    </div>
  );
}

function DelegateList({
  searchQuery,
  sortMethod,
}: {
  sortMethod: "desc" | "random";
  searchQuery: string;
}) {
  const delegatesQuery = useSuspenseQuery(
    getDelegatesQueryOptions({
      limit: 200,
      cursor: 0,
      search: searchQuery.toLowerCase(),
      orderBy: sortMethod,
    }),
  );
  const items = delegatesQuery.data.items;
  if (items.length === 0) {
    return <DelegateListEmpty searchQuery={searchQuery} />;
  }
  return (
    <DelegateGrid>
      {items.map((delegate) => (
        <DelegateCard key={delegate.id} delegate={delegate} />
      ))}
    </DelegateGrid>
  );
}

export default DelegateList;
