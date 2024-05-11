import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { data } from "jquery";

const validationSchema = Yup.object().shape({
  emergencyContactNo: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .required("*Emergency Contact Number is Required!"),
  contactNo: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Phone Number")
    .notRequired(""),
});

const AddEmergencyContact = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState([{}]);

    const formik = useFormik({
      initialValues: {
        emergencyContactName: formData.emergencyContactName || "",
        authorizedRelation: formData.authorizedRelation || "",
        emergencyContactNo: formData.emergencyContactNo || "",
        emergencyContactInformation: [
          {
            name: formData.name || "",
            emergencyRelation: formData.emergencyRelation || "",
            contactNo: formData.contactNo || "",
            postalCode:formData.postalCode || "",
            emergencyContactAddress:formData.emergencyContactAddress || "",
            files: null || "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        // handleNext();
        const formDatas = new FormData();

        // Append fields for emergency contact
        formDatas.append("emergencyContactName", data.emergencyContactName);
        formDatas.append("emergencyRelation", data.emergencyRelation);
        formDatas.append("emergencyContactNo", data.emergencyContactNo);

        // Append fields for each emergency contact information
        data.emergencyContactInformation.forEach((contact) => {
          formDatas.append("name", contact.name);
          formDatas.append("contactNo", contact.contactNo);
          formDatas.append("authorizedRelation", contact.authorizedRelation);
          formDatas.append("postalCode",contact.postalCode);
          formDatas.append("emergencyContactAddress",contact.emergencyContactAddress);
          formDatas.append("files", contact.files);
        });
        console.log(formDatas);
        try {
          const response = await api.post(
            `/createEmergencyContactWithEmergencyAuthorizedContact/${formData.student_id}`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Specify the Content-Type header
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prev) => ({ ...prev, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }finally {
          setLoadIndicators(false);
        }
      },
    });

    // const handleNextStep = () => {
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };

    useImperativeHandle(ref, () => ({
      EmergencyContact: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="border-0 mb-5">
            <div className="border-0 my-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="border-0 mb-5">
                  <div className="mb-5">
                    <div className="border-0 my-2">
                      <p className="headColor">Emergency Contact</p>
                      <div className="container py-3">
                        <div className="row mt-3">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="text-start mt-4">
                              <label htmlFor="" className="mb-1 fw-medium">
                                <small>Emergency Contact Name</small>&nbsp;
                              </label>
                              <br />
                              <input
                                className="form-control "
                                type="text"
                                name="emergencyContactName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.emergencyContactName}
                              />
                            </div>
                            <div className="text-start mt-4">
                              <label htmlFor="" className="mb-1 fw-medium">
                                <small>Relation</small>&nbsp;
                              </label>
                              <br />
                              <select
                                name="emergencyRelation"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.emergencyRelation}
                                className="form-select "
                                aria-label="example"
                              >
                                <option value=""></option>
                                <option value="Mother">Mother</option>
                                <option value="Father">Father</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12 px-5">
                            <div className="text-start mt-4">
                              <label htmlFor="" className="mb-1 fw-medium">
                                <small>Emergency Contact No</small>
                                <span className="text-danger">*</span>
                              </label>
                              <br />
                              <input
                                className="form-control "
                                type="text"
                                name="emergencyContactNo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.emergencyContactNo}
                              />
                              {formik.touched.emergencyContactNo &&
                                formik.errors.emergencyContactNo && (
                                  <div className="text-danger">
                                    <small>
                                      {formik.errors.emergencyContactNo}
                                    </small>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="border-0 mb-5">
            {rows.map((row, index) => (
              <div className="border-0 mb-5" key={index}>
                <div className="border-0 my-2">
                  <form onSubmit={formik.handleSubmit}>
                    <p className="headColor">
                      Authorized Person to Take Child from Class
                    </p>
                    <div className="container py-3">
                      <div className="row mt-3">
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Name</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              name={`emergencyContactInformation[${index}].name`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                formik.values.emergencyContactInformation[index]
                                  ?.name || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Relation</small>&nbsp;
                            </label>
                            <br />
                            <select
                              name={`emergencyContactInformation[${index}].authorizedRelation`}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="form-select "
                              aria-label=" example"
                              value={
                                formik.values.emergencyContactInformation[index]
                                  ?.authorizedRelation || ""
                              }
                            >
                              <option value=""></option>
                              <option value="Mother">Mother</option>
                              <option value="Father">Father</option>
                              <option value="Sister">Sister</option>
                              <option value="Brother">Brother</option>
                            </select>
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Emergency Contact Address</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyContactInformation[${index}].emergencyContactAddress`}
                              value={
                                formik.values.emergencyContactInformation[index]
                                  ?.emergencyContactAddress || ""
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 px-5">
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Contact No</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyContactInformation[${index}].contactNo`}
                              value={
                                formik.values.emergencyContactInformation[index]
                                  ?.contactNo || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Postal Code</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control "
                              type="text"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name={`emergencyContactInformation[${index}].postalCode`}
                              value={
                                formik.values.emergencyContactInformation[index]
                                  ?.postalCode || ""
                              }
                            />
                          </div>
                          <div className="text-start mt-4">
                            <label htmlFor="" className="mb-1 fw-medium">
                              <small>Person Profile</small>&nbsp;
                            </label>
                            <br />
                            <input
                              className="form-control"
                              type="file"
                              name="files"
                               // name={`emergencyContactInformation[${index}].files`}
                              // onChange={(event) => {
                              //   const fileName = event.target.files[0].name;
                              //   event.target.parentNode.querySelector(
                              //     ".file-name"
                              //   ).textContent = fileName;
                              // }}
                              onChange={(event) => {
                                formik.setFieldValue(
                                  `emergencyContactInformation[${index}].files`,
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                              accept=".jpg, .jpeg, .png"
                            />
                            <span className="file-name"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 mb-4">
              <button
                type="button"
                onClick={() => {
                  setRows((prev) => [...prev, {}]); // Add a new row for each parent
                }}
                className="btn btn-border btn-sm"
              >
                <i className="bx bx-plus"></i> Add More
              </button>{" "}
              &nbsp;&nbsp;
              {rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => setRows((prev) => prev.slice(0, -1))}
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AddEmergencyContact;
