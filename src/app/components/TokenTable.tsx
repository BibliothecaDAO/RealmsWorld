"use client";

import { getData } from "@/functions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";
import { TokenCard } from "./TokenCard";
import { TokenMarketData } from "@/types";
import { useUIContext } from "../providers/UIProvider";

export const TokenTable = ({ address, tokens }: any) => {
  const { isGrid } = useUIContext();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState({});

  /*async function getIt() {
    setLoading(true);

    try {
      const tokens = await getData({ collection: address, ...query }, "token");
      setTokens(tokens.tokens);
      setLoading(false);

      console.log(tokens);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    const paramsArray = decodeAndSplit(searchParams.toString());
    const jsonObject = convertToJSON(paramsArray);
    setQuery(jsonObject);
    console.log("setting " + jsonObject);
  }, [address, searchParams]);

  useMemo(() => {
    console.log('using memo')
    getIt();
  }, [query]);*/

  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1";

  return (
    <div className={isGrid ? grid : list}>
      {tokens
        ? tokens.map((token: TokenMarketData, index: number) => {
            return (
              <TokenCard
                key={index}
                token={token}
                layout={isGrid ? "grid" : "list"}
              />
            );
          })
        : "No Assets Found"}
    </div>
  );
};
