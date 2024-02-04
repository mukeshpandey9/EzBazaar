import React from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="px-4  py-10 md:px-32 bg-gray-200">
      <h1 className="text-center text-2xl font-semibold">
        Made with 💖 By{" "}
        <span className="text-violet-700 font-bold">Mukesh Pandey</span>
      </h1>
      <div className="flex flex-wrap mt-12 justify-between">
        <div className="w-24">
          <img src={logo} alt="EzBazaar" className="w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-xl">Quick Links</h1>
          <Link to="/" className="hover:text-violet-700">
            Home
          </Link>
          <Link to="/products" className="hover:text-violet-700">
            All Products
          </Link>
          <Link to="/contact" className="hover:text-violet-700">
            Contact Us
          </Link>
        </div>

        <div className="flex gap-8">
          <a href="https://github.com/mukeshpandey9" target="_blank">
            <GithubFilled className="scale-[2]" />
          </a>
          <a href="https://linkedin.com/in/mukeshpandey9" target="_blank">
            <LinkedinFilled className="scale-[2]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
