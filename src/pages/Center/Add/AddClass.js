import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function AddClass({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    
    setShow(true);
    setIsModified(false); 
  };
  const validationSchema = yup.object().shape({
    classRoomName: yup.string().required("*Classroom Name is required"),
    classRoomType: yup.string().required("*Classroom Type is required"),
    classRoomCode: yup.string().required("*Classroom Code is required"),
    capacity: yup.number().integer("Must be an integer")
    .typeError("Must be a number")
    .positive("Must be positive").required("*Capacity is required"),
  });
  const formik = useFormik({
    initialValues: {
      classRoomName: "",
      classRoomType: "",
      classRoomCode: "",
      capacity: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form values:", values);
      try {
        const response = await api.post(
          `/createCenterClassRooms/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if(error.response.status === 409){
          toast.warning(error?.response?.data?.message)
        }else{
          toast.error(error.response.data.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (Object.values(values).some(value => value.trim() !== "")) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  return (
    <>
      <button
        style={{ whiteSpace: "nowrap", width: "100%" }}
        className="btn btn-normal text-start"
        onClick={handleShow}
      >
        Add Classroom
      </button>

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
        backdrop={isModified ? "static" : true} 
        keyboard={isModified ? false : true} 
      >
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Add Classroom</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Classroom Name<span className="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${formik.touched.classRoomName &&
                      formik.errors.classRoomName
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("classRoomName")}
                  />
                  {formik.touched.classRoomName &&
                    formik.errors.classRoomName && (
                      <div className="invalid-feedback">
                        {formik.errors.classRoomName}
                      </div>
                    )}
                </div>
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Classroom Code<span class="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control   ${formik.touched.classRoomCode && formik.errors.classRoomCode
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("classRoomCode")}
                />
                {formik.touched.classRoomCode &&
                  formik.errors.classRoomCode && (
                    <div className="invalid-feedback">
                      {formik.errors.classRoomCode}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Classroom Type<span className="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <select
                    className={`form-select   ${formik.touched.classRoomType &&
                      formik.errors.classRoomType
                      ? "is-invalid"
                      : ""
                      }`}
                    {...formik.getFieldProps("classRoomType")}
                  >
                    <option></option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                  {formik.touched.classRoomType &&
                    formik.errors.classRoomType && (
                      <div className="invalid-feedback">
                        {formik.errors.classRoomType}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Capacity<span class="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  pattern="^\d+$"
                  className={`form-control   ${formik.touched.capacity && formik.errors.capacity
                    ? "is-invalid"
                    : ""
                    }`}
                  {...formik.getFieldProps("capacity")}
                />
                {formik.touched.capacity && formik.errors.capacity && (
                  <div className="invalid-feedback">
                    {formik.errors.capacity}
                  </div>
                )}
              </div>
              <div className="form-floating">
                <lable>Description</lable>
                <textarea
                  className="form-control p-1"
                  {...formik.getFieldProps("description")}
                  placeholder=""
                  id="floatingTextarea2"
                  eration
                  style={{ height: 100 }}
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddClass;
