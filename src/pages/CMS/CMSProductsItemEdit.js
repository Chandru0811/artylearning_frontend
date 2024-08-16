import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaEdit } from "react-icons/fa";

function CMSProductsItemEdit({ id, getData }) {
  console.log("Id", id);
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setDatas] = useState();

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const validationSchema = Yup.object().shape({
    // files: Yup.mixed().required("Image file is required"),
    // imageDetails: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues: {
      files: null || "",
      imageDetails: "",
    },
    // validationSchema,
    onSubmit: async (data) => {
      console.log(data);
      const formData = new FormData();
      formData.append("files", data.files);
      formData.append("imageDetails ", data.imageDetails);

      try {
        const response = await api.put(
          `/updateProductImageSave/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // No need to set it manually
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
          formik.resetForm();
          // setShowModal(false)
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

  const fetchData = async () => {
    try {
      const response = await api.get(`/getProductImageSaveById/${id}`);
      formik.setValues(response.data);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
  useEffect(() => {
    if (show) {
      fetchData();
    }
  }, [show]);

  // const handleFileChange = (event) => {
  //   formik.setFieldValue("image", event.currentTarget.files[0]);
  // };

  return (
    <div className="container">
      <button className="btn btn-sm text-end" onClick={handleShow}>
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
          <Modal.Title className="headColor">Edit Product Item</Modal.Title>
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
              {/* <img src={data.files} alt="product"></img> */}
              {selectedFile && (
                <div>
                  {selectedFile.type.startsWith("files") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxWidth: "100%" }}
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

export default CMSProductsItemEdit;
