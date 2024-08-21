import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function CMSProductsItemAdd({ onSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName  = localStorage.getItem('userName');


  const handleSaveChanges = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
    formik.resetForm();
    setSelectedFile(null);
  };

  const validationSchema = Yup.object().shape({
    files: Yup.mixed().required("Image file is required"),
    imageDetails: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues: {
      files: "",
      imageDetails: "",
    },
    // validationSchema,
    onSubmit: async (data) => {
      const formData = new FormData();
      formData.append("file", data.files);
      formData.append("imageDetails ", data.imageDetails);
      formData.append("createdBy ", userName);


      try {
        const response = await api.post("/createProductImageSave", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          formik.resetForm();
          setShowModal(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("files", file); // Update Formik's form state with the file
  };

  // const handleFileChange = (event) => {
  //   formik.setFieldValue("image", event.currentTarget.files[0]);
  // };

  return (
    <div className="container">
      <div className=" d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShowModal}
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
      <Modal show={showModal} size="lg" onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add Product Item</Modal.Title>
        </Modal.Header>
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.files && formik.errors.files && (
                  <div className="text-danger">{formik.errors.files}</div>
                )}
              </div>
              {selectedFile && (
                <div className="mb-2">
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
                <label htmlFor="details" className="form-label">
                  Image Details
                </label>
                <textarea
                  id="imageDetails"
                  name="imageDetails"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imageDetails}
                />
                {formik.touched.imageDetails && formik.errors.imageDetails && (
                  <div className="text-danger">
                    {formik.errors.imageDetails}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
              onClick={formik.handleSubmit}
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

export default CMSProductsItemAdd;
