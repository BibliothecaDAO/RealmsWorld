import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { eq } from "@realms-world/db";
import {
  CreateDelegateProfileSchema,
  delegateProfiles,
  delegates,
} from "@realms-world/db/schema";

import { withCursorPagination } from "../cursorPagination";
import { protectedProcedure, publicProcedure } from "../trpc";

export const delegatesRouter = {
  all: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.number().nullish(),
          orderBy: z.string().nullish(),
        })
        .partial(),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 12;

      const { cursor, orderBy } = input;
      // const whereFilter: SQL[] = [];

      const items = await ctx.db.query.delegates.findMany({
        ...withCursorPagination({
          cursors: [
            [
              orderBy == "tokenHoldersRepresentedAmount"
                ? delegates.tokenHoldersRepresentedAmount
                : delegates.delegatedVotes,
              "desc",
              cursor,
            ],
          ],
          limit: limit + 1,
        }),
        with: {
          delegateProfile: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor =
          orderBy == "tokenHoldersRepresentedAmount"
            ? nextItem?.tokenHoldersRepresentedAmount
            : parseInt(nextItem?.delegatedVotes ?? "0");
      }
      return {
        items,
        nextCursor,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.delegates.findFirst({
        where: eq(delegates.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreateDelegateProfileSchema)
    .mutation(({ ctx, input }) => {
      const delegateId = ctx.session.user.id;
      return ctx.db.insert(delegateProfiles).values({ ...input, delegateId });
    }),
} satisfies TRPCRouterRecord;
