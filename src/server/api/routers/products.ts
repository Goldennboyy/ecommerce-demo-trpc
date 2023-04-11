import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getFeaturedProduct: publicProcedure.query(async ({ ctx }) => {
    const product = await ctx.prisma.product.findMany({
      where: {
        featured: true,
      },

      include: {
        stock: true,
      },
    });
    return product;
  }),
});
