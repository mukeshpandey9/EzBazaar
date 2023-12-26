import { Carousel } from "antd";
import React from "react";
import Hero from "../assets/img/ecommerce.svg";
import Hero2 from "../assets/img/ecommerce2.svg";
import Hero3 from "../assets/img/hero3.svg";
import Hero4 from "../assets/img/ecommerce3.svg";
import Hero5 from "../assets/img/ecommercee.jpg";
import { Link } from "react-router-dom";

const CarouselComponent = () => {
  return (
    <div className="max-h-screen  overflow-y-hidden  bg-white md:h-screen md:px-16">
      <Carousel
        autoplay
        className="max-h-[95vh]"
        infinite={true}
        autoplaySpeed={3500}
      >
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-5 px-4 pt-20  items-center  h-full  dark:bg-gray-700 dark:text-white">
            <div className="w-full !z-50 md:w-1/2 h-full flex flex-col gap-5 justify-center ">
              <h1 className="text-4xl md:text-6xl text-gray-800 font-bold">
                Indulge in Quality and Craftsman
              </h1>
              <h1 className="text-2xl md:text-5xl text-violet-500 font-semibold">
                Welcome to EzBazaar.
              </h1>
              <p className="text-md md:text-lg text-gray-500">
                Immerse yourself in superior craftsmanship and unparalleled
                quality. Each piece is a testament to artistry, promising a
                touch of elegance to your life.
              </p>
              <Link
                to="/products"
                className="text-white font-bold text-center w-48 bg-violet-700 shadow-md rounded p-3 px-5"
              >
                Explore Products
              </Link>
            </div>

            {/* Image Section */}

            <div className="w-full md:w-1/2">
              <img src={Hero4} alt="EzBazaar" className="h-full w-full" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-5 px-4  pt-20   items-center h-full  dark:bg-gray-700 dark:text-white">
            <div className="w-full !z-50 md:w-1/2 h-full flex flex-col gap-5 justify-center ">
              <h1 className="text-4xl md:text-6xl text-gray-800 font-bold">
                Your Journey to Great Living Starts Here
              </h1>
              <p className="text-md md:text-lg text-gray-500">
                Embark on a path to exceptional living. Discover handpicked
                selections that transform the ordinary into the extraordinary,
                crafting a life of unparalleled quality.
              </p>
              <Link
                to="/products"
                className="text-white font-bold text-center w-48 bg-violet-700 shadow-md rounded p-3 px-5"
              >
                Explore Products
              </Link>
            </div>

            {/* Image Section */}

            <div className="w-full md:w-1/2">
              <img src={Hero5} alt="EzBazaar" className="h-full w-full" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row justify-between gap-5 items-center   px-4 pt-20  text-white  h-full  dark:bg-gray-700 ">
            <div className="w-full !z-50 md:w-1/2 h-full flex flex-col gap-5 justify-center  ">
              <h1 className="text-4xl md:text-6xl text-gray-800 font-bold">
                Celebrate
                <span className="text-gray-900"> Unique. </span> Shop
                Exclusives.
              </h1>

              <p className="text-md md:text-lg text-gray-500">
                Join us on a journey where every click unveils something
                special. Embrace convenience, quality, and the joy of
                discovering the extraordinary. Start your shopping adventure
                today at{" "}
                <span className="italic text-violet-700 font-bold">
                  EzBazaar
                </span>{" "}
                .
              </p>
              <Link
                to="/products"
                className="text-white font-bold text-center w-48 bg-violet-700 shadow-md rounded p-3 px-5"
              >
                Explore Products
              </Link>
            </div>

            {/* Image Section */}

            <div className="w-full md:w-1/2">
              <img src={Hero} alt="EzBazaar" className="h-full w-full" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-5 px-4  pt-20   items-center dark:bg-gray-700 dark:text-white">
            <div className="w-full !z-50 md:w-1/2 h-full flex flex-col gap-5 justify-center ">
              <h1 className="text-4xl md:text-6xl text-gray-800 font-bold">
                Discover Your Style, Unleash Your Passion
              </h1>
              <p className="text-md md:text-lg text-gray-500">
                Explore a world of exquisite designs that resonate with your
                unique style. Find the perfect blend of fashion and
                functionality in every click.
              </p>
              <Link
                to="/products"
                className="text-white font-bold text-center w-48 bg-violet-700 shadow-md rounded p-3 px-5"
              >
                Explore Products
              </Link>
            </div>

            {/* Image Section */}

            <div className="w-full md:w-1/2">
              <img
                src={Hero2}
                alt="EzBazaar"
                className="h-full w-[90%] md:w-[80%]"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-5 px-4 pt-20   items-center h-full  dark:bg-gray-700 dark:text-white">
            <div className="w-full !z-50 md:w-1/2 h-full flex flex-col gap-5 justify-center ">
              <h1 className="text-4xl md:text-6xl text-gray-800 font-bold">
                Style Redefined: Where Trends Meet.
              </h1>
              <p className="text-md md:text-lg text-gray-500">
                Step into a world where trends collide with timeless elegance.
                Discover pieces that make a statement today and endure through
                every tomorrow.
              </p>
              <Link
                to="/products"
                className="text-white font-bold text-center w-48 bg-violet-700 shadow-md rounded p-3 px-5"
              >
                Explore Products
              </Link>
            </div>

            {/* Image Section */}

            <div className="w-full md:w-1/2">
              <img src={Hero3} alt="EzBazaar" className="h-full w-full" />
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
