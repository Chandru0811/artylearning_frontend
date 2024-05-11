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
  parentInformation: Yup.array().of(
    Yup.object().shape({
      parentNames: Yup.string().required("*Guardian Name is required!"),
      parentDateOfBirths: Yup.date()
        .required("*Date Of Birth is required!")
        .max(new Date(), "*Date Of Birth cannot be in the future!"),
      emails: Yup.string().required("*Email is required!"),
      relations: Yup.string().required("*Relation is required!"),
      mobileNumbers: Yup.string()
        .matches(
          /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
          "Invalid Phone Number!"
        )
        .required("Phone Number is required!"),
      postalCodes: Yup.string()
        .matches(/^\d+$/, "Invalid Postal Code")
        .required("*Postal code is required!"),
      addresses: Yup.string().required("*Address is required"),
    })
  ),
});

const AddParentDetailModel = forwardRef(({ formData }) => {
  const { id } = useParams();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("Id:", id);
  };
  const [rows, setRows] = useState(
    formData && formData.parentInformation
      ? formData.parentInformation.length
      : 1
  );

  // const formik = useFormik({
  //   initialValues: {
  //     parentDetailId: "",
  //     parentName: "",
  //     parentDateOfBirth: "",
  //     email: "",
  //     relation: "",
  //     occupation: "",
  //     file: null || "",
  //     mobileNumber: "",
  //     postalCode: "",
  //     address: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (data) => {
  //     console.log("Api Data:", data);
  //     try {
  //       const payload = [{
  //         parentName: data.parentName,
  //         parentDateOfBirth:data.parentDateOfBirth,
  //         email: data.email,
  //         relation: data.relation,
  //         occupation: data.occupation,
  //         mobileNumber: data.mobileNumber,
  //         postalCode: data.postalCode,
  //         address: data.address,
  //       }];
  //       const response = await api.post(
  //         `/createMultipleStudentParentsDetailsWithProfileImages/${formData.student_id}`,
  //         payload,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.status === 201) {
  //         toast.success(response.data.message);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      parentInformation:
        formData && formData.parentInformation
          ? formData.parentInformation.map((parent) => ({
              parentNames: parent.parentNames || "",
              parentDateOfBirths: parent.parentDateOfBirths || "",
              emails: parent.emails || "",
              relations: parent.relations || "",
              occupations: parent.occupations || "",
              files: null || "",
              passwords: parent.passwords || "",
              mobileNumbers: parent.mobileNumbers || "",
              postalCodes: parent.postalCodes || "",
              addresses: parent.addresses || "",
            }))
          : [],
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log("Add ParentGuardian", values);
      try {
        const formDatas = new FormData();
        values.parentInformation.map((parent) => {
          formDatas.append(`parentNames`, parent.parentNames);
          formDatas.append(`parentDateOfBirths`, parent.parentDateOfBirths);
          formDatas.append(`emails`, parent.emails);
          formDatas.append(`relations`, parent.relations);
          formDatas.append(`occupations`, parent.occupations);
          formDatas.append(`files`, parent.files);
          formDatas.append(`mobileNumbers`, parent.mobileNumbers);
          formDatas.append(`postalCodes`, parent.postalCodes);
          formDatas.append(`addresses`, parent.addresses);
        });

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
          getData();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }finally {
        setLoadIndicator(false);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllStudentDetails/${formData.id}`);
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
          <form onSubmit={formik.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                <p className="headColor">App Parent/Guardian Detail</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {[...Array(rows)].map((_, index) => (
                <div className="border-0 mb-5" key={index}>
                  <div className=" border-0 my-2">
                    <form onSubmit={formik.handleSubmit}>
                      <div className="container pt-3">
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
                                name={`parentInformation[${index}].parentNames`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.parentNames || ""
                                }
                              />
                              {formik.touched.parentInformation?.[index]
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
                                name={`parentInformation[${index}].parentDateOfBirths`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.parentDateOfBirths || ""
                                }
                              />

                              {formik.touched.parentInformation?.[index]
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
                                type="emails"
                                name={`parentInformation[${index}].emails`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.emails || ""
                                }
                              ></input>
                              {formik.touched.parentInformation?.[index]
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
                                name={`parentInformation[${index}].relations`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.relations || ""
                                }
                              >
                                <option selected></option>
                                <option value="Brother">Brother</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Sister">Sister</option>
                              </select>
                              {formik.touched.parentInformation?.[index]
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
                                name={`parentInformation[${index}].occupations`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.occupations || ""
                                }
                              ></input>
                              {formik.touched.parentInformation?.[index]
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
                                )}
                            </div>
                            <div className="text-start mt-4">
                              <label htmlFor="" className="fw-medium">
                                <small>Profile Image</small>
                              </label>
                              <br />
                              <input
                                type="file"
                                name="files"
                                className="form-control"
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    `parentInformation[${index}].files`,
                                    event.target.files[0]
                                  );
                                }}
                                onBlur={formik.handleBlur}
                              />
                              <p>
                                <small>
                                  Note: File must be PNG,JPG,GIF or BMP, Max
                                  Size 1 MB
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
                                name={`parentInformation[${index}].mobileNumbers`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.mobileNumbers || ""
                                }
                              />
                              {formik.touched.parentInformation?.[index]
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
                                name={`parentInformation[${index}].postalCodes`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.postalCodes || ""
                                }
                              />
                              {formik.touched.parentInformation?.[index]
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
                                name={`parentInformation[${index}].addresses`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={
                                  formik.values.parentInformation[index]
                                    ?.addresses || ""
                                }
                              />
                              {formik.touched.parentInformation?.[index]
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
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer className="mt-3">
              <Button variant="secondary" onClick={handleClose}>
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
});

export default AddParentDetailModel;
