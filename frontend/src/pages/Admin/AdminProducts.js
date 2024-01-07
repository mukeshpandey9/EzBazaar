import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SideBar from "../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAdminProducts,
} from "../../redux/actions/productAction";
import { Pagination, message } from "antd";
import Spinner from "../../components/Spinner";
import { clearErrors } from "../../redux/reducers/productSlice";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { products, error, loading, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [page, setPage] = useState(1);

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
    dispatch(getAdminProducts({ page }));

    if (error) {
      message.error(error);
      dispatch(clearErrors());
      return;
    }

    if (!error && !loading) {
      message.success("Products Fetched");
    }
  }, [dispatch, page]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SideBar />
          <div className="container pt-16 md:pt-2 md:pl-64 mx-auto px-4 md:px-10 py-4">
            <h1 className="text-3xl font-bold text-violet-800">All Products</h1>

            <div className="max-w-full overflow-x-auto ">
              <table className="w-full mt-4">
                {products && products.length > 0 ? (
                  <>
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 text-left uppercase font-bold">
                        <th className="px-4 md:px-10 py-3">Product Name</th>

                        <th className="px-4 md:px-10 py-3">Quantity</th>
                        <th className="px-4 md:px-10 py-3">Price</th>
                        <th className="px-4 md:px-10 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product._id}
                          className="bg-white border-b text-center"
                        >
                          <td className="px-4 md:px-10 py-3 ">
                            <Link
                              to={`/product/${product?._id}`}
                              className="flex gap-3 items-center"
                            >
                              <img
                                src={product?.images[0]?.url}
                                className="w-12 h-12"
                                alt="product"
                              />
                              <p> {product?.name}</p>
                            </Link>
                          </td>

                          <td className="px-4 md:px-10 py-3">
                            {product?.stock}
                          </td>

                          <td className="px-4 md:px-10 py-3">
                            {product?.price}
                          </td>
                          <td className="flex justify-between">
                            <Link
                              to={`/admin/product/update/${product._id}`}
                              className="px-4 md:px-10 py-2 text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="px-4 md:px-10 py-2 text-red-500 hover:text-red-700"
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
            {productsCount > resultPerPage && (
              <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 md:px-10 py-3 sm:px-6">
                <Pagination
                  defaultCurrent={1}
                  total={productsCount}
                  defaultPageSize={resultPerPage}
                  responsive
                  current={page}
                  onChange={handlePageChange}
                />
              </div>
            )}
            <Link
              to="/admin/product/new"
              className="bg-violet-800 shadow-md text-white px-4 md:px-10 py-2 rounded mt-4 inline-block"
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
