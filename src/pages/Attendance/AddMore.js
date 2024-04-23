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

  const [rows, setRows] = useState([{}]);

  const validationSchema = Yup.object({});

  const formik = useFormik({
    initialValues: {
      lessonNo: "",
      curriculumCode: "",
      nextClassAdvice: "",
      pace: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
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
        <Modal.Header closeButton></Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              {rows.map((row, index) => (
                <div key={index}>
                  <div className="row">
                    <div className="col-1 text-end d-flex justify-content-center align-items-end ">
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn mt-2"
                          style={{ marginBottom: "5.0rem" }}
                          onClick={() => setRows((pr) => pr.slice(0, -1))}
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
                        {...formik.getFieldProps("lessonNo")}
                        className={`form-select`}
                        aria-label="Default select example"
                      >
                        <option selected></option>
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
                        {...formik.getFieldProps("curriculumCode")}
                      />
                    </div>
                    <div className="col-md-3 col-6 mb-4">
                      <label class="form-label">Next Class Advice</label>
                      <div>
                        <input
                          class="form-check-inline"
                          value="Competent"
                          name="nextClassAdvice"
                          type="radio"
                        />
                        <label className="form-label">Competent</label>
                      </div>
                      <div>
                        <input
                          class="form-check-inline"
                          value="Require Revision"
                          name="nextClassAdvice"
                          type="radio"
                        />
                        <label className="form-label">Require Revision</label>
                      </div>
                    </div>
                    <div className="col-md-2 col-6 mb-4">
                      <label class="form-label">Pace</label>
                      <div>
                        <input
                          class="form-check-inline"
                          value="Fast (F)"
                          name="nextClassAdvice"
                          type="radio"
                        />
                        <label className="form-label">Fast (F)</label>
                      </div>
                      <div>
                        <input
                          class="form-check-inline"
                          value="Normal (N)"
                          name="nextClassAdvice"
                          type="radio"
                        />
                        <label className="form-label">Normal (N)</label>
                      </div>
                      <div>
                        <input
                          class="form-check-inline"
                          value="Slow (S)"
                          name="nextClassAdvice"
                          type="radio"
                        />
                        <label className="form-label">Slow (S)</label>
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
                    onClick={() => setRows((pr) => [...pr, {}])}
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
