import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
// import api from "../../config/URL";
// import { toast } from "react-toastify";

const validationSchema = Yup.object({
  center: Yup.string().required("*Select a Centre"),
});

function CmsCourseAdd() {
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      menuLogo: "",
      menuTitle: "",

      backgroundImage: "",
      heading: "",
      content1: "",
      content2: "",

      card1Heading: "",
      card1Image: "",
      card1Content: "",

      card2Heading: "",
      card2Image: "",
      card2Content: "",

      card3Heading: "",
      card3Image: "",
      card3Content: "",

      finalContent: "",

      createdAt: "",
      createdBy: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // setLoadIndicator(true);
      // try {
      //   // Send the request to the API
      //   const response = await api.post("/generateInvoice", values, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   if (response.status === 201) {
      //     toast.success("Invoice Generated successfully");
      //     navigate("/invoice");
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error(
      //     error.message || "An error occurred while submitting the form"
      //   );
      // } finally {
      //   setLoadIndicator(false);
      // }
      console.log("Courses Data:", values);
    },
  });

  return (
    <section className="start" style={{ backgroundColor: "#f9fafb" }}>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
      <div className="container cms-header shadow-sm py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Course</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {/* {storedScreens?.chineseCoursePublish && ( */}
            <button
                type="submit"
              className="btn btn-sm ms-2 text-white"
              style={{background:"#e60504"}}
              disabled={loadIndicator}
              >
                {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
                Save
              </button>
            {/* )} */}
            <Link to={"/cms/CmsCourses"}>
              <button
                className="btn btn-sm btn-outline-danger border ms-2 p-2"
                type="button"
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      
        <div className="container py-3">
          <div className="row mt-3">
            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Menu Logo<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("menuLogo")}
                  className={`form-control ${
                    formik.touched.menuLogo && formik.errors.menuLogo
                      ? "is-invalid"
                      : ""
                  }`}
                  type="file"
                />
                {formik.touched.menuLogo && formik.errors.menuLogo && (
                  <div className="invalid-feedback">
                    {formik.errors.menuLogo}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Background Image<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("backgroundImage")}
                  className={`form-control ${
                    formik.touched.backgroundImage &&
                    formik.errors.backgroundImage
                      ? "is-invalid"
                      : ""
                  }`}
                  type="file"
                />
                {formik.touched.backgroundImage &&
                  formik.errors.backgroundImage && (
                    <div className="invalid-feedback">
                      {formik.errors.backgroundImage}
                    </div>
                  )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  First Content<span class="text-danger">*</span>
                </label>
                <br />
                <textarea
                  rows={5}
                  {...formik.getFieldProps("content1")}
                  className={`form-control  ${
                    formik.touched.content1 && formik.errors.content1
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter Content"
                />
                {formik.touched.content1 && formik.errors.content1 && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.content1}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Menu Title<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("menuTitle")}
                  className={`form-control ${
                    formik.touched.menuTitle && formik.errors.menuTitle
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.menuTitle && formik.errors.menuTitle && (
                  <div className="invalid-feedback">
                    {formik.errors.menuTitle}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Heading<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("heading")}
                  className={`form-control ${
                    formik.touched.heading && formik.errors.heading
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.heading && formik.errors.heading && (
                  <div className="invalid-feedback">
                    {formik.errors.heading}
                  </div>
                )}
              </div>
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Second Content<span class="text-danger">*</span>
                </label>
                <br />
                <textarea
                  rows={5}
                  {...formik.getFieldProps("content2")}
                  className={`form-control  ${
                    formik.touched.content2 && formik.errors.content2
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter Content"
                />
                {formik.touched.content2 && formik.errors.content2 && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.content2}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <h5 className="px-5">Card 1</h5>
            <div className="row px-5">
              <div className="col-lg-6 col-md-6 col-12 text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Heading<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("card1Heading")}
                  className={`form-control ${
                    formik.touched.card1Heading && formik.errors.card1Heading
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.card1Heading && formik.errors.card1Heading && (
                  <div className="invalid-feedback">
                    {formik.errors.card1Heading}
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-12 text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Image<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("card1Image")}
                  className={`form-control ${
                    formik.touched.card1Image && formik.errors.card1Image
                      ? "is-invalid"
                      : ""
                  }`}
                  type="file"
                />
                {formik.touched.card1Image && formik.errors.card1Image && (
                  <div className="invalid-feedback">
                    {formik.errors.card1Image}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Content<span class="text-danger">*</span>
                </label>
                <br />
                <textarea
                  rows={10}
                  {...formik.getFieldProps("card1Content")}
                  className={`form-control  ${
                    formik.touched.card1Content && formik.errors.card1Content
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter Content"
                />
                {formik.touched.card1Content && formik.errors.card1Content && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.card1Content}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <h5 className="px-5">Card 2</h5>
            <div className="row px-5">
              <div className="col-lg-6 col-md-6 col-12 text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Heading<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("card2Heading")}
                  className={`form-control ${
                    formik.touched.card2Heading && formik.errors.card2Heading
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.card2Heading && formik.errors.card2Heading && (
                  <div className="invalid-feedback">
                    {formik.errors.card2Heading}
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-12 text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Image<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("card2Image")}
                  className={`form-control ${
                    formik.touched.card2Image && formik.errors.card2Image
                      ? "is-invalid"
                      : ""
                  }`}
                  type="file"
                />
                {formik.touched.card2Image && formik.errors.card2Image && (
                  <div className="invalid-feedback">
                    {formik.errors.card2Image}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Content<span class="text-danger">*</span>
                </label>
                <br />
                <textarea
                  rows={10}
                  {...formik.getFieldProps("card2Content")}
                  className={`form-control  ${
                    formik.touched.card2Content && formik.errors.card2Content
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter Content"
                />
                {formik.touched.card2Content && formik.errors.card2Content && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.card2Content}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <h5 className="px-5">Card 3</h5>
            <div className="row px-5">
              <div className="col-lg-6 col-md-6 col-12 text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Heading<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("card3Heading")}
                  className={`form-control ${
                    formik.touched.card3Heading && formik.errors.card3Heading
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                />
                {formik.touched.card3Heading && formik.errors.card3Heading && (
                  <div className="invalid-feedback">
                    {formik.errors.card3Heading}
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-12 text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Image<span className="text-danger">*</span>
                </label>
                <br />
                <input
                  {...formik.getFieldProps("card3Image")}
                  className={`form-control ${
                    formik.touched.card3Image && formik.errors.card3Image
                      ? "is-invalid"
                      : ""
                  }`}
                  type="file"
                />
                {formik.touched.card3Image && formik.errors.card3Image && (
                  <div className="invalid-feedback">
                    {formik.errors.card3Image}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Card Content<span class="text-danger">*</span>
                </label>
                <br />
                <textarea
                  rows={10}
                  {...formik.getFieldProps("card3Content")}
                  className={`form-control  ${
                    formik.touched.card3Content && formik.errors.card3Content
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter Content"
                />
                {formik.touched.card3Content && formik.errors.card3Content && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.card3Content}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-12 px-5">
              <div className="text-start mt-3">
                <label htmlFor="" className="mb-1 fw-medium">
                  Final Content<span class="text-danger">*</span>
                </label>
                <br />
                <textarea
                  rows={10}
                  {...formik.getFieldProps("finalContent")}
                  className={`form-control  ${
                    formik.touched.finalContent && formik.errors.finalContent
                      ? "is-invalid"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter Content"
                />
                {formik.touched.finalContent && formik.errors.finalContent && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.finalContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CmsCourseAdd;
