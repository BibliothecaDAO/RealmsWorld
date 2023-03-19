"use client";

import { getData } from "@/functions";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";
import { Activity, TokenMarketData } from "@/types";
import Image from "next/image";
import { ActivityCard } from "../components/ActivityCard";

export const CollectionActivity = ({ address }: any) => {
  const searchParams = useSearchParams();
  const [tokens, setTokens] = useState([]);
  const [query, setQuery] = useState({});
  const [loading, setLoading] = useState(true);

  async function getIt() {
    setLoading(true);

    try {
      const tokens = await getData({ collection: address }, "activity");
      setTokens(tokens.activities);
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
    <div className="grid grid-cols-1">
      {tokens && !loading
        ? tokens.map((activity: Activity, index: number) => {
            return (
              <ActivityCard key={index} activity={activity}/>
            );
          })
        : "Loading"}
    </div>
  );
};
