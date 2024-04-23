import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
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

const steps = ["", "", "", "", "", "", "", ""];

function StaffEdit() {
  const { staff_id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
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
      case "4":
        if (childRef.current) {
          childRef.current.staffLoginEdit();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.staffSalaryEdit();
        }
        break;
      case "6":
        if (childRef.current) {
          childRef.current.staffLeaveEdit();
        }
        break;
      case "7":
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
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
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
              />
            )}

            {activeStep === 1 && (
              <StaffAccountEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}

            {activeStep === 2 && (
              <StaffContactEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}

            {activeStep === 3 && (
              <StaffRequiredEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}

            {activeStep === 4 && (
              <StaffLoginEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}

            {activeStep === 5 && (
              <StaffSalaryEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}
            {activeStep === 6 && (
              <StaffLeaveEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
              />
            )}

            {activeStep === 7 && (
              <StaffContractEdit
                formData={formData}
                ref={childRef}
                setFormData={setFormData}
                handleNext={handleNext}
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
                className="btn btn-button btn-sm"
                onClick={handleButtonClick}
                style={{ padding: "7px" }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Save and Next"}
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default StaffEdit;
