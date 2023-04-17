import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const cartRouter = createTRPCRouter({
  countCart: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    const count = ctx.prisma.cart.findFirst({
      select: {
        quantity: true,
      },
      where: {
        userId: userId,
      },
    });
    return count;
  }),
});
