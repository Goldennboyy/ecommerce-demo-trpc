import React from "react";
import CategoryItem from "./CategoryItem";

function Category() {
  return (
    <div className="mx-auto mt-10 items-center justify-center">
      <h1 className="text-center text-2xl font-semibold">All categories</h1>
      <CategoryItem />
    </div>
  );
}

export default Category;
