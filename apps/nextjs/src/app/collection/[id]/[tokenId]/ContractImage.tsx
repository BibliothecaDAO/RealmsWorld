/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import Image from "next/image";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useContractRead } from "@starknet-react/core";
import { Loader } from "lucide-react";
import { shortString } from "starknet";

import { getCollectionAddresses } from "@realms-world/constants";

export const ContractImage = ({
  tokenId,
  collectionId,
}: {
  tokenId: number;
  collectionId: string;
}) => {
  const isBeasts = collectionId == "beasts";
  const tokenAddress =
    getCollectionAddresses(collectionId)[SUPPORTED_L2_CHAIN_ID];

  const { data } = useContractRead({
    functionName: "token_uri",
    args: [tokenId],
    abi: L2_C1ERC20,
    address: tokenAddress,
    watch: true,
  });
  const tokenUriData = useMemo(() => {
    //@ts-expect-error data does have length
    if (data?.length) {
      const value = [];
      //@ts-expect-error data does have length
      for (let i = 1; i < data?.length; i++) {
        //@ts-expect-error data does have length
        const result = shortString.decodeShortString(data[i]);
        value.push(result);
      }

      const jsonString = value.join("");
      // eslint-disable-next-line no-control-regex
      const regex = new RegExp("\\u0015", "g");
      const modifiedJsonString = jsonString
        .replace(
          /"name":"(.*?)",/g,
          (match: any, name: any) => `"name":"${name.replaceAll('"', '\\"')}",`,
        )
        .replace(regex, "");
      return JSON.parse(modifiedJsonString);
    }
  }, [data]);
  return (
    <>
      {tokenUriData?.image ? (
        <>
          <h1 className="text-center">{decodeURI(tokenUriData.name)}</h1>
          <Image
            src={tokenUriData.image}
            alt={tokenUriData.name ?? "token"}
            width={1000}
            height={1000}
            className={`mx-auto border ${isBeasts && "my-auto max-w-[350px]"}`}
          />
        </>
      ) : (
        <Loader className="w-30 mx-auto animate-spin" />
      )}

      {collectionId == "beasts" && tokenUriData?.attributes?.length && (
        <div className="mt-4 rounded border bg-dark-green">
          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Type:</h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait: { trait_type: string; value: string | number }) =>
                    trait.trait_type === "type",
                )?.value
              }
            </span>
          </div>
          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Tier: </h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait: { trait_type: string; value: string | number }) =>
                    trait.trait_type === "tier",
                )?.value
              }
            </span>
          </div>

          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Level: </h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait: { trait_type: string; value: string | number }) =>
                    trait.trait_type === "level",
                )?.value
              }
            </span>
          </div>
          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Health: </h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait: { trait_type: string; value: string | number }) =>
                    trait.trait_type === "health",
                )?.value
              }
            </span>
          </div>
        </div>
      )}
    </>
  );
};
