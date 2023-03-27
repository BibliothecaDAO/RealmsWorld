"use client";

import { getData } from "@/functions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";
import { TokenCard } from "./TokenCard";
import { TokenMarketData } from "@/types";
import { useUIContext } from "../providers/UIProvider";

export const TokenTable = ({ address, SSRtokens }: any) => {
  const { isGrid } = useUIContext();
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState(SSRtokens);
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);

  async function getIt() {
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
  }, [address, searchParams]);

  useMemo(() => {
    getIt();
  }, [query]);

  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  const list = "grid grid-cols-1";

  return (
    <div className={isGrid ? grid : list}>
      {tokens && !loading
        ? tokens.map((token: TokenMarketData, index: number) => {
            return (
              <TokenCard
                key={index}
                token={token}
                layout={isGrid ? "grid" : "list"}
              />
            );
          })
        : "Loading"}
    </div>
  );
};
