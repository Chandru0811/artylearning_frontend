import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function CMSTestMonialAdd({ onSuccess }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setSelectedFile(null);
  };

  const handleShow = () => setShow(true);


  const initialValues = {
    parentImage: '', // To store the uploaded image file
    parentDescription: "",
    parentName: "",// Details about the image
  };

  const validationSchema = Yup.object().shape({
    parentImage: Yup.mixed().required("Image file is required"),
    parentDescription: Yup.string().required("Image details are required"),
    parentName: Yup.string().required("Image details are required"),
  });

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('parentImage', file); // Update Formik's form state with the file
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);


      console.log(values);
      const formData = new FormData();
      formData.append("parentDescription", values.parentDescription)
      formData.append("parentName ", values.parentName)
      formData.append("file", values.parentImage)
      try {
        const response = await api.post("/createTestimonialSaveWithProfileImages", formData, {
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
      {/* <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/cms/productsitem">
            <button type="button" className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <button
            type="submit"
            className="btn btn-button btn-sm"
            disabled={formik.isSubmitting}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Save
          </button>
        </div> */}
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add TestiMonial</Modal.Title>
        </Modal.Header>
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="parentImage" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="parentImage"
                  name="parentImage"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.parentImage && formik.errors.parentImage && (
                  <div className="text-danger">{formik.errors.parentImage}</div>
                )}
              </div>
              {selectedFile && (
                <div>

                  {selectedFile.type.startsWith('image') && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected File" style={{ maxHeight: "200px" }} />
                  )}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="parentName" className="form-label">
                  Parent Name
                </label>
                <input
                  id="parentName"
                  name="parentName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentName}
                />
                {formik.touched.parentName && formik.errors.parentName && (
                  <div className="text-danger">{formik.errors.parentName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="parentDescription" className="form-label">
                  Parent Description
                </label>
                <textarea
                  id="parentDescription"
                  name="parentDescription"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentDescription}
                />
                {formik.touched.parentDescription && formik.errors.parentDescription && (
                  <div className="text-danger">{formik.errors.parentDescription}</div>
                )}
              </div>


            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
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

export default CMSTestMonialAdd;
