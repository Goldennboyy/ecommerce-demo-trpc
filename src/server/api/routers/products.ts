import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { type Product, type Stock } from "@prisma/client";
import { TRPCError } from "@trpc/server";

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

  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const userId = ctx.session.user.id;

      // get the product from the product id
      const product: (Product & { stock: Stock }) | null =
        await ctx.prisma.product.findUnique({
          where: {
            id: productId,
          },
          include: {
            stock: true,
          },
        });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "the product is not found",
        });
      }

      if (product.stock.noStock <= 0) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "the product is out of stock",
        });
      }

      const cart = await ctx.prisma.cart.upsert({
        where: {
          userId: userId,
        },
        create: {
          amount: product.price,
          quantity: 1,
          product: {
            connect: {
              id: productId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
        update: {
          amount: {
            increment: product.price,
          },
          quantity: {
            increment: 1,
          },
        },
      });

      // update the stock each time a product is added to the cart
      await ctx.prisma.stock.update({
        where: {
          id: product.stockId,
        },
        data: {
          noStock: product.stock.noStock - 1,
        },
      });

      return cart;
    }),
});
