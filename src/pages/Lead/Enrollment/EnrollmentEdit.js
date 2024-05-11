import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import EditForm1 from "./EditEnrollment/EditForm1";
import EditForm2 from "./EditEnrollment/EditForm2";
import EditForm3 from "./EditEnrollment/EditForm3";
import EditForm4 from "./EditEnrollment/EditForm4";
import EditForm5 from "./EditEnrollment/EditForm5";
import EditForm6 from "./EditEnrollment/EditForm6";
import { useParams } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

const steps = [{ tooltip: "Student Information" }, { tooltip: "Child Ability" },{ tooltip: "Parent Information" },{ tooltip: "Address" },{ tooltip: "Account Information" },{ tooltip: "Authorised Person Address" }];


export default function EnrollmentEdit() {
  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ id });
  const [loadIndicator, setLoadIndicator] = useState(false);

  const childRef = React.useRef();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleButtonClick = () => {
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.editForm1();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.editForm2();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.editForm3();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.editform4();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.editform5();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.editform6();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="container-fluid minHeight">
     <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${index}`}>{step.tooltip}</Tooltip>
              }
            >
              <StepLabel></StepLabel>
            </OverlayTrigger>
          </Step>
        ))}
      </Stepper>
      <div className="container-fluid card shadow border-0 mb-4">
        <React.Fragment>
          {activeStep === 0 && (
            <EditForm1
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 1 && (
            <EditForm2
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 2 && (
            <EditForm3
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 3 && (
            <EditForm4
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 4 && (
            <EditForm5
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 5 && (
            <EditForm6
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
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
              type="submit"
              onClick={handleButtonClick}
              style={{ padding: "7px" }}
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              {activeStep === steps.length - 1 ? "Submit" : " Save And Next"}
            </button>
            {/* <button
              className="btn btn-button btn-sm mt-5 mb-3"
              onClick={handleButtonClick}
              style={{ padding: "7px" }}
            >
              {activeStep === steps.length - 1 ? "Submit" : " Save And Next"}
            </button> */}
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
