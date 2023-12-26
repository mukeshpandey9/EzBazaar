import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAdminProducts,
} from "../../redux/actions/productAction";
import { message } from "antd";
import Spinner from "../../components/Spinner";
import { clearErrors } from "../../redux/reducers/productSlice";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));

    if (error) {
      message.error(error);
    }

    if (!error) {
      message.success("Product Deleted");
    }
    dispatch(getAdminProducts());
  };

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
      return;
    }

    if (!error && !loading) {
      message.success("Products Fetched");
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SideBar />
          <div className="container pt-16 md:pt-2 md:pl-64 mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-violet-800">All Products</h1>

            <div className="max-w-full overflow-x-scroll">
              <table className="w-full mt-4 ">
                {products && products.length > 0 ? (
                  <>
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 text-left uppercase font-bold">
                        <th className="px-4 py-3">Product ID</th>
                        <th className="px-4 py-3">Product Name</th>

                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          className="bg-white border-b text-center"
                        >
                          <td className="px-4 py-3">{product?._id}</td>

                          <td className="px-4 py-3">{product?.name}</td>

                          <td className="px-4 py-3">{product?.stock}</td>

                          <td className="px-4 py-3">{product?.price}</td>
                          <td className="flex justify-between">
                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="px-4 py-2 text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="px-4 py-2 text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <h1 className="text-center font-bold text-6xl">
                    No Products Found
                  </h1>
                )}
              </table>
            </div>

            <Link
              to="/admin/product/new"
              className="bg-violet-800 shadow-md text-white px-4 py-2 rounded-md mt-4 inline-block"
            >
              Create New Product
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AdminProductsPage;
