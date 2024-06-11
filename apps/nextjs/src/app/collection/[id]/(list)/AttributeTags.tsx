"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { X } from "lucide-react";

import { Button } from "@realms-world/ui";

export const AttributeTags = () => {
  const { handleAttributeClick, getQueriesFromUrl } = useQueryParams();

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap space-x-1">
        {getQueriesFromUrl().map((query, index) => {
          const query_value = query.value?.replace(/([A-Z])/g, " $1").trim();

          const query_key = query.key?.replace(/([A-Z])/g, " $1").trim();
          return (
            <Button
              variant={"outline"}
              className=""
              size={"xs"}
              key={index}
              onClick={() =>
                query.key &&
                query.value &&
                handleAttributeClick(
                  query.key,
                  query.value,
                  query.key == "Resource",
                )
              }
            >
              <span> {query_key}</span> : <span> {query_value} </span>
              <X className="ml-3 w-3" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
