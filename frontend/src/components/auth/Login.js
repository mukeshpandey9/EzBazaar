import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../redux/actions/userAction";
import Spinner from "../Spinner";
import { clearErrors } from "../../redux/reducers/userSlice";
import Logo from "../../assets/img/logo.png";

export function Login() {
  // const count = useSelector();
  const dispatch = useDispatch();
  const { loading, user, token, mesg, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(UserLogin({ email, password }));
    if (!error) {
      message.success("Login Successful");
    }
  };

  const googleLoginHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ backgroundImage: `url("../../assets/img/bg.svg")` }}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto  w-20" src={Logo} alt="EzBazaar" />
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className=" bg-[#ffffff25] p-8 backdrop-blur-sm rounded-lg border-2 border-white mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={loginHandler}
            >
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
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-700 sm:text-sm sm:leading-6"
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
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-violet-700 hover:text-violet-700"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-700 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
                >
                  Sign in
                </button>
              </div>
            </form>
            <h3 className="text-center py-2 text-violet-800 font-bold">or</h3>

            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={googleLoginHandler}
                className="text-center text-violet-700 p-3 px-4 bg-white"
              >
                Login With Google
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-violet-700 hover:text-violet-700"
              >
                Create an Account
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
  );
}
