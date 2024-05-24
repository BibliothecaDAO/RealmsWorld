import type { UserTokenData } from "@/types";
import type { paths } from "@reservoir0x/reservoir-sdk";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@realms-world/ui";
import { cn } from "@realms-world/utils";

function UserTokenCard({
  token,
  selected,
  onClick,
}: {
  token: NonNullable<
    paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"]["tokens"]
  >[0];
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick}>
      <div
        className={cn(
          "flex transform flex-col border duration-300 hover:-translate-y-1",
          selected && "border-bright-yellow ring ring-bright-yellow",
        )}
      >
        {token?.token?.image && (
          <Image
            src={token?.token?.image}
            alt={"Image for: " + token?.token?.name}
            className="mx-auto "
            width={400}
            height={400}
          />
        )}
        {onClick !== undefined && (
          <div
            className={cn(
              "absolute right-2 top-2 h-5 w-5 flex-shrink-0 rounded-full shadow-lg",
              selected
                ? "border-[5px] border-primary bg-accent-foreground"
                : "bg-muted-foreground",
            )}
          />
        )}

        <div className="flex h-auto flex-col px-3 pb-4 pt-4">
          <div className="truncate text-sm">#{token?.token?.tokenId}</div>
          <h6>{token?.token?.name}</h6>

          <div className="mt-auto flex justify-between">
            <Link
              href={`/collection/${token?.token?.contract}/${token?.token?.tokenId}`}
            >
              <Button size={"xs"}>details</Button>
            </Link>
          </div>
        </div>
      </div>
    </button>
  );
}

export default UserTokenCard;
