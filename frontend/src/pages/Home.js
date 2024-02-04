import React, { useEffect } from "react";
import Header from "../components/header/Header";
import CarouselComponent from "../components/Carousel";
import Category from "../components/Category";
import FeaturedProducts from "../components/FeaturedProducts";

import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import Footer from "../components/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts({}));
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {console.log(products)}
          <Header />
          <CarouselComponent />
          <Category />
          <FeaturedProducts products={products} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
