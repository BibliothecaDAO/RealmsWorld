import { relations } from "drizzle-orm";
import {
  bigint,
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const tokenholders = pgTable(
  "tokenholders",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    delegate: varchar("delegate", { length: 256 }),
    tokenBalanceRaw: numeric("tokenBalanceRaw", {
      precision: 80,
      scale: 0,
    }).notNull(),
    tokenBalance: numeric("tokenBalance", {
      precision: 80,
      scale: 20,
    }).notNull(),
    totalTokensHeldRaw: numeric("totalTokensHeldRaw", {
      precision: 80,
      scale: 0,
    }).notNull(),
    totalTokensHeld: numeric("totalTokensHeld", {
      precision: 80,
      scale: 20,
    }).notNull(),
  },
  (table) => {
    return {
      delegate_idx: index().using("btree", table.delegate),
      id_idx: index().using("btree", table.id),
      tokenbalance_idx: index("tokenholders_tokenbalance_index").using(
        "btree",
        table.tokenBalance,
      ),
      tokenbalanceraw_idx: index("tokenholders_tokenbalanceraw_index").using(
        "btree",
        table.tokenBalanceRaw,
      ),
      totaltokensheld_idx: index("tokenholders_totaltokensheld_index").using(
        "btree",
        table.totalTokensHeld,
      ),
      totaltokensheldraw_idx: index(
        "tokenholders_totaltokensheldraw_index",
      ).using("btree", table.totalTokensHeldRaw),
    };
  },
);

export const delegates = pgTable(
  "delegates",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    delegatedVotesRaw: numeric("delegatedVotesRaw", {
      precision: 80,
      scale: 0,
    }).notNull(),
    delegatedVotes: numeric("delegatedVotes", {
      precision: 80,
      scale: 20,
    }).notNull(),
    tokenHoldersRepresentedAmount: integer(
      "tokenHoldersRepresentedAmount",
    ).notNull(),
  },
  (table) => {
    return {
      delegatedvotes_idx: index("delegates_delegatedvotes_index").using(
        "btree",
        table.delegatedVotes,
      ),
      delegatedvotesraw_idx: index("delegates_delegatedvotesraw_index").using(
        "btree",
        table.delegatedVotesRaw,
      ),
      id_idx: index().using("btree", table.id),
      tokenholdersrepresentedamount_idx: index(
        "delegates_tokenholdersrepresentedamount_index",
      ).using("btree", table.tokenHoldersRepresentedAmount),
    };
  },
);
export const delegatesRelations = relations(delegates, ({ one }) => ({
  delegateProfile: one(delegateProfiles),
}));

export const delegateProfiles = pgTable(
  "delegate_profiles",
  {
    delegateId: varchar("delegateId", { length: 256 })
      .notNull()
      .primaryKey()
      .references(() => delegates.id),
    statement: text("statement").notNull(),
    interests: text("interests").array(),
    twitter: text("twitter"),
    telegram: text("telegram"),
    discord: text("discord"),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
  },
  (table) => {
    return {
      delegateId_idx: index().using("btree", table.delegateId),
    };
  },
);

export const governances = pgTable(
  "governances",
  {
    id: varchar("id", { length: 256 }).notNull().primaryKey(),
    currentTokenHolders: integer("currentTokenHolders").notNull(),
    currentDelegates: integer("currentDelegates").notNull(),
    totalTokenHolders: integer("totalTokenHolders").notNull(),
    totalDelegates: integer("totalDelegates").notNull(),
    delegatedVotesRaw: numeric("delegatedVotesRaw", {
      precision: 80,
      scale: 0,
    }).notNull(),
    delegatedVotes: numeric("delegatedVotes", {
      precision: 80,
      scale: 20,
    }).notNull(),
  },
  (table) => {
    return {
      currentdelegates_idx: index("governances_currentdelegates_index").using(
        "btree",
        table.currentDelegates,
      ),
      currenttokenholders_idx: index(
        "governances_currenttokenholders_index",
      ).using("btree", table.currentTokenHolders),
      delegatedvotes_idx: index("governances_delegatedvotes_index").using(
        "btree",
        table.delegatedVotes,
      ),
      delegatedvotesraw_idx: index("governances_delegatedvotesraw_index").using(
        "btree",
        table.delegatedVotesRaw,
      ),
      id_idx: index().using("btree", table.id),
      totaldelegates_idx: index("governances_totaldelegates_index").using(
        "btree",
        table.totalDelegates,
      ),
      totaltokenholders_idx: index("governances_totaltokenholders_index").using(
        "btree",
        table.totalTokenHolders,
      ),
    };
  },
);

export const _checkpoints = pgTable(
  "_checkpoints",
  {
    id: varchar("id", { length: 10 }).notNull().primaryKey(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    block_number: bigint("block_number", { mode: "number" }).notNull(),
    contract_address: varchar("contract_address", { length: 66 }).notNull(),
  },
  (table) => {
    return {
      block_number_idx: index().using("btree", table.block_number),
      contract_address_idx: index().using("btree", table.contract_address),
    };
  },
);

export const _metadatas = pgTable("_metadatas", {
  id: varchar("id", { length: 20 }).notNull().primaryKey(),
  value: varchar("value", { length: 128 }).notNull(),
});

export const _template_sources = pgTable("_template_sources", {
  id: serial("id").notNull(),
  contract_address: varchar("contract_address", { length: 66 }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  start_block: bigint("start_block", { mode: "number" }).notNull(),
  template: varchar("template", { length: 128 }).notNull(),
});
