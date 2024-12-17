import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
// const validationSchema = Yup.object({});

function ArrangeAssesmentAdd({
  leadId,
  onSuccess,
  centerId,
  studentNames,
  setAll,
  showDialog,
  handleShow,
  handleClose,
  centerDatas
}) {
  
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [centerData, setCenterData] = useState(centerDatas);
  const navigate = useNavigate();
  // console.log("Lead Id:", leadId);
  // console.log("Centre ID :", centerId);
  // console.log("Student Name :", studentNames);

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const getCurrentTime = () => {
    const date = new Date();
    return date.toTimeString().split(":").slice(0, 2).join(":"); // Format: HH:MM
  };

  const formik = useFormik({
    initialValues: {
      centerId: centerId || "",
      studentName: studentNames || "",
      studentId: 0,
      assessmentDate: getCurrentDate(),
      assessment: "ENGLISH_ASSESSMENT",
      time: getCurrentTime(),
      remarks: "",
    },
    // validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const payload = {
        centerId: centerId,
        studentName: studentNames,
        studentId: 0,
        leadId: leadId,
        assessment: values.assessment,
        assessmentDate: values.assessmentDate,
        time: values.time,
        remarks: values.remarks,
      };
      console.log("Payload:", payload);
      setLoadIndicator(true);
      try {
        const response = await api.post(
          `/createAssessment/${leadId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          // onSuccess();
          handleClose();
          setAll();
          toast.success("Arranging Assessment Created Successfully");
          try {
            const response = await api.put(`/updateLeadInfo/${leadId}`, {
              leadStatus: "ARRANGING_ASSESSMENT",
            });
            if (response.status === 200) {
              console.log("Lead Status ARRANGING ASSESSMENT");
              onSuccess();
              setAll();
            } else {
              console.log("Lead Status Not ARRANGING ASSESSMENT");
            }
          } catch {
            console.log("Lead Status Not ARRANGING ASSESSMENT");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  return (
    <>
      {/* <li>
        <button className="dropdown-item" onClick={handleShow}>
          Assessment Arranged
        </button>
      </li> */}

      <Dialog open={showDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="headColor">
          Leads Assessment Booking
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !formik.isSubmitting) {
                e.preventDefault(); // Prevent default form submission
              }
            }}
          >
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="centerId" className="form-label">
                  Centre Name
                </label>
                <input
                  type="hidden"
                  name="centerId"
                  value={formik.values.centerId}
                  {...formik.getFieldProps("centerId")}
                />
                <select
                  className="form-control"
                  value={formik.values.centerId}
                  name="centerId"
                  {...formik.getFieldProps("centerId")}
                  disabled
                >
                  {centerData &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.centerNames}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="studentName" className="form-label">
                  Student Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="studentName"
                  name="studentName"
                  {...formik.getFieldProps("studentName")}
                  value={studentNames}
                  disabled
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="assessment" className="form-label">
                  Assesment
                </label>
                <select
                  className="form-select"
                  name="assessment"
                  {...formik.getFieldProps("assessment")}
                >
                  <option selected value="ENGLISH_ASSESSMENT">
                    English Assesment
                  </option>
                  <option value="CHINESE_ASSESSMENT">Chinese Assemsment</option>
                </select>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="assessmentDate" className="form-label">
                  Assesment Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="assessmentDate"
                  name="assessmentDate"
                  {...formik.getFieldProps("assessmentDate")}
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="time" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="time"
                  name="time"
                  {...formik.getFieldProps("time")}
                />
              </div>
              <div className="col-md-12 col-12 mb-2">
                <label htmlFor="remarks" className="form-label">
                  Remark
                </label>
                <textarea
                  className="form-control"
                  id="remarks"
                  name="remarks"
                  {...formik.getFieldProps("remarks")}
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-button"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ArrangeAssesmentAdd;
