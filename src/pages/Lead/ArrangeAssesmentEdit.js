import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// const validationSchema = Yup.object({});

function ArrangeAssesmentEdit({ leadId, arrangeAssesmentId, onSuccess, centerId ,setAll}) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const navigate = useNavigate();
  console.log("Arrange Assesment Id:", arrangeAssesmentId);
  // console.log("Centre ID :", centerId);
  // console.log("Student Name :", studentNames);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleShow = async() => {
    fetchCenterData();
    setShow(true);
    try {
      const response = await api.get(`/getAssessmentById/${arrangeAssesmentId}`);
      formik.setValues(response.data);
      console.log("getAssessmentById",response.data);
    } catch (error) {
      toast.error("Error Fetching Data");
    }
  };
  const formik = useFormik({
    initialValues: {
      centerId: centerId || "",
      studentName:"",
      studentId: 0,
      assessmentDate: "",
      assessment: "ENGLISH_ASSESSMENT",
      time: "09:00",
      remarks: "",
    },
    // validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const payload = {
        centerId: centerId,
        studentName: values.studentName,
        assessment: values.assessment,
        assessmentDate: values.assessmentDate,
        time: values.time,
        remarks: values.remarks,
        leadId: leadId
      };
      console.log("Payload:", payload);
      setLoadIndicator(true);
      try {
        const response = await api.put(
          `/updateAssessment/${arrangeAssesmentId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
          navigate("/lead/lead");
          setAll();
          try {
            const response = await api.put(`/updateLeadInfo/${leadId}`, {
              leadStatus: "ARRANGING_ASSESSMENT",
            });
            if (response.status === 200) {
              console.log("Lead Status ARRANGING ASSESSMENT");
              onSuccess();
              handleClose();
              navigate("/lead/lead");
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
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

 

  return (
    <>
      <li>
        <button className="dropdown-item" onClick={handleShow}>
        Edit Assesment Arranged
        </button>
      </li>

      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">
            Leads Assesment Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
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
                  <option value="CHINESE_ASSESSMENT">Chinese Assesment</option>
                </select>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="assessmentDate" className="form-label">
                  Assesment Date
                </label>
                <input
                  type="date"
                  onFocus={(e) => e.target.showPicker()}
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
                      onFocus={(e) => e.target.showPicker()}
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
              <button type="submit" className="btn btn-button" disabled={loadIndicator}>
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
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ArrangeAssesmentEdit;
