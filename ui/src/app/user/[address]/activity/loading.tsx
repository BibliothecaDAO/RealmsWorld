import { ActivityCardSkeleton } from "@/app/components/ActivityCardSkeleton";

export default function Loading() {

    return (
        <>
            {[...Array(6)].map((_, i) => (
                <ActivityCardSkeleton key={i} />
            ))}
        </>
    );
}