export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center py-20">
      loading....
    </div>
  );
};
