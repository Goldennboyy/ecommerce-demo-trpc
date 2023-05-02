import Layout from "@/components/Layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import myImage from "../../../public/images/testcardimg.webp";
import NoElement from "@/components/NoElement";
export default function CategoryProducts() {
  const router = useRouter();

  const { id } = router.query;

  const trpc = api.useContext();

  const { data: categoryProducts } = api.category.byCategorygetproduct.useQuery(
    {
      categoryid: id as string,
    }
  );

  const { data: category } = api.category.getName.useQuery({
    categoryid: id as string,
  });

  const { mutate } = api.product.addToCart.useMutation({
    onSettled: async () => {
      await trpc.product.getFeaturedProduct.invalidate();
    },
  });

  return (
    <Layout page={category?.category as string}>
      {categoryProducts?.map(({ product: products }, index) => {
        return (
          <div key={index} className="flex flex-wrap justify-center gap-2">
            {products.length > 0 ? (
              products.map((product, index) => {
                return (
                  <div key={index}>
                    <div className="card mt-8 h-96 w-64 rounded-lg bg-gray-700/80 text-center shadow-sm ">
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
                        <h2 className="card-title text-center text-2xl font-bold shadow-sm">
                          {product.name}
                        </h2>
                        <p className="font-semibolds text-2xl">
                          {product.price}€
                        </p>
                        <p className="text-md font-bold">
                          {product.stock.noStock > 0 ? "In stock" : "No stock"}
                        </p>
                        <div className=" card-actions justify-center">
                          <button
                            type="button"
                            disabled={product.stock.noStock === 0}
                            className="btn bg-amber-500 font-bold text-white"
                            onClick={() => mutate({ productId: product.id })}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
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
