import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
// import Tick from "../../assets/images/Tick.png";
import StaffPersonalAdd from "./AddStaff/StaffPersonalAdd";
import StaffAccountAdd from "./AddStaff/StaffAccountAdd";
import StaffContactAdd from "./AddStaff/StaffContactAdd";
import StaffRequiredAdd from "./AddStaff/StaffRequiredAdd";
import StaffLoginAdd from "./AddStaff/StaffLoginAdd";
import StaffSalaryAdd from "./AddStaff/StaffSalaryAdd";
import StaffLeaveAdd from "./AddStaff/StaffLeaveAdd";
import StaffContractAdd from "./AddStaff/StaffContractAdd";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

const steps = [
  { tooltip: "Personal Information" },
  { tooltip: "Account Information" },
  { tooltip: "Contact Information" },
  { tooltip: "Required Information" },
  { tooltip: "Salary Information" },
  { tooltip: "Leave Information" },
  { tooltip: "Contract Informationn" },
];

function StaffAdd() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const childRef = useRef();
  const [formData, setFormData] = useState({});

  console.log("perant", formData);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleButtonClick = () => {
    // console.log("1",childRef);
    // Call the child function using the ref
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.staffPersonalAdd();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.staffAccountAdd();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.staffContactAdd();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.staffRequireAdd();
        }
        break;
      // case "4":
      //   if (childRef.current) {
      //     childRef.current.staffLoginAdd();
      //   }
      //   break;
      case "4":
        if (childRef.current) {
          childRef.current.staffSalaryAdd();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.staffLeaveAdd();
        }
        break;
      case "6":
        if (childRef.current) {
          childRef.current.staffContractAdd();
        }
        break;

      default:
        break;
    }
  };
  return (
    <div class="container-fluid minHeight my-5">
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
          <Link to="/staff" className="custom-breadcrumb">
          &nbsp;Staff
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
        &nbsp;Staff Add
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
      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5">
        <React.Fragment>
          {activeStep === 0 && (
            <StaffPersonalAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 1 && (
            <StaffAccountAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 2 && (
            <StaffContactAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 3 && (
            <StaffRequiredAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {/* {activeStep === 4 && (
            <StaffLoginAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )} */}

          {activeStep === 4 && (
            <StaffSalaryAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 5 && (
            <StaffLeaveAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 6 && (
            <StaffContractAdd
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
            {activeStep >= 1 && (
              <button
                className="btn btn-border btn-sm"
                style={{ padding: "7px" }}
                onClick={handleBack}
              >
                Back
              </button>
            )}

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

export default StaffAdd;
