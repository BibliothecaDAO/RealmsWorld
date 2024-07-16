"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Switch } from "@realms-world/ui";

export const CollectionActivity = ({
  searchAttributes = ["sale", "transfer", "bid", "ask"],
}: {
  searchAttributes?: string[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [typesState, setTypesState] = useState<Record<string, boolean>>({
    sale: false,
    transfer: false,
    bid: false,
    ask: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSwitchChange = (value: string) => {
    setLoading(true);
    document
      .getElementById("activity-container")
      ?.classList.add("opacity-30", "pointer-events-none");
    const newState: Record<string, boolean> = {};
    newState[value] = !newState[value];
    setTypesState(newState);
    const params = new URLSearchParams(searchParams);
    const valueExists =
      params.has("types") && params.getAll("types").includes(value);

    if (!valueExists) {
      params.append("types", value);
    } else {
      const types = params.getAll("types").filter((type) => type !== value);
      params.delete("types");
      for (const type of types) params.append("types", type);
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    router.replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const newState = searchAttributes.reduce((acc, attribute) => {
      const valueExists =
        params.has("types") && params.getAll("types").includes(attribute);
      return { ...acc, [attribute]: valueExists };
    }, {});
    setTypesState(newState);
    document
      .getElementById("activity-container")
      ?.classList.remove("opacity-30", "pointer-events-none");
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="hidden w-72 flex-col space-y-3 pr-8 sm:flex">
      {loading ? (
        <CollectionActivitySkeleton />
      ) : (
        searchAttributes.map((attribute: string, index: number) => {
          return (
            <div className="p--1 flex justify-between rounded" key={index}>
              <h6>{attribute} </h6>
              <Switch
                checked={typesState[attribute]}
                onCheckedChange={() => handleSwitchChange(attribute)}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export const CollectionActivitySkeleton = () => {
  return (
    <div className="hidden w-72 flex-col space-y-3 pr-8 sm:flex">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className="flex animate-pulse justify-between rounded bg-black/20 p-1 text-xl uppercase"
          key={index}
        >
          <span className="h-6 w-1/2 bg-black/20 font-semibold"></span>
          <div className="h-6 w-6 rounded-full bg-black/20"></div>
        </div>
      ))}
    </div>
  );
};
