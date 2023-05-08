import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

function Product() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product } = api.product.getNameProduct.useQuery({
    id: id as string,
  });

  return (
    <Layout page={product?.name as string}>
      <ProductItem id={id as string} />
    </Layout>
  );
}

export default Product;
