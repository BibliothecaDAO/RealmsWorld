import Link from "next/link";
import { Button } from "@realms-world/ui/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const ViewOnMarketplace = ({
  collection,
  tokenId,
  icon,
}: {
  collection: string;
  tokenId?: number | string;
  icon?: boolean;
}) => {
  // Define the base URL
  const baseURL = "https://market.realms.world/";

  // Construct the URL based on whether `tokenId` is provided
  const url = tokenId
    ? `${baseURL}token/${collection}/${tokenId}`
    : `${baseURL}collection/${collection}`;

  return (
    <Link href={url}>
      {icon ? (
        <Button>
          <ShoppingCart />
        </Button>
      ) : (
        <Button className="w-full">View on Marketplace</Button>
      )}
    </Link>
  );
};
