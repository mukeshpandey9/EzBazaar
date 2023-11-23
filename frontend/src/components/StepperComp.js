import React from "react";
// import { Step, Stepper } from "react-form-stepper";

import { Button, message, Steps, theme } from "antd";
const step = [
  {
    title: "Address Info",
  },
  {
    title: "Payment",
  },
  {
    title: "Success",
  },
];
const StepperComp = ({ activeStep }) => {
  const items = step.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="pb-8">
      <Steps current={activeStep} items={items} />
    </div>
  );
};

export default StepperComp;
