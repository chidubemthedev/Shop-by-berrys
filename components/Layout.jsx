import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Berry&apos;s Fragrances</title>
        {/* <link rel="icon" href="../assets/LogoTrans.png" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Berry's Fragrances online shop." />
        <meta name="author" content="Agulue Chidubem Valentine" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
