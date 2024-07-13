import * as React from "react";
import { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import EditRegistration from "./EditStudent/EditRegistration";
// import EditDetails from "./EditStudent/EditDetails";
import { useParams } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";
import EditStudentDetails from "./EditStudent/EditStudentDetails";
import EditParentGuardian from "./EditStudent/EditParentGuardian";
import EditEmergencyContact from "./EditStudent/EditEmergencyContact";
import EditCourseDetail from "./EditStudent/EditCourceDetails";
import EditStudentRelation from "./EditStudent/EditStudentRelation";
import EditTermsAndCondition from "./EditStudent/EditTermsAndCondition";

const steps = [
  { tooltip: "Student Details" },
  { tooltip: "Parents/Guardian" },
  { tooltip: "Emergency Contact" },
  // { tooltip: "Course Details" },
  { tooltip: "Student Relation" },
  { tooltip: "Terms and Conditions" },
];

export default function StudentAdd() {
  const { id } = useParams();
  const [loadIndicator, setLoadIndicator] = useState(false);
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
          childRef.current.Editstudentdetails();
        }
        break;
      case "1":
        if (childRef.current) {
          childRef.current.editParentGuardian();
        }
        break;
      case "2":
        if (childRef.current) {
          childRef.current.emergencyContact();
        }
        break;
      // case "3":
      //   if (childRef.current) {
      //     childRef.current.coursedetail();
      //   }
      //   break;
      case "3":
        if (childRef.current) {
          childRef.current.Studentrelation();
        }
        break;
      case "4":
        if (childRef.current) {
          childRef.current.termsAndCondition();
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
            <EditStudentDetails
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 1 && (
            <EditParentGuardian
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 2 && (
            <EditEmergencyContact
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {/* {activeStep === 3 && (
            <EditCourseDetail
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )} */}
          {activeStep === 3 && (
            <EditStudentRelation
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}
          {activeStep === 4 && (
            <EditTermsAndCondition
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
              className="btn btn-border btn-sm mt-5 mb-3"
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
      </div>
    </div>
  );
}
