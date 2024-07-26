import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";

function AddMore() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object().shape({
    items: Yup.array().of(
        Yup.object().shape({
          lessonNo: Yup.string().required("Lesson number is required"),
          curriculumCode: Yup.string().required("Curriculum code is required"),
          nextClassAdvice: Yup.string().required(
            "Next class advice is required"
          ),
          pace: Yup.string().required("Pace is required"),
        })
      )
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
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <button
        className="btn btn-button2 "
        onClick={handleShow}
        style={{ backgroundColor: "#fa994af5" }}
      >
        Add More Info
      </button>
      <Modal show={show} size="xl" onHide={handleClose} centered>
        <Modal.Header closeButton>Attenence</Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              {formik.values?.items?.map((item, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-1 text-end d-flex justify-content-center align-items-start ">
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
                        className={`form-select`}
                        aria-label="Default select example"
                      >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                      <label className="form-label">Curriculum Code</label>
                      <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps(
                          `items[${index}].curriculumCode`
                        )}
                      />
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                      <label className="form-label">Next Class Advice</label>
                      <div>
                        <input
                          type="radio"
                          className="form-check-input"
                          value="Competent"
                          {...formik.getFieldProps(
                            `items[${index}].nextClassAdvice`
                          )}
                          id={`items[${index}].nextClassAdvice-competent`}
                        />
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
                          className="form-check-input"
                          value="Require Revision"
                          {...formik.getFieldProps(
                            `items[${index}].nextClassAdvice`
                          )}
                          id={`items[${index}].nextClassAdvice-revision`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].nextClassAdvice-revision`}
                        >
                          Require Revision
                        </label>
                      </div>
                    </div>
                    <div className="col-md-2 col-6 mb-4">
                      <label className="form-label">Pace</label>
                      <div>
                        <input
                          type="radio"
                          className="form-check-input"
                          value="Fast (F)"
                          {...formik.getFieldProps(`items[${index}].pace`)}
                          id={`items[${index}].pace-fast`}
                        />
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
                          className="form-check-input"
                          value="Normal (N)"
                          {...formik.getFieldProps(`items[${index}].pace`)}
                          id={`items[${index}].pace-normal`}
                        />
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
                          className="form-check-input"
                          value="Slow (S)"
                          {...formik.getFieldProps(`items[${index}].pace`)}
                          id={`items[${index}].pace-slow`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`items[${index}].pace-slow`}
                        >
                          Slow (S)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row mb-5">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn-add"
                    style={{
                      borderRadius: "10px",
                      height: "40px",
                      width: "125px",
                    }}
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
                    Add More
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
