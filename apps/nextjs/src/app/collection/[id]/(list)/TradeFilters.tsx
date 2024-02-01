"use client";

import { useUIContext } from "@/app/providers/UIProvider";
import { sortDirection, sortOptions } from "@/constants";
import { useQuery } from "@/hooks/useQuery";
import { Filter, Grid, List } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@realms-world/ui";

export const TradeFilters = () => {
  const { handleAttributeClick } = useQuery();
  const { isGrid, toggleFilter, toggleGrid } = useUIContext();
  return (
    <div className="ml-auto flex space-x-2">
      <Button
        className="self-center sm:hidden"
        size={"xs"}
        onClick={toggleFilter}
        variant={"default"}
      >
        <Filter className="w-3" />
      </Button>
      <Button
        onClick={toggleGrid}
        className="self-center"
        size={"xs"}
        variant={"default"}
      >
        {!isGrid ? (
          <Grid className="w-4 self-center" />
        ) : (
          <List className="w-4 self-center" />
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"xs"} variant={"default"}>
            Direction
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortDirection.map((query, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="font-sans"
                onClick={() => handleAttributeClick(query.key, query.value)}
              >
                {query.title}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"xs"} variant={"default"}>
            Sort By
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map((query, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className="font-sans"
                onClick={() => handleAttributeClick(query.key, query.value)}
              >
                {query.title}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
