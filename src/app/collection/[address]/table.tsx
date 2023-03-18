"use client";

import { getData } from "@/functions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";

export const Table = ({ address }: any) => {
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState([]);
  const [query, setQuery] = useState({});

  async function getIt() {
    try {
      const tokens = await getData({ collection: address,  attributes: {...query} }, "token");
      const token_response: any = await tokens.json();
      
      console.log(token_response)
      setTokens(token_response.tokens);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const paramsArray = decodeAndSplit(searchParams.toString());
    const jsonObject = convertToJSON(paramsArray);
    setQuery(jsonObject);
  }, [address, searchParams])

  useMemo(() => {
    getIt();

    console.log(query)
  }, [query]);

  return (
    <div className="p-8">
      <div className="grid grid-cols-6 gap-4">
        {tokens ? tokens.map((token: any, index: number) => {
          return (
            <div className="p-6 border" key={index}>
              <h5>{token.token.name}</h5>
              <Link href={`/collection/${address}/${token.token.tokenId}`}>
                page
              </Link>
            </div>
          );
        }): "Loading"}
      </div>
    </div>
  );
};
