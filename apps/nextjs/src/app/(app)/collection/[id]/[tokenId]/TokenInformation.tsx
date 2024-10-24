import type { Attributes } from "@/types";
import type { paths } from "@reservoir0x/reservoir-sdk";
import Image from "next/image";
import Link from "next/link";
import { CollectionDetails } from "@realms-world/constants";
import { shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui/components/ui/button";

import { ContractImage } from "./ContractImage";
import { TokenAttribute } from "./TokenAttribute";
import Media from "@/app/_components/Media";

export const TokenInformation = ({
  children,
  collection,
  collectionId,
  tokenId,
  name,
  owner,
  image,
  attributes,
  imageMediaKey,
}: {
  collection?: NonNullable<
    paths["/collections/v5"]["get"]["responses"]["200"]["schema"]["collections"]
  >[number];
  collectionId: string;
  children?: React.ReactNode;
  name?: string | null;
  owner?: string | null;
  image?: string | null;
  imageMediaKey?: string;
  attributes?:
    | Attributes[]
    | NonNullable<RouterOutputs["erc721Tokens"]["byId"]>["attributes"];
  tokenId: number;
}) => {
  return (
    <>
      <div className="flex w-full flex-none flex-col md:w-1/3">
        {image ? (
          <Media
            mediaKey={imageMediaKey}
            src={image}
            alt={name ?? "token"}
            width={1000}
            height={1000}
            className={`mx-auto border-2`}
          />
        ) : (
          <ContractImage tokenId={tokenId} collectionId={collectionId} />
        )}
        {attributes?.length ? (
          <div className="my-4 grid grid-cols-3 gap-4">
            {attributes.map((attribute, index) => {
              if ("tokenCount" in attribute) {
                return (
                  <TokenAttribute
                    key={index}
                    attributeTokenCount={attribute.tokenCount}
                    collectionTokenCount={
                      collection?.tokenCount
                        ? parseInt(collection.tokenCount)
                        : undefined
                    }
                    contractId={collectionId}
                    floorAskPrice={attribute.floorAskPrice}
                    title={attribute.key}
                    value={attribute.value}
                  />
                );
              } else {
                return (
                  <TokenAttribute
                    key={index}
                    collectionTokenCount={
                      collection?.tokenCount
                        ? parseInt(collection.tokenCount)
                        : undefined
                    }
                    contractId={collectionId}
                    title={attribute.key}
                    value={attribute.value}
                  />
                );
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-1 w-full px-4 md:w-2/3 md:px-4">
        <div className="flex justify-between">
          <Link
            className="font-sans text-lg tracking-wider"
            href={`/collection/${collectionId}`}
          >
            {
              CollectionDetails[collectionId as keyof typeof CollectionDetails]
                .displayName
            }
          </Link>
          <div className="flex space-x-4 text-lg">
            <span>#{tokenId}</span>
          </div>
        </div>

        <h1 className="mb-8 font-sans-serif text-5xl">
          {decodeURIComponent(name ?? "")}
        </h1>
        {owner && (
          <div className="flex space-x-6 text-lg">
            <div className="self-center">Owner </div>
            <Button variant={"ghost"} asChild>
              <Link href={`/user/${owner}`}>{shortenHex(owner, 8)}</Link>
            </Button>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
