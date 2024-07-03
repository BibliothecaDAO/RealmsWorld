-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "governances" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_range" "int8range" NOT NULL,
	"id" varchar(256) NOT NULL,
	"currentDelegates" integer NOT NULL,
	"totalDelegates" integer NOT NULL,
	"delegatedVotesRaw" numeric(80, 0) NOT NULL,
	"delegatedVotes" numeric(80, 20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "delegates" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"block_range" "int8range" NOT NULL,
	"id" varchar(256) NOT NULL,
	"governance" varchar(256),
	"user" varchar(256) NOT NULL,
	"delegatedVotesRaw" numeric(80, 0) NOT NULL,
	"delegatedVotes" numeric(80, 20) NOT NULL,
	"tokenHoldersRepresentedAmount" integer NOT NULL,
	"tokenHoldersRepresented" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_checkpoints" (
	"id" varchar(10) PRIMARY KEY NOT NULL,
	"block_number" bigint NOT NULL,
	"contract_address" varchar(66) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_metadatas" (
	"id" varchar(20) PRIMARY KEY NOT NULL,
	"value" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_template_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"contract_address" varchar(66),
	"start_block" bigint NOT NULL,
	"template" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "governances_currentdelegates_index" ON "governances" USING btree ("currentDelegates" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "governances_delegatedvotes_index" ON "governances" USING btree ("delegatedVotes" numeric_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "governances_delegatedvotesraw_index" ON "governances" USING btree ("delegatedVotesRaw" numeric_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "governances_id_index" ON "governances" USING btree ("id" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "governances_totaldelegates_index" ON "governances" USING btree ("totalDelegates" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_delegatedvotes_index" ON "delegates" USING btree ("delegatedVotes" numeric_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_delegatedvotesraw_index" ON "delegates" USING btree ("delegatedVotesRaw" numeric_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_governance_index" ON "delegates" USING btree ("governance" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_id_index" ON "delegates" USING btree ("id" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_tokenholdersrepresented_index" ON "delegates" USING btree ("tokenHoldersRepresented" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_tokenholdersrepresentedamount_index" ON "delegates" USING btree ("tokenHoldersRepresentedAmount" int4_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "delegates_user_index" ON "delegates" USING btree ("user" text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_checkpoints_block_number_index" ON "_checkpoints" USING btree ("block_number" int8_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_checkpoints_contract_address_index" ON "_checkpoints" USING btree ("contract_address" text_ops);
*/