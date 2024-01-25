import { relations } from "drizzle-orm";
import { boolean, integer, numeric, text } from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721AttributeKeys } from "./erc721_attribute_keys";

export const erc721Collections = pgSqlTable("erc721_collections", {
  _cursor: int8range("_cursor"),
  id: text("id"),
  marketplaceId: integer("marketplaceId"),
  tokenCount: integer("tokenCount"),
  ownerCount: integer("ownerCount"),
  allTimeVolume: integer("allTimeVolume"),
  floorSellValue: integer("floorSellValue"),

  /*  tokenIdRange: int8range("_cursor"),
  createdAt: string;
  updatedAt: string;
  day1Volume: number;
  day1Rank: number;
  day7Volume: number;
  day7Rank: number;
  day30Volume: number;
  day30Rank: number;
  allTimeRank: number;
  indexMetadata: boolean;
  lastMetadataSync: string;
  mintedTimestamp: number;
  floorSellValue: number;
  creator: string;
  isSpam: number;*/
});

export const erc721CollectionsRelations = relations(
  erc721Collections,
  ({ many }) => ({
    attributes: many(erc721AttributeKeys),
    //tokens:
    //listings: many(erc721MarketListing),
  }),
);
