import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@realms-world/ui/components/ui/select";

import type {
  CollectionSortBy,
  CollectionSortDirection,
} from "@/lib/ark/getCollectionTokens";

interface PortfolioItemsSortingSelectProps {
  setSortBy: (sortBy: CollectionSortBy) => void;
  setSortDirection: (sortDirection: CollectionSortDirection) => void;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
}

export default function PortfolioItemsSortingSelect({
  className,
  setSortBy,
  setSortDirection,
  sortBy,
  sortDirection,
}: PortfolioItemsSortingSelectProps & { className?: string }) {
  const sortValue = `${sortBy}-${sortDirection}`;

  function onValueChange(value: string) {
    // We need to do this because we have to represent two states in one
    const values = value.split("-") as [
      CollectionSortBy,
      CollectionSortDirection,
    ];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (values.length !== 2) {
      throw new Error("Wrong select value");
    }

    setSortBy(values[0]);
    setSortDirection(values[1]);
  }

  return (
    <div className={className}>
      <Select value={sortValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-52">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="price-asc">Price: Low to high</SelectItem>
            <SelectItem value="price-desc">Price: High to low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
