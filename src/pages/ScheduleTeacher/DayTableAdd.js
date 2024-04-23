import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";

function DayTableAdd({ onSuccess, id, centerId, day }) {
  const [show, setShow] = useState(false);
  const [studentData, setStudentData] = useState(false);

  const fetchData = async () => {
    try {
      const studentData = await fetchAllStudentListByCenter(centerId);
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    studentId: Yup.string().required("*Student is required"),
  });

  const formik = useFormik({
    initialValues: {
      studentId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.status = "pending";
      values.days = day;
      // console.log(values);
      try {
        const response = await api.put(`/updateScheduleTeacher/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          onSuccess();
          toast.success(response.data.message);
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.warning(error.response?.data.message);
          handleClose();
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      }
    },
  });

  return (
    <>
      <button type="button" class="btn text-success fs-4" onClick={handleShow}>
        <FaPlusCircle />
      </button>
      <Modal show={show} size="md" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Assign Student</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-12 mb-2">
                  <label className="form-label">
                    Student<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("studentId")}
                    class={`form-select  ${
                      formik.touched.studentId && formik.errors.studentId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option value="" disabled selected>
                      Select Student
                    </option>
                    {studentData &&
                      studentData.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.studentNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.studentId && formik.errors.studentId && (
                    <div className="invalid-feedback">
                      {formik.errors.studentId}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default DayTableAdd;
