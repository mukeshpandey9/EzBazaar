import React from "react";
import { SignUP } from "../components/auth/SignUp";
import { Helmet } from "react-helmet";

const SignUpPage = () => {
  return (
    <>
      <Helmet>
        <title>EzBazaar - SignUp</title>
      </Helmet>
      <SignUP />
    </>
  );
};

export default SignUpPage;
