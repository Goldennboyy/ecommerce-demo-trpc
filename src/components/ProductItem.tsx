import { api } from "@/utils/api";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import myImage from "../../public/images/testcardimg.webp";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";

interface Props {
  id: string;
}

function ProductItem({ id }: Props) {
  const trpc = api.useContext();

  const { data: product, isLoading } = api.product.getProduct.useQuery({
    id: id,
  });

  const { mutateAsync } = api.product.addToCart.useMutation({
    onSettled: async () => {
      await trpc.cart.countCart.invalidate();
      await trpc.product.getAllProducts.invalidate();
    },
  });

  const [quantity, setQuantity] = React.useState<number>(1);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  function increment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const stock = product?.stock.noStock as number;
    if (quantity < stock) setQuantity(quantity + 1);
  }

  function decrement(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if ((product?.stock.noStock as number) > 0) {
      void mutateAsync({
        productId: product?.id as string,
        quantity: quantity,
      });
      setQuantity(1);
    }
  }

  return (
    <div className="mt-20 flex h-fit flex-col items-center justify-between gap-10 p-6">
      <div className="flex w-full gap-x-32">
        <div className="flex h-fit w-fit flex-col border-4 border-amber-400 object-none">
          <Image
            src={product?.image ?? myImage}
            alt={product?.name as string}
            width={400}
            height={400}
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <h1 className="max-w-md text-4xl font-semibold">{product?.name}</h1>
          <p className="text-md break-all">{product?.description}</p>
          <div className="mb-4">
            <div className="flex w-full justify-between ">
              <p className="text-lg font-semibold">Price</p>
              <p className="text-lg font-semibold">Quantity</p>
              <button
                disabled={(product?.stock.noStock as number) <= 0}
                className="btn bg-amber-400 font-semibold text-white"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
            <div className=" mb-2 flex flex-row">
              <p className="text-lg font-semibold">{product?.price}€</p>
              <div className="mx-auto flex flex-row gap-x-3 pr-24">
                <button type="button" onClick={increment}>
                  <AiOutlinePlusSquare className="h-6 w-6 hover:fill-amber-400" />
                </button>
                <input
                  className="w-10 rounded-lg bg-zinc-600 text-center text-lg font-semibold"
                  value={quantity}
                  type="number"
                />
                <button type="button" onClick={decrement}>
                  <AiOutlineMinusSquare className=" h-6 w-6 hover:fill-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
