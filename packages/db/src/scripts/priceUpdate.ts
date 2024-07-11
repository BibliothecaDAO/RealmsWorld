import { and, eq, isNotNull, sql } from "drizzle-orm";

import { db } from "../client";
import { erc721MarketEvents, erc721Tokens } from "../schema";

async function updateTokensPrices() {
  const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

  const tokensWithListings2 = await db.query.erc721Tokens.findMany({
    where: and(isNotNull(erc721Tokens.price), sql`upper_inf(_cursor)`),
    with: {
      listings: {
        where: (listings, { sql }) => sql`upper_inf(_cursor)`,
      },
    },
  });

  for (const token of tokensWithListings2) {
    console.log("current: " + token.expiration + " " + token.price);
    //if (token.expiration && token.expiration < now) {
    // Token's current price is expired, search for new lowest non-expired price
    const validListings = token.listings.filter(
      (listing) =>
        listing.expiration &&
        listing.expiration > now &&
        listing.active &&
        listing.created_by == token.owner,
    );
    if (validListings.length === 0) {
      console.log("no valid listings");
      // No valid listings, set price and expiration to null
      await db
        .update(erc721Tokens)
        .set({ price: null, expiration: null })
        .where(and(eq(erc721Tokens.id, token.id), sql`upper_inf(_cursor)`));
    } else {
      // Find lowest priced non-expired listing
      const lowestPricedListing = validListings.reduce((lowest, current) =>
        BigInt(current.price) < BigInt(lowest.price) ? current : lowest,
      );
      console.log(
        "reaplced: " +
          lowestPricedListing.price +
          " " +
          lowestPricedListing.expiration,
      );
      console.log(lowestPricedListing);
      // Update token with new lowest price and expiration
      await db
        .update(erc721Tokens)
        .set({
          price: lowestPricedListing.price,
          expiration: lowestPricedListing.expiration,
        })
        .where(and(eq(erc721Tokens.id, token.id), sql`upper_inf(_cursor)`));
    }
    //}
  }

  console.log("Token prices updated successfully");
}

updateTokensPrices().catch(console.error);
