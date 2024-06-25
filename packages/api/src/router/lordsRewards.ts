import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { desc, eq, or } from "@realms-world/db";
import { lords_rewards } from "@realms-world/db/schema";

import { publicProcedure } from "../trpc";

export const lordsRewardsRouter = {
  all: publicProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      const { address } = input;
      const whereFilter: SQL[] = [];
      whereFilter.push(eq(lords_rewards.recipient, address.toLowerCase()));
      // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
      return ctx.db.query.lords_rewards.findMany({
        where: or(...whereFilter),
        orderBy: desc(lords_rewards.timestamp),
      });
    }),

  byHash: publicProcedure
    .input(z.object({ hash: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.erc721_bridge.findFirst({
        where: eq(lords_rewards.hash, input.hash),
      });
    }),
} satisfies TRPCRouterRecord;
