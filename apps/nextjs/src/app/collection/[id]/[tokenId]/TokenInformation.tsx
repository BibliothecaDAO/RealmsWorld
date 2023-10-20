import Image from "next/image";
import Link from "next/link";
import type { Collection, Token } from "@/types";
import { shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";

import { TokenAttributes } from "./TokenAttributes";

export const TokenInformation = ({
  token,
  children,
  collection,
  collectionId,
}: {
  token: Token;
  collection: Collection | null;
  collectionId: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="w-full flex-none rounded-t p-2 md:w-1/2">
        {token.image && (
          <Image
            src={token.image}
            alt={token.name ?? "token"}
            width={2000}
            height={2000}
            className="mx-auto border"
          />
        )}
        <div className="my-2 flex flex-wrap">
          {collection && (
            <TokenAttributes token={token} collection={collection} />
          )}
        </div>
      </div>
      <div className="w-auto p-4 md:w-1/2 md:p-8">
        <Link
          className="flex opacity-70 hover:opacity-100"
          href={`/collection/${collectionId}`}
        >
          <ArrowLeft className="mr-2 w-4 self-center" />{" "}
          {"collection" in token && token.collection.name}
        </Link>

        <h1>
          {token.name}
          <span>#{token.tokenId}</span>
        </h1>
        {token.owner && (
          <div className="flex space-x-4">
            <div>owner </div>
            <Link href={`/user/${token.owner}`}>{shortenHex(token.owner)}</Link>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
