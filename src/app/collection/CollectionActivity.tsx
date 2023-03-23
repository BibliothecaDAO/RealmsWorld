"use client";

import { getData } from "@/functions";
import { useMemo, useState } from "react";
import { Activity } from "@/types";
import { ActivityCard } from "../components/ActivityCard";
import { Switch } from "../components/Switch";

export const CollectionActivity = ({ address }: any) => {
  const [tokens, setTokens] = useState([]);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapIt = (queries: any) => {
    return queries.map((q: any) => {
      return { types: q };
    });
  };

  async function getIt() {
    setLoading(true);
    try {
      const tokens = await getData(
        { collection: address, types: mapIt(query) },
        "activity"
      );
      setTokens(tokens.activities);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useMemo(() => {
    getIt();

    console.log(mapIt(query));
  }, [query]);

  const handleSwitchChange = (value: any) => {
    setQuery((prevQuery: any) => {
      // Check if the value already exists in the query array
      const valueExists = prevQuery.includes(value);

      // If the value exists, remove it; otherwise, add it
      const newQuery = valueExists
        ? prevQuery.filter((item: any) => item !== value)
        : [...prevQuery, value];

      return newQuery;
    });
  };

  const searchAttributes = ["sale", "transfer", "bid", "ask"];

  return (
    <div className="flex">
      <div className="flex-col hidden pr-8 space-y-3 w-72 sm:flex">
        {searchAttributes.map((attribute: string, index: number) => {
          return (
            <div
              className="flex justify-between p-1 text-xl uppercase rounded"
              key={index}
            >
              <span className="font-semibold">{attribute} </span>
              <Switch onChange={() => handleSwitchChange(attribute)} />
            </div>
          );
        })}
      </div>
      <div className="grid flex-grow grid-cols-1">
        {tokens && !loading
          ? tokens.map((activity: Activity, index: number) => {
              return <ActivityCard key={index} activity={activity} />;
            })
          : "Loading"}
      </div>
    </div>
  );
};
