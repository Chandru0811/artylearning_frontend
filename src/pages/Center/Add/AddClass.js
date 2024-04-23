import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function AddClass({ id, onSuccess }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = yup.object().shape({
    classRoomName: yup.string().required("*Classroom Name is required"),
    classRoomType: yup.string().required("*Classroom Type is required"),
    classRoomCode: yup.number().typeError("*Enter a valid number").required("*Classroom Code is required"),
    capacity: yup.string().required("*Capacity is required"),
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
        toast.error(error);
      }
    },
  });

  return (
    <>
      <button
        style={{ whiteSpace: "nowrap", width: "100%" }}
        className="btn btn-normal"
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
      >
        <form onSubmit={formik.handleSubmit}>
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
                    className={`form-control   ${
                      formik.touched.classRoomName &&
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
                  className={`form-control   ${
                    formik.touched.classRoomCode && formik.errors.classRoomCode
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
                    className={`form-select   ${
                      formik.touched.classRoomType &&
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
                  className={`form-control   ${
                    formik.touched.capacity && formik.errors.capacity
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
                  class="form-control"
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
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddClass;
