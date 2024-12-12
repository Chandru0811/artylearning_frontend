import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tick from "../../assets/images/Tick.png";
import StaffPersonalEdit from "./EditStaff/StaffPersonalEdit";
import StaffAccountEdit from "./EditStaff/StaffAccountEdit";
import StaffContactEdit from "./EditStaff/StaffContactEdit";
import StaffRequiredEdit from "./EditStaff/StaffRequiredEdit";
import StaffLoginEdit from "./EditStaff/StaffLoginEdit";
import StaffSalaryEdit from "./EditStaff/StaffSalaryEdit";
import StaffLeaveEdit from "./EditStaff/StaffLeaveEdit";
import StaffContractEdit from "./EditStaff/StaffContractEdit";
import { Link, useParams } from "react-router-dom";
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

function StaffEdit() {
  const { staff_id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const childRef = React.useRef();
  const [formData, setFormData] = useState({ staff_id });
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
    switch (activeStep.toString()) {
      case "0":
        if (childRef.current) {
          childRef.current.staffPersonalEdit();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.staffAccountEdit();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.staffContactEdit();
        }
        break;
      case "3":
        if (childRef.current) {
          childRef.current.staffRequireEdit();
        }
        break;
      // case "4":
      //   if (childRef.current) {
      //     childRef.current.staffLoginEdit();
      //   }
      //   break;
      case "4":
        if (childRef.current) {
          childRef.current.staffSalaryEdit();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.staffLeaveEdit();
        }
        break;
      case "6":
        if (childRef.current) {
          childRef.current.staffContractEdit();
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
          &nbsp;Staff Edit
        </li>
      </ol>
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
      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5">
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "60vh" }}
              >
                <img
                  src={Tick}
                  width={100}
                  alt="success"
                  className="img-fluid"
                />
                <h3 className="text-muted">
                  All steps completed - you&apos;re finished
                </h3>
              </div>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Link to="/staff">
                <button className="btn bg-primary bg-gradient text-white px-2 py-1 my-2 border-primary rounded">
                  OK
                </button>
              </Link>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <StaffPersonalEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            {activeStep === 1 && (
              <StaffAccountEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            {activeStep === 2 && (
              <StaffContactEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            {activeStep === 3 && (
              <StaffRequiredEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            {/* {activeStep === 4 && (
              <StaffLoginEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )} */}

            {activeStep === 4 && (
              <StaffSalaryEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}
            {activeStep === 5 && (
              <StaffLeaveEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
                setLoadIndicators={setLoadIndicator}
              />
            )}

            {activeStep === 6 && (
              <StaffContractEdit
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
                  className="btn btn-border btn-sm"
                  style={{ padding: "7px" }}
                  disabled={activeStep === 0}
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
        )}
      </div>
    </div>
  );
}

export default StaffEdit;
