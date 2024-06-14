import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import profile from "../../assets/images/profile.png";

function CMSProductsItemEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);

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

  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
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
        </div>

        <div className="container">
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <img className="img-fluid" src={profile} alt="Slide 1" />
            {formik.touched.image && formik.errors.image && (
              <div className="text-danger">{formik.errors.image}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Image Details
            </label>
            <p>image source</p>
            {formik.touched.details && formik.errors.details && (
              <div className="text-danger">{formik.errors.details}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CMSProductsItemEdit;
