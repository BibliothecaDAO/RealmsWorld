"use client";

import { getData } from "@/functions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";
import { TokenCard } from "./TokenCard";
import { TokenMarketData } from "@/types";

export const TokenTable = ({ address, SSRtokens }: any) => {
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState(SSRtokens);
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);

  async function getIt() {
    setLoading(true);

    try {
      const tokens = await getData(
        { collection: address, attributes: { ...query } },
        "token"
      );
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

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tokens && !loading
        ? tokens.map((token: TokenMarketData, index: number) => {
            return (
              <TokenCard key={index} token={token}/>
            );
          })
        : "Loading"}
    </div>
  );
};
