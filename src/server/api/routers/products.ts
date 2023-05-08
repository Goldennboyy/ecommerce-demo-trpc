import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { type Product, type Stock } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      include: {
        stock: true,
      },
    });
    return products;
  }),

  getNameProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const product = await ctx.prisma.product.findFirst({
        where: { id: id },
        select: {
          name: true,
        },
      });
      return product;
    }),

  getProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const product = await ctx.prisma.product.findFirst({
        where: {
          id: id,
        },
        include: { stock: true },
      });
      return product;
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
        quantity: z.number().positive(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity } = input;
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

      // Check if the product is in stock
      if (product.stock.noStock < quantity) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "The product is out of stock",
        });
      }

      const cart = await ctx.prisma.cart.upsert({
        where: {
          userId: userId,
        },
        create: {
          amount: product.price * quantity,
          quantity: quantity,
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
            increment: product.price * quantity,
          },
          quantity: {
            increment: quantity,
          },
        },
      });

      // update the stock each time a product is added to the cart
      await ctx.prisma.stock.update({
        where: {
          id: product.stockId,
        },
        data: {
          noStock: product.stock.noStock - quantity, // decrement the stock with quantity or 1
        },
      });

      return cart;
    }),
});
