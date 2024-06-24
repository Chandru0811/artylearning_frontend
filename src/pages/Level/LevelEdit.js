import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllSubjectsWithIds from "../List/SubjectList";

function Edit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [subjectData, setSubjectData] = useState(null);
  
  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setSubjectData(null);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (subjectId) => {
    try {
      const subject = await fetchAllSubjectsWithIds(subjectId);
      setSubjectData(subject);
    } catch (error) {
      toast.error(error);
    }
  };

  const validationSchema = Yup.object({
    level: Yup.string().required("*Level is required"),
    levelCode: Yup.string().required("*Level Code is required"),
    status: Yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      level: "",
      levelCode: "",
      status: "",
      subjectId: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);
      let selectedSubjectName = "";

      subjectData.forEach((subject) => {
        if (parseInt(values.subjectId) === subject.id) {
          selectedSubjectName = subject.subjects || "--";
        }
      });

      let requestBody = {
        subjectId: values.subjectId
      }
      try {
        const response = await api.put(`/updateCourseLevel/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicator(false);
      }

    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseLevels/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubjectChange = (event) => {
    setSubjectData(null);
    const subjectId = event.target.value;
    formik.setFieldValue("subjectId", subjectId);
    fetchData(subjectId); // Fetch class for the selected center
  };


  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Edit Level</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
              <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Subject<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("subjectId")}
                    class={`form-select  ${
                      formik.touched.subjectId && formik.errors.subjectId
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleSubjectChange}
                  >
                    <option></option>
                    {subjectData &&
                      subjectData.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.subjects}
                        </option>
                      ))}
                  </select>
                  {formik.touched.subjectId && formik.errors.subjectId && (
                    <div className="invalid-feedback">
                      {formik.errors.subjectId}
                    </div>
                  )}
                </div>
               
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Level Code<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className={`form-control  ${
                      formik.touched.levelCode && formik.errors.levelCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("levelCode")}
                  />
                  {formik.touched.levelCode && formik.errors.levelCode && (
                    <div className="invalid-feedback">
                      {formik.errors.levelCode}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("status")}
                    class={`form-select  ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option
                      // defaultValue={data.status === "Active"}
                    > 
                    </option>
                    <option
                      value="Active"
                      // defaultValue={data.status === "Active"}
                    >
                      Active
                    </option>
                    <option
                      value="Inactive"
                      // defaultValue={data.status === "Inactive"}
                    >
                      Inactive
                    </option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Level<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className={`form-control  ${
                      formik.touched.level && formik.errors.level
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("level")}
                  />
                  {formik.touched.level && formik.errors.level && (
                    <div className="invalid-feedback">
                      {formik.errors.level}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <button
                type="submit"
                onSubmit={formik.handleSubmit}
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default Edit;
