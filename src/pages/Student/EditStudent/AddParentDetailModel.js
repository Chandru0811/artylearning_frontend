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
  // parentInformation: Yup.array().of(
  //   Yup.object().shape({
  //     parentNames: Yup.string().required("*Guardian Name is required"),
  //     parentDateOfBirths: Yup.date()
  //       .required("*Date Of Birth is required")
  //       .max(new Date(), "*Date Of Birth cannot be in the future"),
  //     emails: Yup.string()
  //       .email("*Invalid email format")
  //       .required("*Email is required"),
  //     relations: Yup.string().required("*Relation is required"),
  //     mobileNumbers: Yup.string()
  //       .matches(
  //         /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
  //         "*Invalid Phone Number"
  //       )
  //       .required("*Phone Number is required"),
  //     postalCodes: Yup.string()
  //       .matches(/^\d+$/, "*Invalid Postal Code")
  //       .required("*Postal code is required"),
  //     addresses: Yup.string().required("*Address is required"),
  //   })
  // ),
  parentNames: Yup.string().required("*Guardian Name is required"),
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
          formDatas.append(`createdBy,`, userName);

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
            className="btn btn-border btn-sm"
          >
            <i className="bx bx-plus"></i> Add
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
                              // name={`parentInformation[${index}].parentNames`}
                              name="parentNames"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.parentNames || ""
                              // }
                              value={formik.values.parentNames}
                            />
                            {/* {formik.touched.parentInformation?.[index]
                                ?.parentNames &&
                                formik.errors.parentInformation?.[index]
                                  ?.parentNames && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .parentNames
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                              // name={`parentInformation[${index}].parentDateOfBirths`}
                              name="parentDateOfBirths"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.parentDateOfBirths || ""
                              // }
                              value={formik.values.parentDateOfBirths}
                            />

                            {/* {formik.touched.parentInformation?.[index]
                                ?.parentDateOfBirths &&
                                formik.errors.parentInformation?.[index]
                                  ?.parentDateOfBirths && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .parentDateOfBirths
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                              // name={`parentInformation[${index}].emails`}
                              name="emails"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.emails || ""
                              // }
                              value={formik.values.emails}
                            ></input>
                            {/* {formik.touched.parentInformation?.[index]
                                ?.emails &&
                                formik.errors.parentInformation?.[index]
                                  ?.emails && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .emails
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                              // name={`parentInformation[${index}].relations`}
                              name="relations"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.relations || ""
                              // }
                              value={formik.values.relations}
                            >
                              <option selected></option>
                              <option value="Brother">Brother</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Sister">Sister</option>
                            </select>
                            {/* {formik.touched.parentInformation?.[index]
                                ?.relations &&
                                formik.errors.parentInformation?.[index]
                                  ?.relations && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .relations
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              // name={`parentInformation[${index}].occupations`}
                              name="occupations"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.occupations || ""
                              // }
                              value={formik.values.occupations}
                            ></input>
                            {/* {formik.touched.parentInformation?.[index]
                                ?.occupations &&
                                formik.errors.parentInformation?.[index]
                                  ?.occupations && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .occupations
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                              // onChange={(event) => {
                              //   formik.setFieldValue(
                              //     `parentInformation[${index}].file`,
                              //     event.target.file[0]
                              //   );
                              // }}
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
                              // name={`parentInformation[${index}].mobileNumbers`}
                              name="mobileNumbers"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.mobileNumbers || ""
                              // }
                              value={formik.values.mobileNumbers}
                            />
                            {/* {formik.touched.parentInformation?.[index]
                                ?.mobileNumbers &&
                                formik.errors.parentInformation?.[index]
                                  ?.mobileNumbers && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .mobileNumbers
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                              // name={`parentInformation[${index}].postalCodes`}
                              name="postalCodes"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.postalCodes || ""
                              // }
                              value={formik.values.postalCodes}
                            />
                            {/* {formik.touched.parentInformation?.[index]
                                ?.postalCodes &&
                                formik.errors.parentInformation?.[index]
                                  ?.postalCodes && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          .postalCodes
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                              // name={`parentInformation[${index}].addresses`}
                              name="addresses"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              // value={
                              //   formik.values.parentInformation[index]
                              //     ?.addresses || ""
                              // }
                              value={formik.values.addresses}
                            />
                            {/* {formik.touched.parentInformation?.[index]
                                ?.addresses &&
                                formik.errors.parentInformation?.[index]
                                  ?.addresses && (
                                  <div className="text-danger">
                                    <small>
                                      {
                                        formik.errors.parentInformation[index]
                                          ?.addresses
                                      }
                                    </small>
                                  </div>
                                )} */}
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
                  Save{" "}
                </Button>
                {/* <Button
                type="submit"
                variant="danger"
                onSubmit={formik.handleSubmit}
              >
                Save
              </Button> */}
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
);

export default AddParentDetailModel;
