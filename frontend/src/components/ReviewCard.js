import React from "react";
import ReactStars from "react-rating-stars-component";
import Profile from "../assets/img/profile.png";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <div className="w-52 h-full p-5 border rounded-2xl border-3 border-gray-200">
      <img src={Profile} className="w-full rounded-full h-40" alt="" />
      <p className="text-center">{review.name}</p>
      <p className="mx-auto">
        <ReactStars {...options} value={review.rating} />
      </p>
      <span className="mt-14  text-gray-700">"{review.comment}"</span>
    </div>
  );
};

export default ReviewCard;
