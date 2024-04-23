import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LeadStudentAdd from "./AddLead/LeadStudentAdd";
import LeadChildAdd from "./AddLead/LeadChildAdd";
import LeadParentAdd from "./AddLead/LeadParentAdd";
import LeadAccountAdd from "./AddLead/LeadAccountAdd";

const steps = ["", "", "", ""];

export default function LeadAdd() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const childRef = React.useRef();
  // console.log("Form Data:",formData);

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
          childRef.current.studentInfo();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.childAbilty();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.parentInfo();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.accountInfo();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="container-fluid minHeight">
      <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="container-fluid card shadow border-0 mb-4">
          <React.Fragment>
            {activeStep === 0 && (
              <LeadStudentAdd
              formData={formData} ref={childRef} setFormData={setFormData} handleNext={handleNext}
              />
            )}
            {activeStep === 1 && (
              <LeadChildAdd
                formData={formData} ref={childRef} setFormData={setFormData} handleNext={handleNext}
              />
            )}
            {activeStep === 2 && (
              <LeadParentAdd
                formData={formData} ref={childRef} setFormData={setFormData} handleNext={handleNext}
              />
            )}
            {activeStep === 3 && (
              <LeadAccountAdd
               formData={formData} ref={childRef} setFormData={setFormData} handleNext={handleNext}
              />
            )}
            <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-border btn-sm mt-5 mb-3"
                style={{ padding: "7px" }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </button>

              <div style={{ flex: "1 1 auto" }}></div>

              <button
                className="btn btn-button btn-sm mt-5 mb-3"
                onClick={handleButtonClick}
                style={{ padding: "7px" }}
              >
                {activeStep === steps.length - 1 ? "Submit" : " Save And Next"}
              </button>
            </div>
          </React.Fragment>
      </div>
    </div>
  );
}
