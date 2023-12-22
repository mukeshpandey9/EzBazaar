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
    background: "rgba(42%, 22%, 75%,0.3)",
    transform: "rotate(0deg)",
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  return (
    <>
      <HashLoader color="purple" cssOverride={override} />
    </>
  );
};

export default Spinner;
