import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { int8range } from "../int8range";

export const governances = pgTable(
  "governances",
  {
    uid: uuid("uid").defaultRandom().primaryKey().notNull(),
    // TODO: failed to parse database type 'int8range'
    block_range: int8range("block_range").notNull(),
    id: varchar("id", { length: 256 }).notNull(),
    currentDelegates: integer("currentDelegates").notNull(),
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
    };
  },
);

export const delegates = pgTable(
  "delegates",
  {
    uid: uuid("uid").defaultRandom().primaryKey().notNull(),
    // TODO: failed to parse database type 'int8range'
    block_range: int8range("block_range").notNull(),
    id: varchar("id", { length: 256 }).notNull(),
    governance: varchar("governance", { length: 256 }),
    user: varchar("user", { length: 256 }).notNull(),
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
    tokenHoldersRepresented: integer("tokenHoldersRepresented").notNull(),
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
      governance_idx: index().using("btree", table.governance),
      id_idx: index().using("btree", table.id),
      tokenholdersrepresented_idx: index(
        "delegates_tokenholdersrepresented_index",
      ).using("btree", table.tokenHoldersRepresented),
      tokenholdersrepresentedamount_idx: index(
        "delegates_tokenholdersrepresentedamount_index",
      ).using("btree", table.tokenHoldersRepresentedAmount),
      user_idx: index().using("btree", table.user),
    };
  },
);

export const _checkpoints = pgTable(
  "_checkpoints",
  {
    id: varchar("id", { length: 10 }).primaryKey().notNull(),
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
  id: varchar("id", { length: 20 }).primaryKey().notNull(),
  value: varchar("value", { length: 128 }).notNull(),
});

export const _template_sources = pgTable("_template_sources", {
  id: serial("id").primaryKey().notNull(),
  contract_address: varchar("contract_address", { length: 66 }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  start_block: bigint("start_block", { mode: "number" }).notNull(),
  template: varchar("template", { length: 128 }).notNull(),
});

export const delegateProfiles = pgTable(
  "delegate_profiles",
  {
    id: varchar("id", { length: 256 })
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    delegateId: varchar("delegateId", { length: 256 }).unique(),
    statement: text("statement").notNull(),
    interests: text("interests").array(),
    twitter: text("twitter"),
    github: text("github"),
    telegram: text("telegram"),
    discord: text("discord"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    }).$onUpdateFn(() => new Date()),
  },
  (table) => {
    return {
      delegateId_idx: index().using("btree", table.delegateId),
    };
  },
);

export const delegatesRelations = relations(delegates, ({ one }) => ({
  delegateProfile: one(delegateProfiles),
  governance: one(governances),
}));

export const delegateProfilesRelations = relations(
  delegateProfiles,
  ({ one }) => ({
    delegate: one(delegates, {
      fields: [delegateProfiles.delegateId],
      references: [delegates.user],
    }),
  }),
);

export const CreateDelegateProfileSchema = createInsertSchema(
  delegateProfiles,
  {
    statement: z.string(),
    interests: z.string().array().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
    telegram: z.string().optional(),
    discord: z.string().optional(),
  },
).omit({
  delegateId: true,
  createdAt: true,
  updatedAt: true,
});

export const governancesRelations = relations(delegates, ({ one }) => ({
  delegate: one(delegates),
}));
