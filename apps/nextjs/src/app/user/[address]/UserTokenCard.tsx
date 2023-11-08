import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import type { UserTokenData } from "@/types";

function UserTokenCard({ token }: { token: UserTokenData }) {
  return (
    <div className="flex transform flex-col border duration-300   hover:-translate-y-1">
      {token.token.image && (
        <Image
          src={token.token.image}
          alt={"Image for: " + token.token.name}
          className="mx-auto "
          width={400}
          height={400}
        />
      )}
      <div className="flex h-auto flex-col px-3 pb-4 pt-4">
        <div className="truncate text-sm">#{token.token.tokenId}</div>
        <h6>{token.token.name}</h6>

        <div className="mt-auto flex justify-between">
          <Button
            size={"xs"}
            href={`/collection/${token.token.contract}/${token.token.tokenId}`}
          >
            details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserTokenCard;
