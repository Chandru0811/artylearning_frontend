import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import profile from "../../assets/images/profile.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";

function CMSTestMonialEdit({ id }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    parentImage: null, // To store the uploaded image file
    parentDescription: "", // Details about the image
    parentName: "", // Details about the image
  };

  const validationSchema = Yup.object().shape({
    parentImage: Yup.mixed().required("Image file is required"),
    parentDescription: Yup.string().required("Image details are required"),
    parentName: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("file", values.parentImage);
      formData.append("parentDescription", values.parentDescription);
      formData.append("parentName", values.parentName);
      try {
        const response = await api.put(
          `/updateTestimonialSaveWithProfileImages/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllTestimonialSaveById/${id}`);
      formik.setValues(response.data);
      setSelectedFile(response.data.parentImage)
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('image', file); // Update Formik's form state with the file
  };


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
              {/* {selectedFile && (
                <div>

                  {selectedFile.type.startsWith('parentImage') && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected File" style={{ maxWidth: '100%' }} />
                  )}
                </div>
              )} */}
              <img src={selectedFile} alt="Selected File" style={{ width: '150px' }} />


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

export default CMSTestMonialEdit;
