import type { Attributes, Collection } from "@/types";
import Image from "next/image";
import { erc721Tokens } from "@/constants/erc721Tokens";
import { shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

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
  name: string | null;
  owner: string | null;
  image: string | null;
  attributes?:
    | Attributes[]
    | NonNullable<RouterOutputs["erc721Tokens"]["byId"]>["attributes"];
  tokenId: number;
}) => {
  return (
    <>
      <div className="flex w-full flex-none flex-col md:w-1/3">
        {image ? (
          <Image
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
                        ? parseInt(collection?.tokenCount)
                        : undefined
                    }
                    contractId={collectionId}
                    floorAskPrice={attribute.floorAskPrice}
                    title={attribute.key ?? attribute.key}
                    value={attribute.value}
                  />
                );
              } else {
                return (
                  <TokenAttribute
                    key={index}
                    collectionTokenCount={
                      collection?.tokenCount
                        ? parseInt(collection?.tokenCount)
                        : undefined
                    }
                    contractId={collectionId}
                    title={attribute.key ?? attribute.key}
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
        <div className="mb-8 flex justify-between">
          <Button
            size={"sm"}
            variant={"default"}
            href={`/collection/${collectionId}`}
          >
            <ArrowLeft className="mr-2 w-4 self-center" />{" "}
            <span className="self-center">
              {erc721Tokens[collectionId as keyof typeof erc721Tokens]?.name}
            </span>
          </Button>
          <div className="flex space-x-4 text-lg">
            <span>#{tokenId}</span>
          </div>
        </div>

        <h1 className="mb-8">{decodeURIComponent(name ?? "")}</h1>
        {owner && (
          <div className="flex space-x-6 text-lg">
            <div className="self-center">Owner </div>
            <Button variant={"ghost"} href={`/user/${owner}`}>
              {shortenHex(owner, 8)}
            </Button>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
