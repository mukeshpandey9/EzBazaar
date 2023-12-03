import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createReview } from "../redux/actions/productAction";

const RatingCard = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isReviewed } = useSelector((state) => state.review);

  const submitReviewHandler = (e) => {
    console.log("Inside Submit");
    e.preventDefault();
    if (!rating || !reviewMessage) {
      return message.warning("Please Fill All Details");
    }

    dispatch(createReview(rating, reviewMessage, productId));

    if (error) {
      message.error(error);
      dispatch(clearErrors());
      return;
    }

    if (isReviewed) {
      return message.success("Review Added");
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
      return;
    }
  }, [dispatch, error]);

  const handleStarClick = (value) => {
    setRating(value === rating ? 0 : value);
  };
  return (
    <>
      <div className="flex px-4 flex-col md:flex-row items-end gap-10 justify-center md:justify-between ">
        <div className="w-full">
          <div className="flex items-center mb-2">
            <svg
              className="w-4 h-4 text-[#FFD700] me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-[#FFD700] me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-[#FFD700] me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-[#FFD700] me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              4.95
            </p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              out of
            </p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              5
            </p>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            1,745 global ratings
          </p>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              5 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-[#FFD700] rounded"
                style={{ width: "70%" }}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              70%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              4 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-[#FFD700] rounded"
                style={{ width: "17%" }}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              17%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              3 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-[#FFD700] rounded"
                style={{ width: "8%" }}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              8%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              2 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-[#FFD700] rounded"
                style={{ width: "4%" }}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              4%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              1 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-[#FFD700] rounded"
                style={{ width: "1%" }}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              1%
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-center text-2xl font-semibold text-violet-700">
            Write Review Here,
          </h1>
          <div className="">
            {/* Rating */}
            <h4 className="text-violet-500">Rating</h4>
            <div className="flex items-end">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`star text-3xl cursor-pointer ${
                    index + 1 <= rating ? "text-[#FFD700]" : "text-gray-400"
                  }`}
                  onClick={() => handleStarClick(index + 1)}
                >
                  &#9733;
                </span>
              ))}
              <p className="ml-2">
                {rating > 0 ? `You rated ${rating} out of 5` : ""}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-violet-500">Review</h4>
            <textarea
              rows="4"
              cols="100"
              className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3  leading-tight focus:outline-none min-w-full focus:bg-white focus:border-gray-500"
              placeholder="Write Something About the product..."
              onChange={(e) => setReviewMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white w-24 rounded disabled:bg-violet-500 disabled:cursor-not-allowed bg-violet-700 text-center p-2 px-3"
            onClick={submitReviewHandler}
            disabled={loading ? true : false}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RatingCard;
