"use client";

import { getData } from "@/functions";
import { useMemo, useState } from "react";
import { Activity } from "@/types";
import { ActivityCard } from "../components/ActivityCard";
import { Switch } from "../components/Switch";
import { useQuery } from "@/composables/useQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CollectionActivity = ({ address }: any) => {
  const [tokens, setTokens] = useState([]);
  const [query, setQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleAttributeClick, getQueriesFromUrl } = useQuery();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSwitchChange = (value: any) => {
    const params = new URLSearchParams(searchParams);
    const valueExists =
      params.has("types") && params.getAll("types").includes(value);

    console.log(valueExists);

    const newValue = valueExists
      ? params.get("types")?.replace(value, "")
      : params.get("types");

    if (newValue) {
      params.set("types", newValue);
    } else {
      params.set("types", value);
    }
    console.log(newValue);
    // If the value exists, remove it; otherwise, add it

    router.replace(`${pathname}?${params}`);
  };

  const searchAttributes = ["sale", "transfer", "bid", "ask"];

  return (
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
  );
};
