import React from "react";

function NoElement() {
  return (
    <div className="border-3 mx-auto mt-32 h-72 w-96 rounded-lg border border-dotted border-amber-700/90 ">
      <div className="p-2 pt-20">
        <p className="text-center text-lg text-amber-500">
          There is/are no product(s) in this category. Please select another
          category...
        </p>
      </div>
    </div>
  );
}

export default NoElement;
