import React, { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value) => {
    setRating(value === rating ? 0 : value);
  };

  return (
    <div className="flex items-end">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star text-3xl cursor-pointer ${
            index + 1 <= rating ? "text-[#E4CF15]" : "text-gray-400"
          }`}
          onClick={() => handleStarClick(index + 1)}
        >
          &#9733;
        </span>
      ))}
      <p className="ml-2">{rating > 0 ? `You rated ${rating} out of 5` : ""}</p>
    </div>
  );
};

export default Rating;
