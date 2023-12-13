import Image from "next/image";
import Link from "next/link";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import { erc721Tokens } from "@/constants/erc721Tokens";
import type { Attributes, Collection, Token } from "@/types";
import { shortenHex } from "@/utils/utils";
import { useContractRead } from "@starknet-react/core";
import { ArrowLeft } from "lucide-react";

import { ContractImage } from "./ContractImage";
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

  const attributes = token.attributes ?? token.metadata?.attributes;

  return (
    <>
      <div className="flex w-full flex-none flex-col rounded-t md:w-1/2 lg:mt-12">
        {token.image ? (
          <Image
            src={token.image}
            alt={token.name ?? "token"}
            width={1000}
            height={1000}
            className={`mx-auto border ${isBeasts && "my-auto max-w-[350px]"}`}
          />
        ) : (
          <ContractImage token={token} collectionId={collectionId} />
        )}
        {attributes?.length && (
          <div className="my-2 grid grid-cols-2 gap-2">
            {attributes.map((attribute: Attributes, index) => (
              <TokenAttribute
                key={index}
                attributeTokenCount={attribute.tokenCount ?? undefined}
                collectionTokenCount={parseInt(collection?.tokenCount ?? null)}
                contractId={token.contract}
                floorAskPrice={attribute.floorAskPrice}
                title={attribute.key ?? attribute.trait_type}
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

        <h1>{decodeURIComponent(token.name ?? "")}</h1>
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
        {children}
      </div>
    </>
  );
};
