import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import api from "../../../config/URL";

function CMSBlogAdd({ onSuccess }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setSelectedFile(null);
  };

  const handleShow = () => setShow(true);

  const initialValues = {
    file: "", // To store the uploaded image file
    description: "",
    title: "", // Details about the image
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("Image file is required"),
    description: Yup.string().required("Image details are required"),
    title: Yup.string().required("Image details are required"),
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("file", file); // Update Formik's form state with the file
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      console.log(values);
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("title ", values.title);
      formData.append("file", values.file);
      formData.append("createdBy ", userName);

      try {
        const response = await api.post("/createBlogSave", formData, {
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          formik.resetForm();
          onSuccess();
          setShow(false);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  return (
    <div className="container">
      <div className=" d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i class="bx bx-plus"></i>
        </button>
      </div>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add BLog</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Upload Image<span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".jpeg,.jpg,.png,.gif,.bmp,.webp"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="text-danger">{formik.errors.file}</div>
                )}
              </div>
              {selectedFile && (
                <div>
                  {selectedFile.type.startsWith("image") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Blog Title<span className="text-danger">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-danger">{formik.errors.title}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Blog Description<span className="text-danger">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-danger">{formik.errors.description}</div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
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
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default CMSBlogAdd;
