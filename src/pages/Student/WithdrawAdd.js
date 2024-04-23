import {Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import StudentWithdraw from "./AddWithdraw/StudentWithdraw";
import StudentRefund from "./AddWithdraw/StudentRefund";

const steps = ["", ""];

export default function WithdrawAdd() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const childRef = React.useRef();
  console.log("Form Data:",formData);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleButtonClick = () => {
    // console.log("1",childRef);
    // Call the child function using the ref
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.studentWithdraw();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.studentRefund();
        }
        break;
        
        default:
        break;
    }
  };


  return (
    <div class="container-fluid minHeight my-5">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          
          return (
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5">
        
          
         
          <React.Fragment>
            {activeStep === 0 && (
              <StudentWithdraw
              formData={formData} ref={childRef} setFormData={setFormData} handleNext={handleNext}
              />
            )}
            {activeStep === 1 && (
              <StudentRefund
              formData={formData} ref={childRef} setFormData={setFormData} handleNext={handleNext}
              />
            )}

            <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-border btn-sm"
                style={{ padding: "7px" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>

              <div style={{ flex: "1 1 auto" }}></div>

              <button
                className="btn btn-button btn-sm"
                onClick={handleButtonClick}
                style={{ padding: "7px" }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Save and Next"}
              </button>
            </div>
          </React.Fragment>
        
      </div>
    </div>
  );
}



