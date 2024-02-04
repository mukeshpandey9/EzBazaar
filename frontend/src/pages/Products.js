import React from "react";
import Header from "../components/header/Header";
import ProductList from "../components/ProductList";
import ContentWrapper from "../components/contentWrapper/ContentWrapper";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Products = () => {
  return (
    <>
      <Helmet>
        <title>All Products | EzBazaar</title>
        <link
          rel="shortcut icon"
          href="https://ez-bazaar.vercel.app/static/media/logo.bdc76d07cb317ca79dfc.png"
          type="image/x-icon"
        />
      </Helmet>
      <Header />
      <ProductList />
      <Footer />
    </>
  );
};

export default Products;
