import Image from "next/image";
import Link from "next/link";
import { erc721Tokens } from "@/constants/erc721Tokens";
import type { Attributes, Collection, Token } from "@/types";
import type { RouterOutputs } from "@/utils/api";
import { shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";

import { ContractImage } from "./ContractImage";
import { TokenAttribute } from "./TokenAttribute";

export const TokenInformation = ({
  children,
  collection,
  collectionId,
  tokenId,
  name,
  owner,
  image,
  attributes,
}: {
  collection?: Collection;
  collectionId: string;
  children?: React.ReactNode;
  name: string;
  owner: string;
  image?: string;
  attributes?: any;
  tokenId: number;
}) => {
  const isBeasts = collectionId == "beasts";

  return (
    <>
      <div className="flex w-full flex-none flex-col rounded-t md:w-1/2 lg:mt-12">
        {image ? (
          <Image
            src={image}
            alt={name ?? "token"}
            width={1000}
            height={1000}
            className={`mx-auto border`}
          />
        ) : (
          <ContractImage tokenId={tokenId} collectionId={collectionId} />
        )}
        {attributes?.length && (
          <div className="my-2 grid grid-cols-3 gap-2">
            {attributes.map((attribute: Attributes, index) => (
              <TokenAttribute
                key={index}
                attributeTokenCount={attribute.tokenCount ?? undefined}
                collectionTokenCount={parseInt(collection?.tokenCount ?? null)}
                //contractId={token.contract}
                floorAskPrice={attribute.floorAskPrice}
                title={attribute.key ?? attribute.trait_type}
                value={attribute.value}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full py-4 md:w-1/2 md:p-8">
        <div className="flex justify-between">
          <Link
            className="flex opacity-70 hover:opacity-100"
            href={`/collection/${collectionId}`}
          >
            <ArrowLeft className="mr-2 w-4 self-center" />{" "}
            {erc721Tokens[collectionId as keyof typeof erc721Tokens].name}
          </Link>
          <div className="flex space-x-4 text-lg">
            <span>ID:</span> <span>#{tokenId}</span>
          </div>
        </div>

        <h1>{decodeURIComponent(name ?? "")}</h1>
        {owner && (
          <div className="flex space-x-6 text-lg">
            <div>Owner </div>
            <Link href={`/user/${owner}`}>{shortenHex(owner, 8)}</Link>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
