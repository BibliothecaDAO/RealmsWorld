import { CollectionActivitySkeleton } from "@/app/(app)/collection/[id]/(list)/activity/CollectionActivity";

import { ActivityCardSkeleton } from "./ActivityCardSkeleton";

export default function Loading() {
  return (
    <div className="flex">
      <CollectionActivitySkeleton />

      <div className="grid flex-grow grid-cols-1">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
        {[...Array(6)].map((_, i) => (
          <ActivityCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
