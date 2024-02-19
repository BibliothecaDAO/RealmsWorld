/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ActivityCardSkeleton } from "@/app/collection/[id]/(list)/activity/ActivityCardSkeleton";

export default function Loading() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <ActivityCardSkeleton key={i} />
      ))}
    </>
  );
}
