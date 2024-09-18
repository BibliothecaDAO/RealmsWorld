import { Button } from "@realms-world/ui"
import Link from "next/link"

export const ViewOnMarketplace = ({ collection, tokenId }: { collection: string, tokenId?: number }) => {
    // Define the base URL
    const baseURL = 'https://market.realms.world/';

    // Construct the URL based on whether `tokenId` is provided
    const url = tokenId
        ? `${baseURL}token/${collection}/${tokenId}`
        : `${baseURL}collection/${collection}`;

    return (
        <Link href={url}>
            <Button className="w-full">View on Marketplace</Button>
        </Link>
    )
}