import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";

function MyMessagesAdd({ onSuccess }) {
  const [show, setShow] = useState(false);

  const validationSchema = yup.object().shape({
    student: yup.string().required("*Student is required"),
    message: yup.string().required("*Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      student: "",
      message: "",
      files: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="mb-5 mt-3 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i className="bx bx-plus"></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-model-title-vcenter"
        centered
      >
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="headColor">New Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div class="col-md-6 col-12 mb-2">
                  <lable class="">
                    Student<span class="text-danger">*</span>
                  </lable>
                  <div class="input-group mb-3">
                    <select
                      {...formik.getFieldProps("student")}
                      className={`form-select  ${
                        formik.touched.student && formik.errors.student
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Amanda">Amanda</option>
                      <option value="Ashwanth">Ashwanth</option>
                    </select>
                    {formik.touched.student && formik.errors.student && (
                      <div className="invalid-feedback">
                        {formik.errors.student}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col-md-6 col-12 mb-2">
                  <lable class="">
                    Message<span class="text-danger">*</span>
                  </lable>
                  <div class="input-group mb-3">
                    <input
                      {...formik.getFieldProps("message")}
                      className={`form-control  ${
                        formik.touched.message && formik.errors.message
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Default select example"
                    ></input>
                    {formik.touched.message && formik.errors.message && (
                      <div className="invalid-feedback">
                        {formik.errors.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2 ">
                  <div className="row">
                    <label>Attachment</label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*, video/*"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "files",
                            Array.from(event.target.files)
                          )
                        }
                      ></input>
                    </div>
                    {formik.touched.files && formik.errors.files && (
                      <small className="text-danger">
                        {formik.errors.files}
                      </small>
                    )}
                    <label className="text-muted">
                      Note :File must be JPG|PNG|PDF|MP4 And Max Size 1 GB.
                    </label>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Level<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("levelId")}
                    class={`form-select  ${
                      formik.touched.levelId && formik.errors.levelId
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleLevelChange}
                  >
                    <option></option>
                    {levelData &&
                      levelData.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.levels}
                        </option>
                      ))}
                  </select>
                  {formik.touched.levelId && formik.errors.levelId && (
                    <div className="invalid-feedback">
                      {formik.errors.levelId}
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn btn-button btn-sm">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default MyMessagesAdd;
