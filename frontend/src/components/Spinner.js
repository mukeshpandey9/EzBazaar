import React from "react";
import { HashLoader } from "react-spinners";
const Spinner = () => {
  const override = {
    display: "block",
    // margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "Center",
    width: "100%",
    zIndex: "100",
    height: "100vh",
    background: "rgba(20,20,20,0.2)",
    transform: "rotate(0deg)",
  };
  return (
    <>
      <HashLoader color="purple" cssOverride={override} />
    </>
  );
};

export default Spinner;
