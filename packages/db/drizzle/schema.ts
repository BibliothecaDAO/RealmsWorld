import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const status = pgEnum("status", ["open", "cancelled", "filled"]);

export const velordsBurns = pgTable("velords_burns", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  cursor: bigint("_cursor", { mode: "number" }),
  hash: text().primaryKey().notNull(),
  amount: numeric({ precision: 78, scale: 8 }).notNull(),
  sender: text().notNull(),
  timestamp: timestamp({ mode: "string" }).notNull(),
});

export const duneVelordsBurns = pgTable("dune_velords_burns", {
  id: text(),
  amount: text().notNull(),
  blockTime: timestamp("block_time", { mode: "string" }).notNull(),
  epoch: timestamp({ mode: "string" }),
  epochTotalAmount: integer("epoch_total_amount").notNull(),
  senderEpochTotalAmount: integer("sender_epoch_total_amount"),
});

export const bridge = pgTable("bridge", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  cursor: bigint("_cursor", { mode: "number" }),
  hash: text().primaryKey().notNull(),
  type: text(),
  l1Account: text(),
  l2Account: text(),
  amount: numeric(),
  timestamp: timestamp({ mode: "string" }),
});

export const erc721AttributeKeys = pgTable(
  "erc721_attribute_keys",
  {
    id: serial().notNull(),
    key: text().notNull(),
    kind: text().notNull(),
    collectionId: text("collection_id").notNull(),
    attributeCount: integer("attribute_count").default(0).notNull(),
    info: jsonb(),
  },
  (table) => {
    return {
      attributeKeysCollectionIdKeyIdx: uniqueIndex(
        "attribute_keys_collection_id_key_index",
      ).using(
        "btree",
        table.collectionId.asc().nullsLast(),
        table.key.asc().nullsLast(),
      ),
    };
  },
);

export const user = pgTable("user", {
  id: varchar({ length: 255 }).primaryKey().notNull(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull(),
  emailVerified: timestamp({ precision: 3, mode: "string" }).default(
    CURRENT_TIMESTAMP(3),
  ),
  image: varchar({ length: 255 }),
});

export const account = pgTable("account", {
  userId: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  provider: varchar({ length: 255 }).notNull(),
  providerAccountId: varchar({ length: 255 }).notNull(),
  refreshToken: varchar("refresh_token", { length: 255 }),
  accessToken: varchar("access_token", { length: 255 }),
  expiresAt: integer("expires_at"),
  tokenType: varchar("token_type", { length: 255 }),
  scope: varchar({ length: 255 }),
  idToken: text("id_token"),
  sessionState: varchar("session_state", { length: 255 }),
});

export const session = pgTable("session", {
  sessionToken: varchar({ length: 255 }).primaryKey().notNull(),
  userId: varchar({ length: 255 }).notNull(),
  expires: timestamp({ mode: "string" }).notNull(),
});

export const erc721Transfers = pgTable("erc721_transfers", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  cursor: bigint("_cursor", { mode: "number" }),
  id: text().primaryKey().notNull(),
  tokenKey: text("token_key"),
  tokenId: integer("token_id"),
  contractAddress: text("contract_address"),
  fromAddress: text(),
  toAddress: text(),
});

export const post = pgTable("post", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  title: varchar({ length: 256 }).notNull(),
  content: text().notNull(),
  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true, mode: "string" }),
});

export const delegateProfiles = pgTable(
  "delegate_profiles",
  {
    id: varchar({ length: 256 })
      .default(sql`gen_random_uuid()`)
      .primaryKey()
      .notNull(),
    delegateId: varchar({ length: 256 }),
    statement: text().notNull(),
    interests: text().array(),
    twitter: text(),
    github: text(),
    telegram: text(),
    discord: text(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" }),
  },
  (table) => {
    return {
      delegateProfilesDelegateIdUnique: unique(
        "delegate_profiles_delegateId_unique",
      ).on(table.delegateId),
    };
  },
);

export const erc721Bridge = pgTable("erc721_bridge", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  cursor: bigint("_cursor", { mode: "number" }),
  hash: text().primaryKey().notNull(),
  type: text(),
  l1Account: text(),
  l2Account: text(),
  tokenIds: text().array(),
  reqHash: text("req_hash"),
  timestamp: timestamp({ mode: "string" }),
});

export const lordsRewards = pgTable("lords_rewards", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  cursor: bigint("_cursor", { mode: "number" }),
  hash: text().primaryKey().notNull(),
  amount: numeric({ precision: 78, scale: 8 }).notNull(),
  recipient: text().notNull(),
  timestamp: timestamp({ mode: "string" }).notNull(),
});

export const erc721Attributes = pgTable(
  "erc721_attributes",
  {
    id: serial().notNull(),
    value: text().notNull(),
    key: text().notNull(),
    kind: text(),
    collectionId: text("collection_id").notNull(),
    attributeKeyId: integer("attribute_key_id"),
    tokenCount: integer("token_count").default(0),
  },
  (table) => {
    return {
      attributesAttributeKeyIdValueIdx: index(
        "attributes_attribute_key_id_value_index",
      ).using(
        "btree",
        table.attributeKeyId.asc().nullsLast(),
        table.value.asc().nullsLast(),
      ),
    };
  },
);

export const erc721Collections = pgTable("erc721_collections", {
  // TODO: failed to parse database type 'int8range'
  cursor: unknown("_cursor"),
  id: text(),
  marketplaceId: integer(),
  tokenCount: integer(),
  ownerCount: integer(),
  allTimeVolume: integer(),
  floorSellValue: integer(),
});

