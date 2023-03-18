"use client";

import { getData } from "@/functions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";

export const TokenTable = ({ address }: any) => {
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState([]);
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
    <div className="grid grid-cols-6 gap-4">
      {tokens && !loading
        ? tokens.map((token: any, index: number) => {
            return (
              <div className="p-6 border" key={index}>
                <h5>{token.token.name}</h5>
                <Link href={`/collection/${address}/${token.token.tokenId}`}>
                  page
                </Link>
              </div>
            );
          })
        : "Loading"}
    </div>
  );
};
