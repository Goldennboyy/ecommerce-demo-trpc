"use client";
import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface rootLayoutProps {
  children?: React.ReactNode;
  page: string;
}

function Layout({ children, page }: rootLayoutProps) {
  return (
    <>
      <Head>
        <title>{page}</title>
      </Head>
      <body>
        <Navbar />
        <div className="container ">{children}</div>
        {/* <Footer /> */}
      </body>
    </>
  );
}

export default Layout;
