import * as React from "react";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AddCourceDetails from "./AddStudent/AddCourceDetails";
import AddParentGuardian from "./AddStudent/AddParentGuardian";
import AddStudentDetails from "./AddStudent/AddStudentDetails";
import AddEmergencyContact from "./AddStudent/AddEmergencyContact";
import AddStudentRelation from "./AddStudent/AddStudentRelation";
import AddTermsAndCondition from "./AddStudent/AddTermsAndCondition";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

const steps = [
  { tooltip: "Student Details" },
  { tooltip: "Parents/Guardian" },
  { tooltip: "Emergency Contact" },
  { tooltip: "Course Details" },
  { tooltip: "Student Relation" },
  { tooltip: "Terms and Conditions" },
];
export default function StudentAdd() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loadIndicator, setLoadIndicator] = useState(false);

  const childRef = React.useRef();
  console.log("Form Data:", formData);

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
          childRef.current.StudentDetails();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.ParentGuardian();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.EmergencyContact();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.CourseDetail();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.StudentRelation();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.TermsAndCondition();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div class="container-fluid minHeight">
      <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
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
      <div class="container-fluid py-3 mb-5 card shadow border-0 mb-7">
        <React.Fragment>
          {activeStep === 0 && (
            <AddStudentDetails
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 1 && (
            <AddParentGuardian
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 2 && (
            <AddEmergencyContact
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 3 && (
            <AddCourceDetails
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 4 && (
            <AddStudentRelation
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 5 && (
            <AddTermsAndCondition
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
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
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}
