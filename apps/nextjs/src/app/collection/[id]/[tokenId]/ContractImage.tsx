"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import L2_C1ERC20 from "@/abi/L2/C1ERC20.json";
import { erc721Tokens } from "@/constants/erc721Tokens";
import type { Attributes, Collection, Token } from "@/types";
import type { RouterOutputs } from "@/utils/api";
import { shortenHex } from "@/utils/utils";
import { useContractRead } from "@starknet-react/core";
import { ArrowLeft, Loader } from "lucide-react";
import { shortString } from "starknet";

import { TokenAttribute } from "./TokenAttribute";

export const ContractImage = ({
  token,
  collectionId,
}: {
  token: RouterOutputs["erc721Tokens"]["byId"];
  collectionId: string;
}) => {
  const isBeasts = collectionId == "beasts";

  const { data, isError, isLoading, error } = useContractRead({
    functionName: "token_uri",
    args: [token?.token_id],
    abi: L2_C1ERC20,
    address: token?.contract_address,
    watch: true,
  });
  const tokenUriData = useMemo(() => {
    if (data?.length) {
      const value = [];
      for (let i = 1; i < data?.length; i++) {
        const result = shortString.decodeShortString(data[i]);
        value.push(result);
      }

      const jsonString = value.join("");
      const regex = new RegExp("\\u0015", "g");
      const modifiedJsonString = jsonString
        .replace(
          /"name":"(.*?)"\,/g,
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
                  (trait) => trait.trait_type === "type",
                )?.value
              }
            </span>
          </div>
          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Tier: </h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait) => trait.trait_type === "tier",
                )?.value
              }
            </span>
          </div>

          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Level: </h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait) => trait.trait_type === "level",
                )?.value
              }
            </span>
          </div>
          <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
            <h5>Health: </h5>
            <span className="text-xl">
              {
                tokenUriData.attributes.find(
                  (trait) => trait.trait_type === "health",
                )?.value
              }
            </span>
          </div>
        </div>
      )}
    </>
  );
};
