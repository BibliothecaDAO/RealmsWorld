import { Suspense, useDeferredValue, useState } from "react";
import { DelegateCardSkeleton } from "@/components/modules/governance/delegate-card-skeleton";
import DelegateList from "@/components/modules/governance/delegate-list";
import { DelegateListActions } from "@/components/modules/governance/delegate-list-actions";
import { Input } from "@/components/ui/input";
import { getDelegatesQueryOptions } from "@/lib/getDelegates";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/delegate/list")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      getDelegatesQueryOptions({
        limit: 200,
        cursor: 0,
        search: "",
        orderBy: "random",
      }),
    );
  },
});

function RouteComponent() {
  // Local state for the search string.
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [sortMethod, setSortMethod] = useState<"desc" | "random">("random");

  return (
    <div className="h-screen min-w-0 overflow-auto">
      {/* Sticky search input */}
      <div className="bg-card/85 top-0 z-10 mb-4 flex items-center justify-between gap-3 rounded-xl border p-2 backdrop-blur-sm sm:sticky sm:gap-6 sm:p-3">
        <Input
          type="text"
          className="h-12 min-w-0 flex-1 rounded border p-3"
          placeholder="Search delegates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <DelegateListActions onSortChange={setSortMethod} />
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 p-1 sm:gap-6 sm:p-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <DelegateCardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <DelegateList
          searchQuery={deferredSearchQuery}
          sortMethod={sortMethod}
        />
      </Suspense>
    </div>
  );
}
