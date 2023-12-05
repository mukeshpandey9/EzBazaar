import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { userSignup, clearErrors } from "../../redux/actions/userAction";
import Spinner from "../Spinner";

export function SignUP() {
  // const count = useSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, token, error } = useSelector((state) => state.user);

  const [imgUrl, setImgUrl] = useState(
    "https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    // TODO: We will add protected routes
    if (token) {
      navigate("/profile");
    }
  }, [dispatch, error, token, navigate]);

  const signUpHandler = (e) => {
    e.preventDefault();
    dispatch(userSignup(name, email, password, avatar));
    if (token) {
      message.success("Register Successful");
    }
  };

  // Image uplaod

  const fileUploadHandle = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUrl(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files);
  };

  return (
    <>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>

            <div className="mt-5 bg-[#ffffff25] p-8 backdrop-blur-sm rounded-lg  border-2 border-white  sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                action="#"
                onSubmit={signUpHandler}
                method="POST"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-800 sm:text-sm sm:leading-6"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="false"
                      required
                      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-800 sm:text-sm sm:leading-6"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="false"
                      required
                      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-800 sm:text-sm sm:leading-6"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Image Upload */}

                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    <img
                      id="preview_img"
                      className="h-16 w-16 object-cover rounded-full"
                      src={imgUrl}
                      alt="Current profile photo"
                    />
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/"
                      onChange={fileUploadHandle}
                      className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                          "
                    />
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-violet-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-800"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-violet-800 hover:text-indigo-500"
                >
                  Login to Your Account
                </Link>
              </p>
              <div className="text-center">
                <Link
                  to="/"
                  className="text-center font-bold text-violet-900 text-sm"
                >
                  Return To Home Page
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
