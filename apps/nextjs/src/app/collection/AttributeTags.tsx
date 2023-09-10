"use client";

import { Button } from "@/app/_components/ui/button";
import { useQuery } from "@/hooks/useQuery";
import { X } from "lucide-react";

export const AttributeTags = () => {
  const { handleAttributeClick, getQueriesFromUrl } = useQuery();

  return (
    <div className="w-full">
      <div className="mb-2 flex flex-wrap space-x-1 px-4 pr-8">
        {getQueriesFromUrl().map((query, index) => {
          return (
            <Button
              variant={"outline"}
              size={"xs"}
              key={index}
              onClick={() => handleAttributeClick(query.key, query.value)}
            >
              {query.key}: <span> {query.value} </span>
              <X className="ml-3 w-3" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
