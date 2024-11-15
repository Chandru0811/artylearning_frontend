import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PersonalEdit from "./EditTeacher/PersonalEdit";
import AccountEdit from "./EditTeacher/AccountEdit";
import ContactEdit from "./EditTeacher/ContactEdit";
import RequiredEdit from "./EditTeacher/RequiredEdit";
import SalaryEdit from "./EditTeacher/SalaryEdit";
import LeaveEdit from "./EditTeacher/LeaveEdit";
import ContractEdit from "./EditTeacher/ContractEdit";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Account Information" },
  { tooltip: "Contact Information" },
  { tooltip: "Required Information" },
  { tooltip: "Salary Information" },
  { tooltip: "Leave Information" },
  { tooltip: "Contract Informationn" },
];

export default function TeacherEdit() {
  const { staff_id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // Extract the "role" search parameter
  const roleFromURL = searchParams.get("role");
  const childRef = React.useRef();
  const [formData, setFormData] = useState({ staff_id });
  console.log("object",formData)

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    const role = formData.role?.toLowerCase();
    let nextStep = activeStep + 1;

    if (role === "freelancer") {
      if (activeStep === 3) {
        nextStep = 6; 
      } else if (activeStep === 4) {
        nextStep = 6;
      }
    }

    setActiveStep(nextStep);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    const role = formData.role?.toLowerCase();
    let previousStep = activeStep - 1;

    if (role === "freelancer") {
      if (activeStep === 7) {
        previousStep = 4; // Go back to step 4 from step 7
      } else if (activeStep === 6) {
        previousStep = 3; // Skip step 5 and go back to step 3
      }
    }
  
    setActiveStep(previousStep);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const handleButtonClick = () => {
  //   // console.log("1",childRef);
  //   // Call the child function using the ref
  //   switch (activeStep.toString()) {
  //     case "0":
  //       if (childRef.current) {
  //         childRef.current.personalEdit();
  //       }
  //       break;
  //     case "1":
  //       if (childRef.current) {
  //         childRef.current.accountEdit();
  //       }
  //       break;
  //     case "2":
  //       if (childRef.current) {
  //         childRef.current.contactEdit();
  //       }
  //       break;
  //     case "3":
  //       if (childRef.current) {
  //         childRef.current.requireEdit();
  //       }
  //       break;
  //     case "4":
  //       if (childRef.current) {
  //         childRef.current.salaryEdit();
  //       }
  //       break;
  //     case "5":
  //       if (childRef.current) {
  //         childRef.current.leaveEdit();
  //       }
  //       break;
  //     case "6":
  //       if (childRef.current) {
  //         childRef.current.contractEdit();
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const handleButtonClick = () => {
    const role = formData.role?.toLowerCase();

    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.personalEdit();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.accountEdit();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.contactEdit();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.requireEdit();
        }
        break;
      case "4":
        if (role !== "freelancer") {
          if (childRef.current) {
            childRef.current.salaryEdit();
          }
        } else {
          handleNext(); // Skip SalaryAdd step
        }
        break;
      case "5":
        if (role !== "freelancer") {
          if (childRef.current) {
            childRef.current.leaveEdit();
          }
        } else {
          handleNext(); // Skip LeaveAdd step
        }
        break;
      case "6":
        if (childRef.current) {
          childRef.current.contractEdit();
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container-fluid minHeight my-5">
        {/* <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
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
      </Stepper> */}
        <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            // Determine if the step should be disabled based on the role
            const isStepDisabled =
              roleFromURL === "freelancer" &&
              (index === 4 || index === 5); // Disable step 4 (Salary Information) and step 5 (Leave Information) for freelancers

            return (
              <Step
                key={index}
                onClick={() => !isStepDisabled && setActiveStep(index)}
              >
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-${index}`}>{step.tooltip}</Tooltip>
                  }
                >
                  <StepLabel
                    className={isStepDisabled ? "step-disabled" : ""}
                  ></StepLabel>
                </OverlayTrigger>
              </Step>
            );
          })}
        </Stepper>
      </div>

      <div class="container-fluid minHeight">
        <div class="container-fluid py-3 card shadow border-0 mb-5">
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ minHeight: "60vh" }}
                >
                  <h3 className="text-muted">
                    All steps completed - you&apos;re finished
                  </h3>
                </div>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <button
                  className="btn bg-primary bg-gradient text-white px-2 py-1 border-primary rounded"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 && (
                <PersonalEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 1 && (
                <AccountEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 2 && (
                <ContactEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 3 && (
                <RequiredEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 4 &&
                formData.role?.toLowerCase() !== "freelancer" && (
                  <SalaryEdit
                    formData={formData}
                    ref={childRef}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    setLoadIndicators={setLoadIndicator}
                  />
                )}
              {activeStep === 5 &&
                formData.role?.toLowerCase() !== "freelancer" && (
                  <LeaveEdit
                    formData={formData}
                    ref={childRef}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    setLoadIndicators={setLoadIndicator}
                  />
                )}
              {activeStep === 6 && (
                <ContractEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}

              <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
                {activeStep > 1 && (
                  <button
                    className="btn btn-sm btn-border mt-4"
                    style={{ padding: "7px" }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                )}
                <div style={{ flex: "1 1 auto" }}></div>
                <button
                  className="btn btn-button btn-sm mt-5 mb-3"
                  onClick={handleButtonClick}
                  style={{ padding: "7px" }}
                  disabled={loadIndicator}
                >
                  {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  {activeStep === steps.length - 1
                    ? "Submit"
                    : " Save And Next"}
                </button>
                {/* <button
                  type="submit"
                  className="btn btn-button btn-sm mt-4"
                  onClick={handleButtonClick}
                  style={{ padding: "7px" }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Save And Next"}
                </button> */}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}
