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
      <div className="grid grid-cols-3 gap-3 my-3">
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