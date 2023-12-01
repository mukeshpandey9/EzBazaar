import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { Carousel, message } from "antd";
import ReactStars from "react-rating-stars-component";
import Spinner from "./Spinner";
import ReviewCard from "./ReviewCard";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import { addToCart, clearCartErrors } from "../redux/actions/cartActions";

export default function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  // Cart

  const { cartLoading, success, cartError } = useSelector(
    (state) => state.cart
  );

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [error, message, dispatch]);

  const [amount, setAmount] = useState(1);

  // Add TO CArt

  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = () => {
    dispatch(addToCart(id, amount));

    messageApi.open({
      type: "loading",
      content: "Action in progress..",
      duration: 2.5,
    });

    if (cartError) {
      message.error(cartError);
      dispatch(clearCartErrors());
      return;
    }
    message.success("Item Added To Cart SuccessFully");
  };

  const [activeImg, setActiveImage] = useState(product?.images[0].url || "");

  return (
    <>
      <ContentWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col justify-between py-32 lg:flex-row gap-20">
              <div className="flex align-middle flex-col gap-6 h-6/12 lg:w-3/6">
                <div className=" h-full w-full  mx-auto  ">
                  <img
                    src={activeImg}
                    alt=""
                    className="w-full h-full rounded-xl mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-row justify-between h-24">
                  {product &&
                    product.images &&
                    Array.isArray(product.images) &&
                    product?.images.map((image) => {
                      return (
                        <img
                          src={image?.url}
                          alt=""
                          className="md:w-24 md:h-24 w-20 h-20 rounded-md cursor-pointer"
                          onClick={() => setActiveImage(image?.url)}
                        />
                      );
                    })}
                </div>
              </div>
              {/* ABOUT */}
              <div className="flex flex-col gap-2 md:5 lg:w-3/6">
                <div>
                  <span className=" text-violet-600 font-semibold">
                    {product?.category}
                  </span>
                  <h1 className="text-3xl font-bold">{product?.name}</h1>
                </div>
                <p className="text-gray-700">Product:- {product?._id}</p>

                <div className="desc my-3">
                  <h3 className="text-2xl">Description: </h3>
                  <span className="pt-4 text-gray-600">
                    {" "}
                    {product?.description}{" "}
                  </span>
                </div>
                <div className="rating">
                  <ReactStars {...options} value={product?.ratings} />(
                  {`${product?.numOfReviews} reviews`})
                </div>
                <div className="flex gap-4 items-end">
                  <h6 className="text-4xl font-semibold">
                    ₹ {product?.price}{" "}
                  </h6>
                  <h6 className="text-2xl text-gray-500 line-through font-medium">
                    ₹ {product?.price * 1.5}{" "}
                  </h6>
                </div>

                <h4 className="inline-flex mt-2">
                  Status:{"     "}
                  {product?.stock > 0 ? (
                    <p className="text-green-600 ms-3">In Stock</p>
                  ) : (
                    <p className="text-red-600 ms-3">Out of Stock</p>
                  )}{" "}
                </h4>
                <div className="flex flex-row justify-center md:justify-start my-4 items-center gap-12">
                  <div className="flex flex-row items-center">
                    <button
                      className={`bg-gray-200 py-1 md:py-2 px-3 md:px-5 rounded-lg text-violet-800 text-3xl disabled:text-violet-400 disabled:cursor-not-allowed`}
                      disabled={amount <= 1}
                      onClick={() => setAmount((prev) => prev - 1)}
                    >
                      -
                    </button>
                    <span className="py-4 md:px-6 px-4 rounded-lg">
                      {amount}
                    </span>
                    <button
                      className="bg-gray-200 py-1 md:py-2 px-3 md:px-4 rounded-lg text-violet-800 text-3xl disabled:text-violet-400 disabled:cursor-not-allowed"
                      disabled={amount > product?.stock - 1}
                      onClick={() => setAmount((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>

                  {contextHolder}
                  <button
                    className="bg-violet-800 text-white font-semibold py-3 px-4 rounded-xl h-full"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                <button className="bg-gray-200 w-40 py-2 px-4 rounded-lg text-violet-800 text-bold">
                  Write Review
                </button>
              </div>
            </div>
            <hr />
            <div className="reviews-section overflow-x-scroll px-10  mt-8">
              <h2 className="text-center  text-3xl">Reviews</h2>

              {product?.reviews && product?.reviews[0] ? (
                <div className="reviews mt-8 flex gap-10 ">
                  {product?.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-orange-700 text-2xl">No Reviews Yet</p>
              )}
            </div>
          </>
        )}
      </ContentWrapper>
    </>
  );
}
