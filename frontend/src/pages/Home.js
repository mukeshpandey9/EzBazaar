import React, { useEffect } from "react";
import Header from "../components/header/Header";
import CarouselComponent from "../components/Carousel";
import Category from "../components/Category";
import FeaturedProducts from "../components/FeaturedProducts";

import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import Footer from "../components/Footer";
import Helmet from "react-helmet";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);
  return (
    <>
      {/* SEO Optimization */}
      <Helmet>
        <title>Welcome to EzBazaar 🛒</title>
        <meta
          name="description"
          content="Discover a wide range of products at our awesome e-commerce store.."
        />
        {/* Add more meta tags as needed for SEO */}
        <link rel="canonical" href="https://ez-bazaar.vercel.app" />
        <meta
          name="keywords"
          content="e-commerce, online shopping, products, fashion, electronics, skincare, laptops"
        />
        <meta name="author" content="Mukesh Pandey" />

        {/* Open Graph meta tags for social media sharing */}
        <meta property="og:title" content="EzBazaar" />
        <meta
          property="og:description"
          content="Discover a wide range of products at our awesome e-commerce store.."
        />
        <meta
          property="og:image"
          content="https://ez-bazaar.vercel.app/static/media/logo.bdc76d07cb317ca79dfc.png"
        />
        <meta property="og:url" content="https://ez-bazaar.vercel.app" />
        <meta property="og:type" content="website" />
      </Helmet>

      {loading ? (
        <Spinner />
      ) : (
        <>
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
