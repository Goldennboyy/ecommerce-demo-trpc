import { api } from "@/utils/api";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import CartItem from "../CartItem";

function FeaturedProducts() {
  const { data: products, isLoading } =
    api.product.getFeaturedProduct.useQuery();

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className="mt-20 w-full px-8">
      <h1 className="h-8 w-fit rounded-md bg-zinc-700 px-4 py-1 font-semibold drop-shadow-sm">
        Featured Products
      </h1>
      <div className="flex flex-row flex-wrap gap-8">
        {products?.slice(0, 12).map((product, index) => {
          return <CartItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
}

export default FeaturedProducts;
