import * as React from "react";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import EditRegistration from "./EditStudent/EditRegistration";
import EditDetails from "./EditStudent/EditDetails";
import { useParams } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

const steps = [{ tooltip: "Student Details" }, { tooltip: "Emergency Contact" }];

export default function StudentAdd() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({ id });

  const childRef = React.useRef();
  // console.log("Form Data:", formData);

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
          childRef.current.EditDetails();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.EmergencyContact();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="container-fluid minHeight">
      {/* <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((label,index) => (
          <Step key={label} onClick={() => setActiveStep(index)}>
            
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-${index}`}>{label.tooltip}</Tooltip>}
              >
                <StepLabel>{label}</StepLabel>
              </OverlayTrigger>
          </Step>
        ))}
      </Stepper> */}

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
            <EditDetails
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && (
            <EditRegistration
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
