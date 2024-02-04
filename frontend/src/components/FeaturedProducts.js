import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import SmallBorder from "./SmallBorder";
const FeaturedProducts = ({ products = [] }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <>
      {Array.isArray(products) && products.length > 0 && (
        <div className="mt-10 py-16 bg-white px-4 sm:px-10 md:px-24">
          <h1 className="text-center text-5xl text-gray-700">
            Featured Products
          </h1>
          <SmallBorder />
          <div className="grid pt-10 px-4 md:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {products.map((product) => (
              <Link key={product?._id} to={`/product/${product?._id}`}>
                <div className="group pb-3 relative shadow-md md:shadow-sm backdrop-blur-md border rounded-md md:hover:shadow-lg">
                  <div className="w-full overflow-hidden object-contain flex items-center justify-center text-center rounded-md  lg:aspect-none group-hover:opacity-75 h-[17rem] lg:h-[13rem]">
                    <img
                      src={product?.images[0].url}
                      alt={product?.name}
                      className="p-3 h-full w-max object-cover object-center lg:h-full lg:w-[95%]"
                    />
                  </div>
                  <div className="px-3 flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500 ">
                        <ReactStars
                          {...options}
                          value={product?.ratings}
                          activeColor="#FFD700"
                        />
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-violet-700 font-medium">
                        ₹{Math.round(product?.price)}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-sm px-4 w-full text-center mt-2 text-gray-700">
                    {product?.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
