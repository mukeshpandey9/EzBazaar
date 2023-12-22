import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Header from "../components/header/Header";
import CarouselComponent from "../components/Carousel";

const Home = () => {
  return (
    <>
      <Header />
      <CarouselComponent />
      <ProductList />
    </>
  );
};

export default Home;
