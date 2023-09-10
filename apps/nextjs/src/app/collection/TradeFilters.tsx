"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useUIContext } from "@/app/providers/UIProvider";
import { sortDirection, sortOptions } from "@/constants";
import { useQuery } from "@/hooks/useQuery";
import { Filter, Grid, X } from "lucide-react";

export const TradeFilters = () => {
  const { handleAttributeClick, getQueriesFromUrl } = useQuery();
  const { isFilterOpen, toggleFilter, toggleGrid } = useUIContext();
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
        <Grid className="w-4 self-center" />
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
