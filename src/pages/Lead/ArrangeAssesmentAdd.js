import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

const validationSchema = Yup.object({

});

function ArrangeAssesmentAdd({ leadId, onSuccess, centerId, studentNames }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [centerData, setCenterData] = useState(null);

  // console.log("Lead Id:", leadId);
  // console.log("Centre ID :", centerId);
  // console.log("Student Name :", studentNames);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    setShow(true);
  };

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      centerId: centerId || "",
      studentName: studentNames || "",
      assessmentDate: new Date().toISOString().split('T')[0] || "",
      assessment: "ENGLISH_ASSESSMENT",
      startTime: "09:00",
      remarks: "",
    },
    // validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      console.log("Arrangeing Assement:", values);
      setLoadIndicator(true);
      const payload = {
        centerId: centerId,
        studentName: studentNames,
        assessment: values.assessment,
        assessmentDate: values.assessmentDate,
        startTime: values.startTime,
        remarks: values.remarks,
      };
      console.log("Payload:", payload);
      // try {
      //   const response = await api.put(`/updateLeadInfo/${leadId}`, {
      //     leadStatus: "ARRANGING_ASSESSMENT",
      //   });
      //   if (response.status === 200) {
      //     console.log("Lead Status ARRANGING ASSESSMENT");
      //     onSuccess();
      //     handleClose();
      //   } else {
      //     console.log("Lead Status Not ARRANGING ASSESSMENT");
      //   }
      // } catch {
      //   console.log("Lead Status Not ARRANGING ASSESSMENT");
      // } finally {
      //   setLoadIndicator(false);
      // }

      // setLoadIndicator(true);
      // try {
      //   const response = await api.post("/createCourseLevels", values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   if (response.status === 201) {
      //     onSuccess();
      //     handleClose();
      //     toast.success(response.data.message);
      // try{
      //   const response = await api.put(`/updateLeadInfo/${leadId}`, {
      //     leadStatus: "ARRANGING_ASSESSMENT",
      //   });
      //   if(response.status === 200){
      //     console.log("Lead Status ARRANGING ASSESSMENT");
      //     onSuccess();
      //   }else{
      //     console.log("Lead Status Not ARRANGING ASSESSMENT");
      //   }
      // }catch{
      //   console.log("Lead Status Not ARRANGING ASSESSMENT");
      // };
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error(error);
      // } finally {
      //   setLoadIndicator(false);
      // }
    },
  });

  useEffect(() => {
    fetchCenterData();
  }, []);

  return (
    <>
      <li>
        <button className="dropdown-item" onClick={handleShow}>
          Arrange Assesment
        </button>
      </li>

      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">
            Leads Assessment Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="centerId" className="form-label">
                  Center Name
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
                  readOnly
                />
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="assessment" className="form-label">
                  Assessments
                </label>
                <select
                  className="form-select"
                  name="assessment"
                  {...formik.getFieldProps("assessment")}
                >
                  <option selected value="ENGLISH_ASSESSMENT">
                    English Assemsment
                  </option>
                  <option value="CHINESE_ASSESSMENT">Chinesh Assemsment</option>
                </select>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label htmlFor="assessmentDate" className="form-label">
                  Assessment Date
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
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="startTime"
                  name="startTime"
                  {...formik.getFieldProps("startTime")}
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
              <button type="submit" className="btn btn-button">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ArrangeAssesmentAdd;
