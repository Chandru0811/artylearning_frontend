import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";

function SubjectEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName  = localStorage.getItem('userName');
  const [isModified, setIsModified] = useState(false);


  const navigate = useState();

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  
  const handleShow = () => {
    getData();
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("*Subject is required"),
    code: yup.string().required("*Code is required"),
    status: yup.string().required("*Status is required"),
  });
  const formik = useFormik({
    initialValues: {
      subject: "",
      code: "",
      status: "",
      updatedBy:userName,

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);

      try {
        const response = await api.put(`/updateCourseSubject/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
          navigate("/level");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (
        Object.values(values).some(value => typeof value === 'string' && value.trim() !== "")
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    }
    
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllCourseSubjectsById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
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
        aria-labelledby="contained-model-title-vcenter"
        centered
        backdrop={isModified ? "static" : true} 
        keyboard={isModified ? false : true} 
      >
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Header closeButton>
            <Modal.Title className="headColor">Edit Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Subject<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.subject && formik.errors.subject
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Subject"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("subject")}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <div className="invalid-feedback">
                        {formik.errors.subject}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Code<span className="text-danger">*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.code && formik.errors.code
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="code"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("code")}
                    />
                    {formik.touched.code && formik.errors.code && (
                      <div className="invalid-feedback">
                        {formik.errors.code}
                      </div>
                    )}
                  </div>
                </div>
                <div class="col-md-6 col-12 mb-2">
                  <lable class="">
                    Status<span class="text-danger">*</span>
                  </lable>
                  <div class="input-group mb-3">
                    <select
                      {...formik.getFieldProps("status")}
                      className={`form-select  ${
                        formik.touched.status && formik.errors.status
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Default select example"
                    >
                      <option></option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {formik.touched.status && formik.errors.status && (
                      <div className="invalid-feedback">
                        {formik.errors.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
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
        </form>
      </Modal>
    </>
  );
}

export default SubjectEdit;
