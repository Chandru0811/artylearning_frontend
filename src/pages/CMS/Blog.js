import React, { useState } from "react";
import img4 from "../../assets/clientimage/parent-img.jpeg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("*Name is required"),
  email: Yup.string()
    .email("*Enter valid email")
    .required("*Email is required"),
  message: Yup.string().required("*Message is required"),
});

const Blog = () => {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log(values);
      try {
        const response = await api.post(
          "/createTestimonialSaveWithProfileImages",
          values,
          {
            // headers: {
            //   "Content-Type": "application/json",
            // },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          formik.resetForm();
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
      <div className="row">
        {/* Main Content Section */}
        <div className="col-md-9 col-12">
          <h1 className="mt-3">Discover Our Latest Posts</h1>
          <div className="blog-post mb-4">
            <Link to="/blog/view">
              <img
                src={img4}
                className="img-fluid py-3 rounded"
                alt="Article"
              />
            </Link>
            <h3 className="mb-2">How to... Host the best New Year's event</h3>
            <p className="text-muted">Ryan Mooss | 29th Nov 2022</p>
          </div>

          <div className="blog-post mb-4">
            <Link to="/blog/view">
              <img
                src={img4}
                className="img-fluid py-3 rounded"
                alt="Article"
              />
            </Link>
            <h3 className="mb-2">
              How to... List a screening event for the 2022 World Cup final
            </h3>
            <p className="text-muted">Ryan Mooss | 29th Nov 2022</p>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="col-md-3 col-12">
          <div className="sticky-top mt-4">
            <div className="sidebar-section my-4">
              <h4 className="">Contact Us</h4>
              <form
                onSubmit={formik.handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !formik.isSubmitting) {
                    e.preventDefault(); // Prevent default form submission
                  }
                }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    style={{ height: "50px" }}
                    className={`form-control  ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    style={{ height: "50px" }}
                    className={`form-control  ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    style={{ height: "50px" }}
                    className={`form-control  ${
                      formik.touched.message && formik.errors.message
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("message")}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loadIndicator}
                  className="btn btn-button w-100 mb-3"
                >
                  {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
