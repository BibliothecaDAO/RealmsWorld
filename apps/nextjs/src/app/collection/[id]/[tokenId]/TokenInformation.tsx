import Image from "next/image";
import Link from "next/link";
import { erc721Tokens } from "@/constants/erc721Tokens";
import type { Attributes, Collection, Token } from "@/types";
import { shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";

import { TokenAttribute } from "./TokenAttribute";

export const TokenInformation = ({
  token,
  children,
  collection,
  collectionId,
}: {
  token: Pick<
    Token,
    "image" | "name" | "tokenId" | "owner" | "attributes" | "contract"
  >;
  collection: Collection | null;
  collectionId: string;
  children: React.ReactNode;
}) => {
  const isBeasts = collectionId == "beasts";
  return (
    <>
      <div className="flex w-full flex-none flex-col rounded-t md:w-1/2 lg:mt-12">
        {token.image && (
          <Image
            src={token.image}
            alt={token.name ?? "token"}
            width={1000}
            height={1000}
            className={`mx-auto border ${isBeasts && "my-auto max-w-[350px]"}`}
          />
        )}
        {/*isBeasts && (
          <Image
            src={
              "https://loot-survivor.vercel.app/monsters/" +
              decodeURIComponent(token.metadata.name)
                .toLowerCase()
                .replace('"0 0" ', "") +
              ".png"
            }
            alt={token.name ?? "token"}
            width={1000}
            height={1000}
            className="mx-auto mt-6  border bg-black"
          />
          )*/}
        {collection && (
          <div className="my-2 grid grid-cols-2 gap-2">
            {token.attributes.map((attribute: Attributes, index) => (
              <TokenAttribute
                key={index}
                attributeTokenCount={attribute.tokenCount}
                collectionTokenCount={parseInt(collection.tokenCount)}
                contractId={token.contract}
                floorAskPrice={attribute.floorAskPrice}
                title={attribute.key}
                value={attribute.value}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full py-4 md:w-1/2 md:p-8">
        <Link
          className="flex opacity-70 hover:opacity-100"
          href={`/collection/${collectionId}`}
        >
          <ArrowLeft className="mr-2 w-4 self-center" />{" "}
          {erc721Tokens[collectionId as keyof typeof erc721Tokens].name}
        </Link>

        <h1>{decodeURIComponent(token.name)}</h1>
        <div className="flex space-x-4 text-lg">
          <span>ID:</span> <span>#{token.tokenId ?? token.token_id}</span>
        </div>
        {token.owner && (
          <div className="flex space-x-4 text-lg">
            <div>Owner </div>
            <Link href={`/user/${token.owner}`}>{shortenHex(token.owner)}</Link>
          </div>
        )}

        {/*collectionId == "beasts" && token.metadata?.type && (
                    <div className="my-2 flex flex-wrap">
                      {token.metadata.map((attribute: Attributes, index) => (
                        <TokenAttribute
                          key={index}
                          attributeTokenCount={attribute.tokenCount}
                          collectionTokenCount={parseInt(collection.tokenCount)}
                          contractId={token.contract}
                          floorAskPrice={attribute.floorAskPrice}
                          title={attribute.key}
                          value={attribute.value}
                        />
                      ))}
                    </div>
                      )*/}
        {collectionId == "beasts" && token.metadata?.attributes?.length && (
          <div className="bg-dark-green mt-4 rounded border">
            <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
              <h5>Type:</h5>
              <span className="text-xl">
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "type",
                  )?.value
                }
              </span>
            </div>
            <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
              <h5>Tier: </h5>
              <span className="text-xl">
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "tier",
                  )?.value
                }
              </span>
            </div>

            <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
              <h5>Level: </h5>
              <span className="text-xl">
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "level",
                  )?.value
                }
              </span>
            </div>
            <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
              <h5>Health: </h5>
              <span className="text-xl">
                {
                  token.metadata?.attributes.find(
                    (trait) => trait.trait_type === "health",
                  )?.value
                }
              </span>
            </div>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
