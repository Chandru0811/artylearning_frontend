import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import api from "../../config/URL";
import { toast } from "react-toastify";

function AddMore({ courseId, attendanceDate, batchId, userId }) {
  const [show, setShow] = useState(false);
  console.log("Selected CourseId", courseId);

  const validationSchema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        lessonNo: Yup.string().required("Lesson number is required"),
        curriculumCode: Yup.string().required("Curriculum code is required"),
        nextClassAdvice: Yup.string().required("Next class advice is required"),
        pace: Yup.string().required("Pace is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      items: [
        {
          lessonNo: "",
          curriculumCode: "",
          nextClassAdvice: "",
          pace: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const additionalValues = {
          remark: "Test",
          attendanceDate: attendanceDate,
          curriculumId: 1,
          batchId: batchId,
          userId: userId,
        };

        const payload = values.items.map((item) => ({
          ...item,
          ...additionalValues,
        }));
        const response = await api.post(`createFeedbackAttendances`, payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error Creating Data ", error?.response?.data?.message);
      }
    },
  });

  const getLessonData = async () => {
    const response = await api.get(`active/${courseId}`);
    console.log("Lesson Response Data", response.data);
  };

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };
  const handleShow = () => {
    getLessonData();
    setShow(true);
  };

  return (
    <>
      <button
        className="btn btn-button2 btn-sm"
        onClick={handleShow}
        style={{ backgroundColor: "#fa994af5" }}
      >
        Add More Info
      </button>
      <Modal show={show} size="xl" onHide={handleClose} centered>
        <Modal.Header closeButton>Attendance</Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              {formik.values.items.map((item, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-1 text-end d-flex justify-content-center align-items-start">
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn mt-2"
                          style={{ marginBottom: "5.0rem" }}
                          onClick={() => {
                            const data = [...formik.values.items];
                            data.splice(index, 1);
                            formik.setFieldValue("items", data);
                          }}
                        >
                          <IoIosCloseCircleOutline
                            style={{
                              fontSize: "2rem",
                              color: "red",
                              background: "none",
                            }}
                          />
                        </button>
                      )}
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                      <label className="form-label">Lesson No</label>
                      <select
                        {...formik.getFieldProps(`items[${index}].lessonNo`)}
                        className={`form-select ${
                          formik.touched.items?.[index]?.lessonNo &&
                          formik.errors.items?.[index]?.lessonNo
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="Default select example"
                      >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      {formik.touched.items?.[index]?.lessonNo &&
                      formik.errors.items?.[index]?.lessonNo ? (
                        <div className="invalid-feedback">
                          {formik.errors.items[index].lessonNo}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                      <label className="form-label">Curriculum Code</label>
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.items?.[index]?.curriculumCode &&
                          formik.errors.items?.[index]?.curriculumCode
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps(
                          `items[${index}].curriculumCode`
                        )}
                      />
                      {formik.touched.items?.[index]?.curriculumCode &&
                      formik.errors.items?.[index]?.curriculumCode ? (
                        <div className="invalid-feedback">
                          {formik.errors.items[index].curriculumCode}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                      <label className="form-label">
                        Next Class Advice<span className="text-danger">*</span>
                      </label>
                      <div>
                        <input
                          type="radio"
                          id={`items[${index}].nextClassAdvice-competent`}
                          name={`items[${index}].nextClassAdvice`}
                          value="Competent"
                          checked={
                            formik.values.items[index].nextClassAdvice ===
                            "Competent"
                          }
                          onChange={formik.handleChange}
                          className={`form-check-input ${
                            formik.touched.items?.[index]?.nextClassAdvice &&
                            formik.errors.items?.[index]?.nextClassAdvice
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        &nbsp;&nbsp;
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].nextClassAdvice-competent`}
                        >
                          Competent
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id={`items[${index}].nextClassAdvice-revision`}
                          name={`items[${index}].nextClassAdvice`}
                          value="Require Revision"
                          checked={
                            formik.values.items[index].nextClassAdvice ===
                            "Require Revision"
                          }
                          onChange={formik.handleChange}
                          className={`form-check-input ${
                            formik.touched.items?.[index]?.nextClassAdvice &&
                            formik.errors.items?.[index]?.nextClassAdvice
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        &nbsp;&nbsp;
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].nextClassAdvice-revision`}
                        >
                          Require Revision
                        </label>
                      </div>
                      {formik.touched.items?.[index]?.nextClassAdvice &&
                      formik.errors.items?.[index]?.nextClassAdvice ? (
                        <div className="invalid-feedback">
                          {formik.errors.items[index].nextClassAdvice}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-md-2 col-6 mb-4">
                      <label className="form-label">Pace</label>
                      <div>
                        <input
                          type="radio"
                          id={`items[${index}].pace-fast`}
                          name={`items[${index}].pace`}
                          value="Fast (F)"
                          checked={
                            formik.values.items[index].pace === "Fast (F)"
                          }
                          onChange={formik.handleChange}
                          className={`form-check-input ${
                            formik.touched.items?.[index]?.pace &&
                            formik.errors.items?.[index]?.pace
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        &nbsp;&nbsp;
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].pace-fast`}
                        >
                          Fast (F)
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id={`items[${index}].pace-normal`}
                          name={`items[${index}].pace`}
                          value="Normal (N)"
                          checked={
                            formik.values.items[index].pace === "Normal (N)"
                          }
                          onChange={formik.handleChange}
                          className={`form-check-input ${
                            formik.touched.items?.[index]?.pace &&
                            formik.errors.items?.[index]?.pace
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        &nbsp;&nbsp;
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].pace-normal`}
                        >
                          Normal (N)
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id={`items[${index}].pace-slow`}
                          name={`items[${index}].pace`}
                          value="Slow (S)"
                          checked={
                            formik.values.items[index].pace === "Slow (S)"
                          }
                          onChange={formik.handleChange}
                          className={`form-check-input ${
                            formik.touched.items?.[index]?.pace &&
                            formik.errors.items?.[index]?.pace
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        &nbsp;&nbsp;
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].pace-slow`}
                        >
                          Slow (S)
                        </label>
                      </div>
                      {formik.touched.items?.[index]?.pace &&
                      formik.errors.items?.[index]?.pace ? (
                        <div className="invalid-feedback">
                          {formik.errors.items[index].pace}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
              <div className="row mb-5">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      formik.setFieldValue("items", [
                        ...formik.values.items,
                        {
                          lessonNo: "",
                          curriculumCode: "",
                          nextClassAdvice: "",
                          pace: "",
                        },
                      ])
                    }
                  >
                    <MdAdd /> Add More
                  </button>
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

export default AddMore;
