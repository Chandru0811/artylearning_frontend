import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
import AssessmentChild from "./DoAssessment/AssessmentChild";
import AssessmentChildPencil from "./DoAssessment/AssessmentChildPencil";
import AssessmentBeliever from "./DoAssessment/AssessmentBeliever";
import AssessmentAlphabets from "./DoAssessment/AssessmentAlphabets";
import AssessmentPursuers from "./DoAssessment/AssessmentPursuers";

const steps = ["", "", "", "", ""];

export default function LeadAssessment() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const childRef = React.useRef();
  console.log("Form Data:", formData);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSaveAndNext = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.AssessmentChild();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.AssessmentChildPencil();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.AssessmentBeliever();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.AssessmentAlphabets();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.AssessmentPursuers();
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
            <AssessmentChild
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && (
            <AssessmentChildPencil
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}
          {activeStep === 2 && (
            <AssessmentBeliever
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}
          {activeStep === 3 && (
            <AssessmentAlphabets
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}
          {activeStep === 4 && (
            <AssessmentPursuers
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
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
              onClick={handleSaveAndNext}
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
