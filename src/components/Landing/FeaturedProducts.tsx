import { api } from "@/utils/api";
import React from "react";
import myImage from "../../../public/images/testcardimg.webp";
import Image from "next/image";

function FeaturedProducts() {
  const trpc = api.useContext();

  const { data: products, isLoading } =
    api.product.getFeaturedProduct.useQuery();

  // optimistic update
  const addProductToCart = api.product.addToCart.useMutation({
    onSettled: async () => {
      await trpc.product.getFeaturedProduct.invalidate();
    },
  });

  if (isLoading) {
    <div>...Loading</div>;
  }

  return (
    <div className="mt-20 w-full px-8">
      <h1 className="h-8 w-fit rounded-md bg-zinc-700 px-4 py-1 font-semibold drop-shadow-sm">
        Featured Products
      </h1>

      <div className="flex flex-row flex-wrap gap-8">
        {products
          ?.slice(0, 15)
          .map(({ name, id, image, price, stock: { noStock } }, index) => {
            return (
              <div
                key={index}
                className="card mt-8 h-auto w-64 justify-center gap-4 rounded-lg bg-gray-700/80 text-center shadow-sm "
              >
                <figure className="w-full">
                  <Image
                    priority={true}
                    src={image ? image : myImage}
                    alt="product"
                    width={250}
                    height={200}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold shadow-sm">
                    {name}
                  </h2>
                  <p className="font-semibolds text-2xl">{price}€</p>
                  <p className="text-md font-bold">
                    {noStock > 0 ? "In stock" : "No stock"}
                  </p>
                  <div className=" card-actions justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        void addProductToCart.mutateAsync({ productId: id })
                      }
                      disabled={noStock <= 0}
                      className="btn bg-amber-500 font-bold text-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FeaturedProducts;
