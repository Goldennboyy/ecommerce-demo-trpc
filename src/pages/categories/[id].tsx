import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

import NoElement from "@/components/NoElement";
import LoadingSpinner from "@/components/LoadingSpinner";
import CartItem from "@/components/CartItem";

export default function CategoryProducts() {
  const router = useRouter();

  const { id } = router.query;

  const { data: categoryProducts, isLoading } =
    api.category.byCategorygetproduct.useQuery({
      categoryid: id as string,
    });

  const { data: category } = api.category.getName.useQuery({
    categoryid: id as string,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout page={category?.category as string}>
      {categoryProducts?.map(({ product: products }, index) => {
        return (
          <div key={index} className="flex flex-wrap justify-center gap-2">
            {products.length > 0 ? (
              products.map((product, index) => {
                return <CartItem product={product} key={index} />;
              })
            ) : (
              <NoElement />
            )}
          </div>
        );
      })}
    </Layout>
  );
}
