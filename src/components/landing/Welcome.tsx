import Link from "next/link";
import React from "react";

function Welcome() {
  return (
    <section className="max-w-8xl opacity-0.5 mt-20 h-auto rounded-md bg-gray-700/80 px-8 py-4 sm:h-44">
      <div className="flex-col gap-y-5 py-8 sm:items-center sm:justify-between sm:py-0 md:flex ">
        <h1 className="text-center text-3xl sm:text-left">
          Welcome to the E-commerce Demo App
        </h1>
        <button className="text-md btn bg-amber-400 text-white sm:w-20 md:w-40">
          <Link href={"/products"}>Shop now</Link>
        </button>
      </div>
    </section>
  );
}

export default Welcome;
