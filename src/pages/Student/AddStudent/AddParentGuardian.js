import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  parentInformation: Yup.array().of(
    Yup.object().shape({
      parentName: Yup.string().required("*Guardian Name is required!"),
      parentDateOfBirth: Yup.date()
        .required("*Date Of Birth is required!")
        .max(new Date(), "*Date Of Birth cannot be in the future!"),
      email: Yup.string().required("*Email is required!"),
      relation: Yup.string().required("*Relation is required!"),
      mobileNumber: Yup.string()
        .matches(
          /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
          "Invalid Phone Number!"
        )
        .required("Phone Number is required!"),
      postalCode: Yup.string()
        .matches(/^\d+$/, "Invalid Postal Code")
        .required("*Postal code is required!"),
      address: Yup.string().required("*Address is required"),
    })
  ),
});

const AddParentGuardian = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const [rows, setRows] = useState(
      formData.parentInformation ? formData.parentInformation.length : 1
    ); // Initially one row for one parent
    const formik = useFormik({
      initialValues: {
        parentInformation: formData.parentInformation
          ? formData.parentInformation.map((parent) => ({
              parentName: parent.parentName || "",
              parentDateOfBirth: parent.parentDateOfBirth || "",
              email: parent.email || "",
              relation: parent.relation || "",
              occupation: parent.occupation || "",
              file: null || "",
              mobileNumber: parent.mobileNumber || "",
              postalCode: parent.postalCode || "",
              address: parent.address || "",
            }))
          : [],
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        console.log(data);
        try {
          const payload = data.parentInformation.map((parent) => ({
            parentName: parent.parentName,
            parentDateOfBirth: parent.parentDateOfBirth,
            email: parent.email,
            relation: parent.relation,
            occupation: parent.occupation,
            mobileNumber: parent.mobileNumber,
            postalCode: parent.postalCode,
            address: parent.address,
          }));
          const response = await api.post(
            `/createMultipleStudentParentsDetailsWithProfileImages/${formData.student_id}`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
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
          toast.error(error.message);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      ParentGuardian: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        {[...Array(rows)].map((_, index) => (
          <div className="border-0 mb-5" key={index}>
            <div>
              <div className=" border-0 my-2">
                <form onSubmit={formik.handleSubmit}>
                  <p className="headColor">Parents / Guardian</p>
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
                            name={`parentInformation[${index}].parentName`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.parentName || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.parentName &&
                            formik.errors.parentInformation?.[index]
                              ?.parentName && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .parentName
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
                            name={`parentInformation[${index}].parentDateOfBirth`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.parentDateOfBirth || ""
                            }
                          />

                          {formik.touched.parentInformation?.[index]
                            ?.parentDateOfBirth &&
                            formik.errors.parentInformation?.[index]
                              ?.parentDateOfBirth && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .parentDateOfBirth
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
                            type="email"
                            name={`parentInformation[${index}].email`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]?.email ||
                              ""
                            }
                          ></input>
                          {formik.touched.parentInformation?.[index]?.email &&
                            formik.errors.parentInformation?.[index]?.email && (
                              <div className="text-danger">
                                <small>
                                  {formik.errors.parentInformation[index].email}
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
                            name={`parentInformation[${index}].relation`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.relation || ""
                            }
                          >
                            <option selected></option>
                            <option value="Brother">Brother</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Sister">Sister</option>
                          </select>
                          {formik.touched.parentInformation?.[index]
                            ?.relation &&
                            formik.errors.parentInformation?.[index]
                              ?.relation && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .relation
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
                            name={`parentInformation[${index}].occupation`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.occupation || ""
                            }
                          ></input>
                          {formik.touched.parentInformation?.[index]
                            ?.occupation &&
                            formik.errors.parentInformation?.[index]
                              ?.occupation && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .occupation
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
                            name="file"
                            className="form-control"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "file",
                                event.currentTarget.files[0]
                              );
                            }}
                            onBlur={formik.handleBlur}
                          />
                          <p>
                            <small>
                              Note: File must be PNG,JPG,GIF or BMP, Max Size 1
                              MB
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
                            name={`parentInformation[${index}].mobileNumber`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.mobileNumber || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.mobileNumber &&
                            formik.errors.parentInformation?.[index]
                              ?.mobileNumber && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .mobileNumber
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
                            name={`parentInformation[${index}].postalCode`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]
                                ?.postalCode || ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]
                            ?.postalCode &&
                            formik.errors.parentInformation?.[index]
                              ?.postalCode && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      .postalCode
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
                            name={`parentInformation[${index}].address`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.parentInformation[index]?.address ||
                              ""
                            }
                          />
                          {formik.touched.parentInformation?.[index]?.address &&
                            formik.errors.parentInformation?.[index]
                              ?.address && (
                              <div className="text-danger">
                                <small>
                                  {
                                    formik.errors.parentInformation[index]
                                      ?.address
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
          </div>
        ))}
        <div className="row">
          <div className="col-12 mb-4">
            <button
              type="button"
              onClick={() => setRows((prevRows) => prevRows + 1)}
              className="btn btn-border btn-sm"
            >
              <i className="bx bx-plus"></i> Add More
            </button>{" "}
            &nbsp;&nbsp;
            {rows > 1 && (
              <button
                type="button"
                onClick={() => setRows((prevRows) => prevRows - 1)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default AddParentGuardian;
