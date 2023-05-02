import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  getName: publicProcedure
    .input(
      z.object({
        categoryid: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { categoryid } = input;
      return ctx.prisma.category.findFirst({
        select: {
          category: true,
        },
        where: {
          id: categoryid,
        },
      });
    }),

  byCategorygetproduct: publicProcedure
    .input(
      z.object({
        categoryid: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { categoryid } = input;

      const prodbyCat = ctx.prisma.category.findMany({
        include: {
          product: {
            include: {
              stock: true,
            },
          },
        },
        where: {
          id: categoryid,
        },
      });

      return prodbyCat;
      //        ^?
    }),
});
