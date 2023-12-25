import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { createProduct } from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  createProductReset,
} from "../../redux/reducers/productSlice";

const CreateProduct = () => {
  const categoryOptions = [
    "Laptop",
    "Shoes",
    "Groceries",
    "Skincare",
    "Cloths",
    "Electronics",
    "SmartPhones",
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector((state) => state.products);

  // Image uplaod

  const fileUploadHandle = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!title || !description || !price | !category) {
      message.warning("All Fields Are Required!");
      return;
    }

    let formData = new FormData();

    formData.set("name", title);
    formData.set("description", description);

    formData.set("price", price);
    formData.set("category", category);
    formData.set("stock", stock);

    imgUrl.forEach((image) => {
      formData.append("images", image);
    });

    setImgUrl([]);
    // console.log(imgUrl);

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success("Product Created SuccessFully");
      navigate("/admin/products");
    }

    dispatch(createProductReset());
  }, [dispatch, error, success]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SideBar />
          <div className="container mt-12 md:mt-2 mx-auto h-full w-full ">
            <h1 className="text-center py-3 text-5xl text-violet-800 ">
              Create Product
            </h1>
            <div className="card w-full  flex items-center  justify-center  h-full ">
              <form className="w-96 max-w-lg flex flex-col py-8 bg-white gap-6">
                <div className="w-full px-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full px-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3  leading-tight focus:outline-none min-w-full focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    rows="3"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description..."
                  />
                </div>

                <div className="w-full px-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    required="true"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="w-full px-5">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="Stock"
                  >
                    Stock
                  </label>
                  <input
                    required="true"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="Stock"
                    type="number"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="w-full  px-5 ">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      required="true"
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select..</option>
                      {categoryOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Image */}

                <div className="flex items-center w-full px-5 flex-col">
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      required
                      type="file"
                      name="avatar"
                      multiple
                      accept="image/"
                      onChange={fileUploadHandle}
                      className="block w-full text-sm text-slate-500
  file:mr-4 file:py-2 file:px-4
  file:rounded-full file:border-0
  file:text-sm file:font-semibold
  file:bg-violet-50 file:text-violet-800
  hover:file:bg-violet-100
"
                    />
                  </label>

                  <div className="flex py-3 w-full gap-6 overflow-x-auto">
                    {imgUrl &&
                      imgUrl.map((src, i) => {
                        return (
                          <img
                            key={i}
                            id="preview_img"
                            className="h-20 w-16 object-cover"
                            src={src}
                            alt="Current profile photo"
                          />
                        );
                      })}
                  </div>
                </div>

                <div className="px-4 text-center">
                  <button
                    className="outline-none  text-center p-3 px-4 hover:bg-violet-500 active:bg-violet-500 bg-violet-800 text-white "
                    type="submit"
                    onClick={handleCreateProduct}
                  >
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateProduct;
