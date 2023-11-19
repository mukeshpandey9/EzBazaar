import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import { Carousel, message } from "antd";
import ReactStars from "react-rating-stars-component";
import Spinner from "./Spinner";
import ContainerWrapper from "./ContainerWrapper";
import ReviewCard from "./ReviewCard";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import { addToCart, clearCartErrors } from "../redux/actions/cartActions";
const products = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

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

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      message.error(error);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, message]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  });

  const [activeImg, setActiveImage] = useState(images.img1);

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

  return (
    <>
      <ContentWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="flex flex-col justify-between pt-32 lg:flex-row gap-20">
              <div className="flex align-middle flex-col gap-6 h-6/12 lg:w-3/6">
                <div className="h-4/6 w-8/12 mx-auto  ">
                  <img
                    src={activeImg}
                    alt=""
                    className="w-full h-full rounded-xl mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-row justify-between h-24">
                  <img
                    src={images.img1}
                    alt=""
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(images.img1)}
                  />
                  <img
                    src={images.img2}
                    alt=""
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(images.img2)}
                  />
                  <img
                    src={images.img3}
                    alt=""
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(images.img3)}
                  />
                  <img
                    src={images.img4}
                    alt=""
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(images.img4)}
                  />
                </div>
              </div>
              {/* ABOUT */}
              <div className="flex flex-col gap-6 lg:w-3/6">
                <div>
                  <span className=" text-violet-600 font-semibold">
                    {product?.category}
                  </span>
                  <h1 className="text-3xl font-bold">{product?.name}</h1>
                </div>
                <p className="text-gray-700">Product:- {product?._id}</p>
                <div className="rating">
                  <ReactStars {...options} value={product?.ratings} />(
                  {`${product?.numOfReviews} reviews`})
                </div>
                <h6 className="text-4xl font-semibold">₹{product?.price} </h6>
                <div className="flex md:flex-row flex-col items-center gap-12">
                  <div className="flex flex-row items-center">
                    <button
                      className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                      onClick={() => setAmount((prev) => prev - 1)}
                    >
                      -
                    </button>
                    <span className="py-4 px-6 rounded-lg">{amount}</span>
                    <button
                      className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                      onClick={() => setAmount((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>

                  {contextHolder}
                  <button
                    className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                <h4 className="inline-flex">
                  Status:{"     "}
                  {product?.stock > 0 ? (
                    <p className="text-green-600 ms-3">In Stock</p>
                  ) : (
                    <p className="text-red-600 ms-3">Out of Stock</p>
                  )}{" "}
                </h4>
                <div className="desc">
                  <h3 className="text-2xl">Description: </h3>
                  <span> {product?.description} </span>
                </div>

                <button className="bg-gray-200 w-36 py-2 px-4 rounded-lg text-violet-800 text-bold">
                  Submit Review
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
