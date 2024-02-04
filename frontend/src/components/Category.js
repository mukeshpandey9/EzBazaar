import React from "react";
import Mobile from "../assets/categoryImg/mobile.jfif";
import Cloths from "../assets/categoryImg/cloths.webp";
import Groceries from "../assets/categoryImg/groceries.jpg";
import Electronics from "../assets/categoryImg/electronics.jpg";
import Laptop from "../assets/categoryImg/laptop.webp";
import Skincare from "../assets/categoryImg/skincare.jfif";
import Shoes from "../assets/categoryImg/shoes.jpg";
import SmallBorder from "./SmallBorder";
import { Link } from "react-router-dom";

const CategoryComponent = ({ image, category }) => {
  return (
    <Link
      className="w-full cursor-pointer flex flex-col items-center justify-center"
      to={`/products?page=1&category=${category}`}
    >
      <div className="overflow-hidden flex items-center justify-center border md:w-28 md:h-28 w-24 h-24 border-violet-600 rounded-full ">
        <img
          src={image}
          alt="Category"
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-gray-700 hover:text-violet-700">{category}</h1>
    </Link>
  );
};

const Category = () => {
  return (
    <div className="mt-16 px-4 md:px-24">
      <h1 className="text-center text-5xl text-gray-700">Explore Categories</h1>
      <SmallBorder />
      <div className="flex py-10 gap-5 justify-between overflow-x-auto hide-scrollbar">
        <CategoryComponent image={Mobile} category="SmartPhones" />
        <CategoryComponent image={Cloths} category="Cloths" />

        <CategoryComponent image={Laptop} category="Laptop" />
        <CategoryComponent image={Electronics} category="Electronics" />
        <CategoryComponent image={Skincare} category="Skincare" />
        <CategoryComponent image={Groceries} category="Groceries" />
        <CategoryComponent image={Shoes} category="Shoes" />
      </div>
    </div>
  );
};

export default Category;
