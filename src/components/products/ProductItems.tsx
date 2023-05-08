import { api } from "@/utils/api";
import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import CartItem from "../CartItem";
function ProductItems() {
  const { data: products, isLoading } = api.product.getAllProducts.useQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mb-8 p-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4">
        {products?.map((product, index) => {
          return <CartItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductItems;
