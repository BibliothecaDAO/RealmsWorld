"use client";
import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useQuery } from "@/composables/useQuery";

export const AttributeTags = () => {
  const { handleAttributeClick, getQueriesFromUrl } = useQuery();

  return (
    <div className="w-full">
      <div className="flex flex-wrap px-4 pr-8 mb-2 space-x-1">
        {getQueriesFromUrl().map((query, index) => {
          return (
            <Button
              variant={"outline"}
              size={"xs"}
              key={index}
              onClick={() => handleAttributeClick(query.key, query.value)}
            >
              {query.key}: <span> {query.value} </span>
              <X className="w-3 ml-3" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
