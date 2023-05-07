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
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products?.map((product, index) => {
          return <CartItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductItems;
