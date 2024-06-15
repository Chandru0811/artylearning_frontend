import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import profile from "../../assets/images/profile.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";

function CMSTestMonialEdit() {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    image: null, // To store the uploaded image file
    details: "", // Details about the image
  };

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().required("Image file is required"),
    details: Yup.string().required("Image details are required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("details", values.details);

      // Example API call using 'api' from '../../config/URL'
      const response = await api.post("/upload-image", formData);

      // Handle response or redirect after successful upload
      console.log("Upload successful", response.data);
      toast.success("Image uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload image.");
    } finally {
      setLoadIndicator(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('image', file); // Update Formik's form state with the file
  };
  // const handleFileChange = (event) => {
  //   formik.setFieldValue("image", event.currentTarget.files[0]);
  // };

  return (
    <div className="container">
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>

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
          <Modal.Title className="headColor">Edit TestiMonial</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {!selectedFile && (
                  <img className="img-fluid sized-image" src={profile} alt="Slide 1" />
                )}

                {formik.touched.image && formik.errors.image && (
                  <div className="text-danger">{formik.errors.image}</div>
                )}
              </div>
              {selectedFile && (
                <div>
                  
                  
                  {selectedFile.type.startsWith('image') && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected File" style={{ maxWidth: '100%' }} />
                  )}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="details" className="form-label">
                  Parent Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  value="artylearning"
                />
                {formik.touched.details && formik.errors.details && (
                  <div className="text-danger">{formik.errors.details}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="details" className="form-label">
                  Parent Description
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  value=" Redundant alt attribute. Screen-readers already announce `img` tags as an image. You don’t need to use the words "
                />
                {formik.touched.details && formik.errors.details && (
                  <div className="text-danger">{formik.errors.details}</div>
                )}
              </div>
            </div>
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
                Update
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

export default CMSTestMonialEdit;
