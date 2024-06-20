import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { eq } from "@realms-world/db";
import {
  CreateDelegateProfileSchema,
  delegateProfiles,
  delegates,
  tokenholders,
} from "@realms-world/db/schema";
import { padAddress } from "@realms-world/utils";

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

  tokenHolderById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.tokenholders.findFirst({
        where: eq(tokenholders.id, padAddress(input.id)),
      });
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.delegates.findFirst({
        where: eq(delegates.id, padAddress(input.id)),
        with: {
          delegateProfile: true,
        },
      });
    }),

  createProfile: protectedProcedure
    .input(CreateDelegateProfileSchema)
    .mutation(({ ctx, input }) => {
      if (!ctx.session.user.name) return;
      const delegateId = padAddress(ctx.session.user.name);
      return ctx.db
        .insert(delegateProfiles)
        .values({ ...input, delegateId })
        .onConflictDoUpdate({
          target: delegateProfiles.delegateId,
          set: { ...input },
        });
    }),
} satisfies TRPCRouterRecord;