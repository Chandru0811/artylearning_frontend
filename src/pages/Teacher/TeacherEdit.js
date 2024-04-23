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
import LoginEdit from "./EditTeacher/LoginEdit";
import SalaryEdit from "./EditTeacher/SalaryEdit";
import LeaveEdit from "./EditTeacher/LeaveEdit";
import ContractEdit from "./EditTeacher/ContractEdit";
import { useParams } from "react-router-dom";

const steps = ["", "", "", "", "", "", "", ""];

export default function TeacherEdit() {
  const { staff_id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const childRef = React.useRef();
  const [formData, setFormData] = useState({ staff_id });
  
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

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleButtonClick = () => {
    // console.log("1",childRef);
    // Call the child function using the ref
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
          childRef.current.loginEdit();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.requireEdit();
        }
        break;
      case "5":
        if (childRef.current) {
          childRef.current.salaryEdit();
        }
        break;
      case "6":
        if (childRef.current) {
          childRef.current.leaveEdit();
        }
        break;
      case "7":
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
      <div className="container-fluid py-5">
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
                />
              )}
              {activeStep === 1 && (
                <AccountEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}
              {activeStep === 2 && (
                <ContactEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}
              {activeStep === 3 && (
                <LoginEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}
              {activeStep === 4 && (
                <RequiredEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}
              {activeStep === 5 && (
                <SalaryEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}
              {activeStep === 6 && (
                <LeaveEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}
              {activeStep === 7 && (
                <ContractEdit
                  formData={formData}
                  ref={childRef}
                  setFormData={setFormData}
                  handleNext={handleNext}
                />
              )}

              <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-sm btn-border mt-4"
                  style={{ padding: "7px" }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </button>

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
                  type="submit"
                  className="btn btn-button btn-sm mt-4"
                  onClick={handleButtonClick}
                  style={{ padding: "7px" }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Save And Next"}
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}
