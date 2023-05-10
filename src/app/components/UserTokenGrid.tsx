import { getData } from "@/functions";
import UserTokenCard from "./UserTokenCard";
import { UserTokenData } from "@/types";
import { Suspense } from "react";
import UserTokenGridSkeleton from "./UserTokenGridSkeleton";

async function UserTokenGrid({ address, continuation }: { address: string, continuation: string | undefined }) {

  const data = await getData({ address, continuation }, "user");

  const tokens: UserTokenData[] = data.tokens;

  return (
    <>
      <div className="my-3 grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tokens.map((token) => (
          <UserTokenCard key={token.token.tokenId} token={token} />
        ))}
      </div>
      {data.continuation && <Suspense fallback=<UserTokenGridSkeleton />>
        {/** @ts-expect-error Server Component */}
        <UserTokenGrid address={address} continuation={data.continuation} />
      </Suspense>
      }
    </>
  );
}

export default UserTokenGrid;