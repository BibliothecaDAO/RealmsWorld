import Ouroboros from "../icons/ouroboros.svg";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />;
}

export const LoadingSkeleton = () => {
  return (
    <div className="w-full">
      <Ouroboros />
    </div>
  );
};
