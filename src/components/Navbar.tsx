import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";

function Navbar() {
  const { data: sessionData } = useSession();

  return (
    <div>
      <div className="navbar border-b-white">
        <div className="navbar-start">
          <a
            href=""
            className="btn-ghost btn text-xl normal-case text-amber-400"
          >
            E-commerce Demo
          </a>
        </div>
        <div className="navbar-center hidden  lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="text-amber-400">
              <a href="">Home</a>
            </li>
            <li>
              <a>Categories</a>
            </li>
            <li>
              <a>Products</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {sessionData ? (
            <div className="flex flex-row">
              <div className="mr-2">
                <BsCart2 size={40} />
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
