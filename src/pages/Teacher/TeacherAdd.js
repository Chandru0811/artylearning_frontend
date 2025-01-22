import React, { useState } from "react";
import AccountAdd from "./AddTeacher/AccountAdd";
import ContactAdd from "./AddTeacher/ContactAdd";
import PersonalAdd from "./AddTeacher/PersonalAdd";
import RequiredAdd from "./AddTeacher/RequiredAdd";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import LeaveAdd from "./AddTeacher/LeaveAdd";
import SalaryAdd from "./AddTeacher/SalaryAdd";
import ContractAdd from "./AddTeacher/ContractAdd";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Account Information" },
  { tooltip: "Contact Information" },
  // { tooltip: "Login Information" },
  { tooltip: "Required Information" },
  { tooltip: "Salary Information" },
  { tooltip: "Leave Information" },
  { tooltip: "Contract Informationn" },
];

export default function TeacherAdd() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const childRef = React.useRef();
  const [formData, setFormData] = useState({});
  console.log("perant", formData);

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

    // Get the role from formData and convert it to lowercase
    const role = formData.role?.toLowerCase();
    let nextStep = activeStep + 1;

    // If the role is "freelancer", skip SalaryAdd (step 4) and LeaveAdd (step 5)
    if (role === "freelancer") {
      if (activeStep === 3) {
        nextStep = 6; // Jump directly to ContractAdd (step 6)
      } else if (activeStep === 4) {
        nextStep = 6; // If somehow on step 4, skip step 5 as well
      }
    }

    setActiveStep(nextStep);
    setSkipped(newSkipped);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleBack = () => {
    const role = formData.role?.toLowerCase();

    // If role is freelancer and current step is ContractAdd (step 6), navigate back to RequiredAdd (step 3)
    if (role === "freelancer" && activeStep === 6) {
      setActiveStep(3);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // const handleButtonClick = () => {
  //   switch (activeStep.toString()) {
  //     case "0":
  //       if (childRef.current) {
  //         childRef.current.personalAdd();
  //       }
  //       break;
  //     case "1":
  //       if (childRef.current) {
  //         childRef.current.accountAdd();
  //       }
  //       break;
  //     case "2":
  //       if (childRef.current) {
  //         childRef.current.contactAdd();
  //       }
  //       break;
  //     case "3":
  //       if (childRef.current) {
  //         childRef.current.requireAdd();
  //       }
  //       break;
  //     case "4":
  //       if (childRef.current) {
  //         childRef.current.salaryAdd();
  //       }
  //       break;
  //     case "5":
  //       if (childRef.current) {
  //         childRef.current.leaveAdd();
  //       }
  //       break;
  //     case "6":
  //       if (childRef.current) {
  //         childRef.current.contractAdd();
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
          childRef.current.personalAdd();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.accountAdd();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.contactAdd();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.requireAdd();
        }
        break;
      case "4":
        if (role !== "freelancer") {
          if (childRef.current) {
            childRef.current.salaryAdd();
          }
        } else {
          handleNext(); // Skip SalaryAdd step
        }
        break;
      case "5":
        if (role !== "freelancer") {
          if (childRef.current) {
            childRef.current.leaveAdd();
          }
        } else {
          handleNext(); // Skip LeaveAdd step
        }
        break;
      case "6":
        if (childRef.current) {
          childRef.current.contractAdd();
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container-fluid minHeight my-5">
        <ol
          className="breadcrumb my-3"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <Link to="/" className="custom-breadcrumb">
              Home
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            &nbsp;Staffing
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            <Link to="/teacher" className="custom-breadcrumb">
              &nbsp;Teacher
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            &nbsp;Teacher Add
          </li>
        </ol>
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
                <PersonalAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 1 && (
                <AccountAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 2 && (
                <ContactAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 3 && (
                <RequiredAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {/* {activeStep === 4 && (
                <SalaryAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}
              {activeStep === 5 && (
                <LeaveAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )} */}
              {activeStep === 4 &&
                formData.role?.toLowerCase() !== "freelancer" && (
                  <SalaryAdd
                    formData={formData}
                    ref={childRef}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    setLoadIndicators={setLoadIndicator}
                  />
                )}
              {activeStep === 5 &&
                formData.role?.toLowerCase() !== "freelancer" && (
                  <LeaveAdd
                    formData={formData}
                    ref={childRef}
                    setFormData={setFormData}
                    handleNext={handleNext}
                    setLoadIndicators={setLoadIndicator}
                  />
                )}
              {activeStep === 6 && (
                <ContractAdd
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  setLoadIndicators={setLoadIndicator}
                />
              )}

              <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
                {activeStep > 0 && (
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
                {/* {isStepOptional(activeStep) && (
                <button
                  className="btn btn-warning"
                  style={{ padding: "7px", marginRight: "10px" }}
                  onClick={handleSkip}
                  sx={{ mr: 1 }}
                >
                  Skip
                </button>
              )} */}
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
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}
