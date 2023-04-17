import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";
import { api } from "@/utils/api";
import Link from "next/link";

function Navbar() {
  const { data: sessionData } = useSession();

  const { data: cart } = api.cart.countCart.useQuery();

  return (
    <div>
      <div className="navbar border-b border-b-black">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn-ghost btn text-xl normal-case text-amber-400"
          >
            E-commerce Demo
          </Link>
        </div>
        <div className="navbar-center hidden  lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-amber-400">
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href={"/products"}>Products</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {sessionData ? (
            <div className="flex flex-row">
              <div className="mr-2">
                <BsCart2 className="text-amber-500" size={40} />
                <div className="relative -right-6 bottom-3.5 h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-center">
                  <span className="font-bold text-amber-500">
                    {cart?.quantity}
                  </span>
                </div>
              </div>

              <div className="dropdown avatar px-4">
                <div tabIndex={0} className="h-12 w-12 rounded-full ring">
                  <Image
                    src={sessionData?.user.image || ""}
                    width={24}
                    height={12}
                    alt="profile"
                  />
                </div>
                <div className="-px-8 dropdown-content menu items-center justify-center pt-1.5">
                  <label
                    tabIndex={0}
                    className="btn bg-red-600 text-white"
                    onClick={() => void signOut()}
                  >
                    Sign out
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => void signIn()} className="btn-outline btn">
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
