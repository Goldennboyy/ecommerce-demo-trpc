import { type Product, type Stock } from "@prisma/client";
import React from "react";
import Image from "next/image";
import myImage from "../../public/images/testcardimg.webp";
import { api } from "@/utils/api";
import Link from "next/link";

interface Props {
  product: Product & { stock: Stock };
}

function CartItem({ product }: Props) {
  // optimistic update
  const trpc = api.useContext();
  const { mutateAsync } = api.product.addToCart.useMutation({
    onSettled: async () => {
      await trpc.cart.countCart.invalidate(); // which will update the cart count
      await trpc.product.getAllProducts.invalidate();
    },
  });

  return (
    <div className="gap-4.5 card relative mt-8 h-96 justify-center rounded-lg bg-gray-700/80 text-center shadow-sm sm:w-1/2 md:w-1/6">
      <figure className="w-full ">
        <Image
          priority={true}
          src={product.image ? product.image : myImage}
          alt="product"
          width={300}
          height={300}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold shadow-sm hover:text-amber-500 sm:text-2xl">
          <Link href={"/products/" + product.id}>{product.name}</Link>
        </h2>
        <p className="text-xl font-semibold sm:text-2xl">{product.price}€</p>
        <p className="text-md font-bold sm:text-lg">
          {product.stock.noStock > 0 ? "In stock" : "No stock"}
        </p>
        <div className=" card-actions justify-center">
          <button
            type="button"
            disabled={product.stock.noStock <= 0}
            className="btn bg-amber-500 font-bold text-white"
            onClick={() =>
              void mutateAsync({ productId: product.id, quantity: 1 })
            }
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
