import { ActivityCardSkeleton } from "@/app/collection/[id]/(list)/activity/ActivityCardSkeleton";

export default function Loading() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <ActivityCardSkeleton key={i} />
      ))}
    </>
  );
}
