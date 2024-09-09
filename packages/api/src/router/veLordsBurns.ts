import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, desc, eq, gte, lte, sql } from "@realms-world/db";
import { velords_burns } from "@realms-world/db/schema";

import { publicProcedure } from "../trpc";

export const veLordsBurnsRouter = {
  all: publicProcedure
    .input(
      z.object({
        sender: z.string().optional(),
        startTimestamp: z.date().optional(),
        endTimestamp: z.date().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const { sender, startTimestamp, endTimestamp } = input;
      const whereFilter: SQL[] = sender
        ? [eq(velords_burns.sender, sender.toLowerCase())]
        : [];

      if (startTimestamp) {
        whereFilter.push(gte(velords_burns.timestamp, startTimestamp));
      }
      if (endTimestamp) {
        whereFilter.push(lte(velords_burns.timestamp, endTimestamp));
      }

      return ctx.db.query.velords_burns.findMany({
        where: and(...whereFilter),
        orderBy: desc(velords_burns.timestamp),
      });
    }),

  byHash: publicProcedure
    .input(z.object({ hash: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.erc721_bridge.findFirst({
        where: eq(velords_burns.hash, input.hash),
      });
    }),

  sumByWeek: publicProcedure.query(async ({ ctx }) => {
    const tenWeeksAgo = new Date();
    tenWeeksAgo.setDate(tenWeeksAgo.getDate() - 70); // 10 weeks * 7 days

    const result = await ctx.db.execute(sql`
      WITH RECURSIVE weeks AS (
        SELECT DATE_TRUNC('week', ${tenWeeksAgo}::timestamp) AS week
        UNION ALL
        SELECT week + INTERVAL '1 week'
        FROM weeks
        WHERE week <= DATE_TRUNC('week', CURRENT_DATE)
      )
      SELECT 
        weeks.week,
        COALESCE(SUM(vb.amount), 0) AS total_amount
      FROM weeks
      LEFT JOIN ${velords_burns} vb ON DATE_TRUNC('week', vb.timestamp) = weeks.week
      GROUP BY weeks.week
      ORDER BY weeks.week ASC
      LIMIT 11
    `);
    return result.rows;
  }),
} satisfies TRPCRouterRecord;
