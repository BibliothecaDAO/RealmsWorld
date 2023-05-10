"use client";

import { X, Filter, Grid } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { sortDirection, sortOptions } from "@/constants";
import { useQuery } from "@/composables/useQuery";
import { useUIContext } from "../providers/UIProvider";

export const TradeFilters = () => {
  const { handleAttributeClick, getQueriesFromUrl } = useQuery();
  const { isFilterOpen, toggleFilter, toggleGrid } = useUIContext();
  return (
    <div className="flex ml-auto space-x-2">
      <Button
        className="self-center sm:hidden"
        size={"xs"}
        onClick={toggleFilter}
        variant={"default"}
      >
        <Filter className="w-3" />
      </Button>{" "}
      <Button
        onClick={toggleGrid}
        className="self-center"
        size={"xs"}
        variant={"default"}
      >
        <Grid className="self-center w-4" />
      </Button>{" "}
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
