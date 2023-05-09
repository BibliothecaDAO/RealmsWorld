"use client";

import { useState } from "react";
import { Switch } from "../components/ui/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CollectionActivity = ({ address }: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [typesState, setTypesState] = useState<{
    [key: string]: boolean;
  }>({ sale: false, transfer: false, bid: false, ask: false });

  const handleSwitchChange = (value: any) => {
    let newState: {
      [key: string]: boolean;
    } = {};
    newState[value] = !newState[value];
    setTypesState(newState);
    // @ts-ignore
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
            <Switch
              checked={typesState[attribute]}
              onCheckedChange={() => handleSwitchChange(attribute)}
            />
          </div>
        );
      })}
    </div>
  );
};
