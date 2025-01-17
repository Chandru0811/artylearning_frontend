import React, { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  parentNames: Yup.string().required("*Guardian Name is required"),
  occupations: Yup.string().required("*Occupations Name is required"),
  parentDateOfBirths: Yup.date()
    .required("*Date Of Birth is required")
    .max(new Date(), "*Date Of Birth cannot be in the future"),
  emails: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  relations: Yup.string().required("*Relation is required"),
  mobileNumbers: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Phone Number is required"),
  postalCodes: Yup.string()
    .matches(/^\d+$/, "*Invalid Postal Code")
    .required("*Postal code is required"),
  addresses: Yup.string().required("*Address is required"),
  file: Yup.mixed()
    .notRequired()
    .test(
      "max-file-name-length",
      "*File name must be at most 50 characters",
      (value) => !value || (value.name && value.name.length <= 50)
    ),
});

const AddParentDetailModel = forwardRef(
  ({ formData, primaryContact, onSuccess }) => {
    const { id } = useParams();
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const userName = localStorage.getItem("userName");

    const handleClose = () => {
      setShow(false);
      formik.resetForm();
    };

    const handleShow = () => {
      setShow(true);
      console.log("Id:", id);
    };

    const [rows, setRows] = useState(
      formData && formData.parentInformation
        ? formData.parentInformation.length
        : 1
    );

    const formik = useFormik({
      initialValues: {
        parentNames: formData?.parentNames || "",
        parentDateOfBirths: formData?.parentDateOfBirths || "",
        emails: formData?.emails || "",
        relations: formData?.relations || "",
        occupations: formData?.occupations || "",
        file: null || "",
        passwords: formData?.passwords || "",
        mobileNumbers: formData?.mobileNumbers || "",
        postalCodes: formData?.postalCodes || "",
        addresses: formData?.addresses || "",
        primaryContacts: primaryContact || false,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicator(true);
        // console.log("Add ParentGuardian", values);
        try {
          const formDatas = new FormData();
          formDatas.append(`parentName`, values.parentNames);
          formDatas.append(`parentDateOfBirth`, values.parentDateOfBirths);
          formDatas.append(`email`, values.emails);
          formDatas.append(`relation`, values.relations);
          formDatas.append(`occupation`, values.occupations);
          formDatas.append(`file`, values.file);
          formDatas.append(`mobileNumber`, values.mobileNumbers);
          formDatas.append(`postalCode`, values.postalCodes);
          formDatas.append(`address`, values.addresses);
          formDatas.append(`primaryContact`, primaryContact);
          formDatas.append(`createdBy`, userName);

          const response = await api.post(
            `/createMultipleStudentParentsDetailsWithProfileImages/${id}`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            onSuccess();
            formik.resetForm();
            handleClose();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoadIndicator(false);
        }
      },
      validateOnChange: false, // Enable validation on change
      validateOnBlur: true, // Enable validation on blur
    });

    // Function to scroll to the first error field
    const scrollToError = (errors) => {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus(); // Set focus to the error element
      }
    };

    // Watch for form submit and validation errors
    useEffect(() => {
      if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
        scrollToError(formik.errors);
      }
    }, [formik.submitCount, formik.errors]);

    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentById/${formData.id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      getData();
    }, []);

    return (
      <div className="container-fluid">
        <div className="row">
          <button
            onClick={handleShow}
            type="button"
            className="btn btn-sm text-white"
            style={{
              fontWeight: "600px !important",
              background: "#eb862a",
            }}
          >
            Add More
          </button>

          <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
          >
            <form
              onSubmit={formik.handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !formik.isSubmitting) {
                  e.preventDefault(); // Prevent default form submission
                }
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <p className="headColor">App Parent/Guardian Detail</p>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* {[...Array(rows)].map((_, index) => ( */}
                <div className="border-0 mb-5">
                  <div className=" border-0 my-2">
                    <div className="container pt-3">
                      <div className="row">
                        <div className="col-md-6"></div>
                        {primaryContact === true ? (
                          <div className="col-md-6 d-flex justify-content-end align-items-center">
                            <label className="text-primary fw-semibold ">
                              Primary Contact
                            </label>
                            <input
                              type="radio"
                              checked
                              className="form-check-input mx-2 mb-1"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="text-start">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Parents / Guardian Name</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              name="parentNames"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.parentNames}
                            />
                            {formik.touched.parentNames &&
                              formik.errors.parentNames && (
                                <div className="text-danger">
                                  <small>{formik.errors.parentNames}</small>
                                </div>
                              )}
                          </div>
                          <div className="text-start mt-4 mb-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Date Of Birth</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <input
                              className="form-control  form-contorl-sm"
                              type="date"
                              name="parentDateOfBirths"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.parentDateOfBirths}
                            />
                            {formik.touched.parentDateOfBirths &&
                              formik.errors.parentDateOfBirths && (
                                <div className="text-danger">
                                  <small>
                                    {formik.errors.parentDateOfBirths}
                                  </small>
                                </div>
                              )}
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Email</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="email"
                              name="emails"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.emails}
                            ></input>
                            {formik.touched.emails && formik.errors.emails && (
                              <div className="text-danger">
                                <small>{formik.errors.emails}</small>
                              </div>
                            )}
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Relation</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <select
                              className="form-select "
                              type="text"
                              name="relations"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.relations}
                            >
                              <option selected></option>
                              <option value="Brother">Brother</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Sister">Sister</option>
                            </select>
                            {formik.touched.relations &&
                              formik.errors.relations && (
                                <div className="text-danger">
                                  <small>{formik.errors.relations}</small>
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="text-start">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Occupation</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              name="occupations"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.occupations}
                            ></input>
                            {formik.touched.occupations &&
                              formik.errors.occupations && (
                                <div className="text-danger">
                                  <small>{formik.errors.occupations}</small>
                                </div>
                              )}
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="fw-medium">
                              <small>Profile Image</small>
                            </label>
                            <br />
                            <input
                              type="file"
                              name="file"
                              className="form-control"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "file",
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                              accept=".jpg, .jpeg, .png"
                            />
                            <p>
                              <small>
                                Note: File must be PNG,JPG,GIF or BMP, Max Size
                                1 MB
                              </small>
                            </p>
                            {formik.touched.file && formik.errors.file && (
                              <div className="error text-danger">
                                <small>{formik.errors.file}</small>
                              </div>
                            )}
                          </div>
                          <div className="text-start">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Mobile No</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="tel"
                              name="mobileNumbers"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.mobileNumbers}
                            />
                            {formik.touched.mobileNumbers &&
                              formik.errors.mobileNumbers && (
                                <div className="text-danger">
                                  <small>{formik.errors.mobileNumbers}</small>
                                </div>
                              )}
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Postal Code</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="tel"
                              name="postalCodes"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.postalCodes}
                            />
                            {formik.touched.postalCodes &&
                              formik.errors.postalCodes && (
                                <div className="text-danger">
                                  <small>{formik.errors.postalCodes}</small>
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="text-start mt-4">
                            <label htmlFor="" className=" fw-medium">
                              <small>Address</small>
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            <textarea
                              className="form-control "
                              type="text"
                              style={{
                                height: "7rem",
                              }}
                              name="addresses"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.addresses}
                            />
                            {formik.touched.addresses &&
                              formik.errors.addresses && (
                                <div className="text-danger">
                                  <small>{formik.errors.addresses}</small>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ))} */}
              </Modal.Body>
              <Modal.Footer className="mt-3">
                <Button
                  className="btn btn-sm btn-border bg-light text-dark"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn btn-button btn-sm"
                  onSubmit={formik.handleSubmit}
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
      </div>
    );
  }
);

export default AddParentDetailModel;
