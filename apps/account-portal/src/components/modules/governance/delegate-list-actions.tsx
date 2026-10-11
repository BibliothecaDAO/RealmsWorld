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

  const [sortMethod, setSortMethod] = useState<"desc" | "random">("random");

  const toggleSortMethod = () => {
    setSortMethod((prevMethod) => {
      const newMethod = prevMethod === "desc" ? "random" : "desc";
      if (onSortChange) {
        onSortChange(newMethod);
      }
      return newMethod;
    });
  };

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      {currentDelegate ? (
        <div className="hidden items-center gap-2 sm:flex">
          <Label className="realm-label">Delegate</Label>
          <Badge className="max-w-40 truncate" variant="outline">
            {name}
          </Badge>
        </div>
      ) : (
        address && (
          <Button onClick={() => delegateRealms()}>Delegate to self</Button>
        )
      )}
      <Button variant="outline" onClick={toggleSortMethod}>
        {sortMethod === "desc" ? (
          <>
            <TrendingDown />
            Desc votes
          </>
        ) : (
          <>
            <Shuffle />
            Random
          </>
        )}
      </Button>
    </div>
  );
}
