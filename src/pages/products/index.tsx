import Layout from "@/components/Layout";
import React from "react";

function Product() {
  return (
    <Layout page="products">
      <div className="mx-auto mt-10 max-w-6xl items-center justify-center ">
        <div className="py-8">
          <h1 className="text-center text-3xl font-semibold">All Products</h1>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
