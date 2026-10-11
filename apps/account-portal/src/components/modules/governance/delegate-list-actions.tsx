import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCurrentDelegate } from "@/hooks/governance/use-current-delegate";
import { useDelegateRealms } from "@/hooks/governance/use-delegate-realms";
import { useStarkDisplayName } from "@/hooks/use-stark-name";
import { useAccount } from "@starknet-start/react";
import { Shuffle, TrendingDown } from "lucide-react";
import { num } from "starknet";

export interface DelegateListActionsProps {
  onSortChange?: (sortMethod: "desc" | "random") => void;
}

export function DelegateListActions({
  onSortChange,
}: DelegateListActionsProps) {
  const { address } = useAccount();
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: address,
  });
  const { data: currentDelegate } = useCurrentDelegate();

  const name = useStarkDisplayName(
    num.toHex(currentDelegate ?? "") as `0x${string}`,
  );

  // New state for sort/filter method
  const [sortMethod, setSortMethod] = useState<"desc" | "random">("random");

  const toggleSortMethod = () => {
    // Toggle sort method and notify the parent via the onSortChange callback
    setSortMethod((prevMethod) => {
      const newMethod = prevMethod === "desc" ? "random" : "desc";
      if (onSortChange) {
        onSortChange(newMethod);
      }
      return newMethod;
    });
  };

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:px-2">
      {currentDelegate ? (
        <>
          <Label className="text-muted-foreground hidden text-xs sm:block">
            Delegate:
          </Label>
          <Badge
            className="mr-2 hidden max-w-40 truncate rounded-full sm:inline-flex"
            variant={"outline"}
          >
            {name}
          </Badge>
        </>
      ) : (
        address && (
          <Button className="h-12 sm:h-10" onClick={() => delegateRealms()}>
            Delegate to self
          </Button>
        )
      )}
      <Button
        variant="outline"
        className="h-12 sm:h-10"
        onClick={toggleSortMethod}
      >
        {sortMethod === "desc" ? (
          <>
            <TrendingDown className="mr-2 h-4 w-4" />
            Desc votes
          </>
        ) : (
          <>
            <Shuffle className="mr-2 h-4 w-4" />
            Random
          </>
        )}
      </Button>
    </div>
  );
}