export const erc721MarketEvents = pgTable("erc721_market_events", {
  // TODO: failed to parse database type 'int8range'
  cursor: unknown("_cursor"),
  id: integer().notNull(),
  hash: text(),
  finalizeHash: text("finalize_hash"),
  tokenKey: text("token_key"),
  tokenId: integer("token_id"),
  collectionId: integer("collection_id"),
  createdBy: text("created_by"),
  purchaser: text(),
  price: numeric(),
  expiration: integer(),
  active: boolean(),
  updatedAt: timestamp("updated_at", { mode: "string" }),
  status: status(),
});

export const erc721TokenAttributes = pgTable(
  "erc721_token_attributes",
  {
    tokenKey: text("token_key").notNull(),
    value: text().notNull(),
    key: text().notNull(),
    collectionId: text("collection_id"),
    attributeId: integer("attribute_id"),
  },
  (table) => {
    return {
      tokenAttributesAttributeIdTokenKeyUniqueIdx: uniqueIndex(
        "token_attributes_attribute_id_token_key_unique_index",
      ).using(
        "btree",
        table.attributeId.asc().nullsLast(),
        table.tokenKey.asc().nullsLast(),
      ),
      tokenAttributesTokenKeyKeyValueIdx: index(
        "token_attributes_token_key_key_value_index",
      ).using(
        "btree",
        table.tokenKey.asc().nullsLast(),
        table.key.asc().nullsLast(),
        table.value.asc().nullsLast(),
      ),
    };
  },
);

export const erc721Tokens = pgTable("erc721_tokens", {
  // TODO: failed to parse database type 'int8range'
  cursor: unknown("_cursor"),
  id: text().notNull(),
  tokenId: integer("token_id").notNull(),
  contractAddress: text("contract_address"),
  minter: text(),
  owner: text(),
  image: text(),
  name: text(),
  price: numeric(),
  expiration: integer(),
  lastPrice: numeric("last_price"),
});

export const checkpoints = pgTable(
  "_checkpoints",
  {
    id: varchar({ length: 10 }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    blockNumber: bigint("block_number", { mode: "number" }).notNull(),
    contractAddress: varchar("contract_address", { length: 66 }).notNull(),
  },
  (table) => {
    return {
      blockNumberIdx: index().using(
        "btree",
        table.blockNumber.asc().nullsLast(),
      ),
      contractAddressIdx: index().using(
        "btree",
        table.contractAddress.asc().nullsLast(),
      ),
    };
  },
);

export const metadatas = pgTable("_metadatas", {
  id: varchar({ length: 20 }).primaryKey().notNull(),
  value: varchar({ length: 128 }).notNull(),
});

export const templateSources = pgTable("_template_sources", {
  id: serial().primaryKey().notNull(),
  contractAddress: varchar("contract_address", { length: 66 }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  startBlock: bigint("start_block", { mode: "number" }).notNull(),
  template: varchar({ length: 128 }).notNull(),
});

export const governances = pgTable(
  "governances",
  {
    uid: uuid().defaultRandom().primaryKey().notNull(),
    // TODO: failed to parse database type 'int8range'
    blockRange: unknown("block_range").notNull(),
    id: varchar({ length: 256 }).notNull(),
    currentDelegates: integer().notNull(),
    totalDelegates: integer().notNull(),
    delegatedVotesRaw: numeric({ precision: 80, scale: 0 }).notNull(),
    delegatedVotes: numeric({ precision: 80, scale: 20 }).notNull(),
  },
  (table) => {
    return {
      currentdelegatesIdx: index("governances_currentdelegates_index").using(
        "btree",
        table.currentDelegates.asc().nullsLast(),
      ),
      delegatedvotesIdx: index("governances_delegatedvotes_index").using(
        "btree",
        table.delegatedVotes.asc().nullsLast(),
      ),
      delegatedvotesrawIdx: index("governances_delegatedvotesraw_index").using(
        "btree",
        table.delegatedVotesRaw.asc().nullsLast(),
      ),
      idIdx: index().using("btree", table.id.asc().nullsLast()),
      totaldelegatesIdx: index("governances_totaldelegates_index").using(
        "btree",
        table.totalDelegates.asc().nullsLast(),
      ),
    };
  },
);

export const delegates = pgTable(
  "delegates",
  {
    uid: uuid().defaultRandom().primaryKey().notNull(),
    // TODO: failed to parse database type 'int8range'
    blockRange: unknown("block_range").notNull(),
    id: varchar({ length: 256 }).notNull(),
    governance: varchar({ length: 256 }),
    user: varchar({ length: 256 }).notNull(),
    delegatedVotesRaw: numeric({ precision: 80, scale: 0 }).notNull(),
    delegatedVotes: numeric({ precision: 80, scale: 20 }).notNull(),
    tokenHoldersRepresentedAmount: integer().notNull(),
    tokenHoldersRepresented: integer().notNull(),
  },
  (table) => {
    return {
      delegatedvotesIdx: index("delegates_delegatedvotes_index").using(
        "btree",
        table.delegatedVotes.asc().nullsLast(),
      ),
      delegatedvotesrawIdx: index("delegates_delegatedvotesraw_index").using(
        "btree",
        table.delegatedVotesRaw.asc().nullsLast(),
      ),
      governanceIdx: index().using("btree", table.governance.asc().nullsLast()),
      idIdx: index().using("btree", table.id.asc().nullsLast()),
      tokenholdersrepresentedIdx: index(
        "delegates_tokenholdersrepresented_index",
      ).using("btree", table.tokenHoldersRepresented.asc().nullsLast()),
      tokenholdersrepresentedamountIdx: index(
        "delegates_tokenholdersrepresentedamount_index",
      ).using("btree", table.tokenHoldersRepresentedAmount.asc().nullsLast()),
      userIdx: index().using("btree", table.user.asc().nullsLast()),
    };
  },
);
