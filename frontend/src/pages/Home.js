import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Header from "../components/header/Header";
import CarouselComponent from "../components/Carousel";
import Category from "../components/Category";

const Home = () => {
  return (
    <>
      <Header />
      <CarouselComponent />
      <Category />
      {/* <ProductList /> */}
    </>
  );
};

export default Home;
