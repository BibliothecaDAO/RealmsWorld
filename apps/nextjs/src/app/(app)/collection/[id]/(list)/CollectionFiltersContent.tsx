import { Label } from "@realms-world/ui/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@realms-world/ui/components/ui/radio-group";

interface CollectionFiltersContentProps {
  buyNow: boolean;
  setBuyNow: (buyNow: boolean) => void;
}

export default function CollectionFiltersContent({
  buyNow,
  setBuyNow,
}: CollectionFiltersContentProps) {
  function onValueChange(value: string) {
    if (value === "buy-now") {
      setBuyNow(true);
      return;
    }
    setBuyNow(false);
  }
  return (
    <div>
      <p className="px-5 py-4 font-sans text-xl tracking-wider">Status</p>

      <RadioGroup
        className="whitespace-nowrap px-5 pb-6"
        value={buyNow ? "buy-now" : "show-all"}
        onValueChange={onValueChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="show-all" id="show-all" />
          <Label htmlFor="show-all">Show all</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buy-now" id="buy-now" />
          <Label htmlFor="buy-now">Buy now</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
