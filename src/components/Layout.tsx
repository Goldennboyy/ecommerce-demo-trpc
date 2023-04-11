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
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <title>{page}</title>
      </Head>
      <main>
        <Navbar />
        <div>{children}</div>
        {/* <Footer /> */}
      </main>
    </>
  );
}

export default Layout;
