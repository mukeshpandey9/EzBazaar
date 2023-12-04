import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactStars from "react-rating-stars-component";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";

import { Link, useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../redux/actions/productAction";
import Spinner from "./Spinner";
import { Pagination, Slider, message } from "antd";
import ContentWrapper from "./contentWrapper/ContentWrapper";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Laptop", label: "Laptop", checked: false },
      { value: "Groceries", label: "Groceries", checked: false },
      { value: "Skincare", label: "Skincare", checked: false },
      { value: "Shoes", label: "Shoes", checked: false },
      { value: "SmartPhones", label: "SmartPhones", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerpage } =
    useSelector((state) => state.products);

  const { keyword } = useParams();

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filters
  // Price

  const [price, setPrice] = useState([0, 50000]);
  const priceHandler = (e, newPrice) => {
    setPrice(e);
  };

  // Sort By

  // Category

  const [category, setCategory] = useState();

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, error, keyword, currentPage, price, category]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <ContentWrapper>
          <div>
            {/* Search and filterr component */}

            <div className="bg-white">
              <div>
                {/* Mobile filter dialog */}

                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setMobileFiltersOpen}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                      <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                          <div className="flex items-center justify-between px-4">
                            <h2 className="text-2xl  font-extrabold text-gray-900">
                              Filters
                            </h2>
                            <button
                              type="button"
                              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                              onClick={() => setMobileFiltersOpen(false)}
                            >
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          {/* Filters */}
                          <form className="mt-4 border-t border-gray-200">
                            <div className="px-5">
                              <h3 className="font-bold text-xl">Price </h3>
                              <Slider
                                onAfterChange={priceHandler}
                                range={{
                                  draggableTrack: true,
                                }}
                                min={0}
                                max={50000}
                                defaultValue={price}
                              />
                            </div>
                            {filters.map((section) => (
                              <Disclosure
                                as="div"
                                key={section.id}
                                className="border-t border-gray-200 px-4 py-6"
                              >
                                {({ open }) => (
                                  <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">
                                          {section.name}
                                        </span>
                                        <span className="ml-6 flex items-center">
                                          {open ? (
                                            <MinusIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <PlusIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          )}
                                        </span>
                                      </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                      <div className="space-y-6">
                                        {section.options.map(
                                          (option, optionIdx) => (
                                            <ul
                                              key={option.value}
                                              className="flex items-center"
                                            >
                                              <li
                                                id={`filter-${section.id}-${optionIdx}`}
                                                className="rounded border-gray-300 bg-violet-200 p-2 text-violet-700 focus:ring-indigo-500
                                            hover:text-orange-300
                                            "
                                                onClick={() =>
                                                  setCategory(option.value)
                                                }
                                              >
                                                {option.value}
                                              </li>
                                            </ul>
                                          )
                                        )}
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ))}
                          </form>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex mx-auto lg:flex-row flex-col items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                      All Products
                    </h1>

                    <div className="flex items-center pt-10">
                      <Menu
                        as="div"
                        className=" relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sort
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                          <button
                            className="lg:w-40 w-24 ms-9 text-xs  lg:text-xl bg-violet-200 text-violet-800   p-2 rounded-md"
                            onClick={() => {
                              setPrice([0, 50000]);
                              setCategory("");
                            }}
                          >
                            Reset Filters
                          </button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {sortOptions.map((option) => (
                                <Menu.Item key={option.name}>
                                  {({ active }) => (
                                    <p
                                      className={classNames(
                                        option.current
                                          ? "font-medium text-gray-900"
                                          : "text-gray-500",
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      {option.name}
                                    </p>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      <button
                        type="button"
                        className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                      ></button>
                      <button
                        type="button"
                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                      >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <section
                    aria-labelledby="products-heading"
                    className="pb-24 min-h-screen pt-6"
                  >
                    <h2 id="products-heading" className="sr-only">
                      Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                      {/* Filters */}
                      <form className="hidden lg:block">
                        {/* Price filter */}

                        <h3>Price</h3>
                        <Slider
                          onAfterChange={priceHandler}
                          range={{
                            draggableTrack: true,
                          }}
                          min={0}
                          max={50000}
                          defaultValue={price}
                        />

                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-b border-gray-200 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="false"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="false"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-4">
                                    {section.options.map(
                                      (option, optionIdx) => {
                                        return (
                                          <>
                                            <ul
                                              key={option.value}
                                              className="flex flex-wrap items-center"
                                            >
                                              <li
                                                id={`filter-${section.id}-${optionIdx}`}
                                                className={`rounded border-gray-300 bg-violet-200 p-2 text-violet-700 focus:ring-indigo-500
                                            hover:text-violet-600 cursor-pointer
                                             
                                            `}
                                                onClick={() => {
                                                  setCategory(option.value);
                                                }}
                                              >
                                                {option.value}
                                              </li>
                                            </ul>
                                          </>
                                        );
                                      }
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                      {/* Search and filter ends here */}

                      {/* Product grid */}

                      <div className="lg:col-span-3 ">
                        <div className="flex justify-between px-10">
                          {keyword && (
                            <h3 className="text-2xl ">
                              Results for{" "}
                              <span className="text-violet-600">
                                '{keyword}'
                              </span>
                            </h3>
                          )}
                          {category && (
                            <h3 className="text-xl ">
                              Category:{" "}
                              <span className="text-lg text-violet-600">
                                '{category}'
                              </span>
                            </h3>
                          )}
                        </div>

                        {/* This is product page All products Listed */}
                        {products?.length < 1 ? (
                          <h1 className="flex items-center justify-center text-7xl mt-10 text-gray-400">
                            No Products Found
                          </h1>
                        ) : (
                          <>
                            <div className="bg-white">
                              <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                  {products?.map((product) => (
                                    <Link to={`/product/${product?._id}`}>
                                      <div
                                        key={product.id}
                                        className="group relative backdrop-blur-sm border rounded"
                                      >
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden object-contain rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-[19rem] lg:h-[17rem]">
                                          <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="h-full w-max object-cover object-center lg:h-full lg:w-full"
                                          />
                                        </div>
                                        <div className="mt-4 p-4 flex justify-between">
                                          <div>
                                            <h3 className="text-sm text-gray-700">
                                              <a href={product?.thumbnail}>
                                                <span
                                                  aria-hidden="true"
                                                  className="absolute font-semibold text-xl inset-0"
                                                />
                                                {product?.name}
                                              </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 ">
                                              <ReactStars
                                                {...options}
                                                value={product.ratings}
                                                activeColor="#FFD700"
                                              />
                                              <span className="align-bottom">
                                                ( {product?.numOfReviews}{" "}
                                                reviews)
                                              </span>
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-violet-700 font-medium">
                                              ₹{Math.round(product?.price)}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Pagination */}

                  {productsCount > resultPerpage && (
                    <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                      <Pagination
                        defaultCurrent={1}
                        total={productsCount}
                        defaultPageSize={resultPerpage}
                        responsive
                        current={currentPage}
                        onChange={handlePageChange}
                      />
                    </div>
                  )}
                </main>
              </div>
            </div>
          </div>
        </ContentWrapper>
      )}
    </>
  );
}
