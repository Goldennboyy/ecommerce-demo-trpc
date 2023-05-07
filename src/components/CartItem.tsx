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
    },
  });

  return (
    <div className="card mt-8 h-auto w-64 justify-center gap-4 rounded-lg bg-gray-700/80 text-center shadow-sm ">
      <figure className="w-full">
        <Image
          priority={true}
          src={product.image ? product.image : myImage}
          alt="product"
          width={250}
          height={200}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold shadow-sm hover:text-amber-500">
          <Link href={"/products/" + product.id}>{product.name}</Link>
        </h2>
        <p className="font-semibolds text-2xl">{product.price}€</p>
        <p className="text-md font-bold">
          {product.stock.noStock > 0 ? "In stock" : "No stock"}
        </p>
        <div className=" card-actions justify-center">
          <button
            type="button"
            disabled={product.stock.noStock <= 0}
            className="btn bg-amber-500 font-bold text-white"
            onClick={() => void mutateAsync({ productId: product.id })}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
