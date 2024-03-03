import type { UserTokenData } from "@/types";
import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { getUser } from "@/lib/reservoir/getUser";

import UserTokenCard from "./UserTokenCard";

async function UserTokenGrid({
  address,
  continuation,
}: {
  address: string;
  continuation: string | undefined;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    tokens,
    continuation: dataContinuation,
  }: { tokens: UserTokenData[]; continuation: string } = await getUser({
    address,
    continuation,
  });

  return (
    <>
      <div className="my-3 grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tokens?.map((token) => (
          <UserTokenCard key={token.token.tokenId} token={token} />
        ))}
      </div>
      {dataContinuation && (
        <Suspense fallback={<LoadingSkeletonGrid />}>
          <UserTokenGrid address={address} continuation={dataContinuation} />
        </Suspense>
      )}
    </>
  );
}

export default UserTokenGrid;
