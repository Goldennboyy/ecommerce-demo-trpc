import { api } from "@/utils/api";
import Image from "next/image";
import React from "react";
import myImage from "../../../public/images/testcardimg.webp";
import Link from "next/link";

function CategoryItem() {
  const { data: categories } = api.category.getCategories.useQuery();

  return (
    <div className="mx-auto grid grid-cols-1 items-center justify-center gap-4 p-3  md:grid-cols-2">
      {categories?.map(({ category, id }, index) => {
        return (
          <div
            key={index}
            className="h-56 w-full  object-cover font-bold opacity-80 bg-blend-overlay transition duration-500 hover:scale-100"
          >
            {" "}
            <Link href={"/categories/" + id}>
              <div className="relative top-1/2 z-20 text-center text-2xl font-semibold text-amber-400">
                {category}
              </div>
              <Image
                className="h-full w-full object-cover "
                src={myImage}
                alt="picture of category"
                width={200}
                height={180}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryItem;
