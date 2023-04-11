import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

function Welcome() {
  return (
    <section className="max-w-8xl opacity-0.5 mt-20 h-44 rounded-md bg-gray-700/80 px-8">
      <div className="flex flex-col gap-y-4 py-8">
        <h1 className=" text-3xl">Welcome to the E-commerce Demo App</h1>
        <button className="text-md btn flex w-40 gap-2 bg-amber-400 text-white">
          Shop now <AiOutlineArrowRight size={18} />{" "}
        </button>
      </div>
    </section>
  );
}

export default Welcome;
