import { useEffect, useState } from "react";
import preImg from "../assets/img/preimg.png";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productAction";
import { Link, useParams } from "react-router-dom";
import { Carousel, message } from "antd";
import ReactStars from "react-rating-stars-component";
import Spinner from "./Spinner";
import ReviewCard from "./ReviewCard";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import { addToCart } from "../redux/actions/cartActions";
import RatingCard from "./RatingCard";
import { clearErrors } from "../redux/reducers/productSlice";
import { clearCartErrors } from "../redux/reducers/cartSlice";

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

    if (product && product.images) {
      setActiveImage(product.images[0].url);
    }
  }, [error, message, dispatch]);

  const [amount, setAmount] = useState(1);

  // Add TO CArt

  const [messageApi, contextHolder] = message.useMessage();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, qty: amount }));

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

  const [activeImg, setActiveImage] = useState(preImg);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0].url);
    }
  }, [loading, product._id]);

  return (
    <>
      <div className="px-2 md:px-32 py-16">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {product && !error ? (
              <>
                <div className="flex px-4 md:px-0  flex-col justify-between pb-12 pt-4 md:pt-16 lg:flex-row gap-8 md:gap-20">
                  <div className="flex align-middle flex-col gap-3 h-6/12 lg:w-3/6">
                    <div className=" max-h-[50vh] h-[40vh] max-w-[90vw] md:max-h-[70vh] md:h-[60vh]  mx-auto  ">
                      <img
                        src={activeImg}
                        alt=""
                        className="w-full h-full rounded-xl mix-blend-multiply"
                      />
                    </div>

                    <div className="flex w-full  gap-5 flex-row overflow-x-auto justify-start h-28">
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
                  </div>
                </div>
                {/* Review */}
                <div className="container my-10">
                  <RatingCard productId={product?._id} />
                </div>
                <hr />
                <div className="reviews-section overflow-x-auto px-10  mt-8">
                  <h2 className="text-center  text-3xl">Reviews</h2>

                  {product?.reviews && product?.reviews[0] ? (
                    <div className="reviews mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-10 ">
                      {product?.reviews.map((review) => (
                        <ReviewCard review={review} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-violet-700 text-center text-3xl">
                      No Reviews Yet
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="h-screen flex items-center flex-col justify-center">
                <h1 className="text-violet-500 text-center text-3xl  ">
                  Sorry!, The Product You Are Looking is Not Available.
                </h1>
                <div className="flex items-center pt-10 justify-center">
                  <Link
                    to="/products"
                    className="text-center p-3 text-white w-full md:w-40 px-4 bg-violet-700 "
                  >
                    View Products
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
