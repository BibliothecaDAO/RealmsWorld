import Image from "next/image";
import Link from "next/link";
import { erc721Tokens } from "@/constants/erc721Tokens";
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
        {collectionId == "beasts" && (
          <Image
            src={
              "https://loot-survivor.vercel.app/monsters/" +
              decodeURIComponent(token.name)
                .toLowerCase()
                .replace('"0 0" ', "") +
              ".png"
            }
            alt={token.name ?? "token"}
            width={2000}
            height={2000}
            className="mx-auto mt-6 border"
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
          {"collection" in token
            ? token.collection.name
            : erc721Tokens[collectionId as keyof typeof erc721Tokens].name}
        </Link>

        <h1>
          {decodeURIComponent(token.name)}
          <span> #{token.tokenId ?? token.token_id}</span>
        </h1>
        {token.owner && (
          <div className="flex space-x-4">
            <div>owner </div>
            <Link href={`/user/${token.owner}`}>{shortenHex(token.owner)}</Link>
          </div>
        )}
        {collectionId == "beasts" && token.metadata?.type && (
          <div className="mt-4">
            <p>Type: {token.metadata?.type}</p>
            <p>Tier: {token.metadata?.tier}</p>
            <p>Level: {token.metadata?.level}</p>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
