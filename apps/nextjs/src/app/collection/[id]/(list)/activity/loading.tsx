import { CollectionActivitySkeleton } from "@/app/collection/CollectionActivity";

import { ActivityCardSkeleton } from "./ActivityCardSkeleton";

export default function Loading() {
  return (
    <div className="flex">
      <CollectionActivitySkeleton />

      <div className="grid flex-grow grid-cols-1">
        {[...Array(6)].map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
