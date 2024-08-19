export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center py-20">
      loading....
    </div>
  );
};
