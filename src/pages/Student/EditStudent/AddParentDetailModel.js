import React, { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";

const validationSchema = Yup.object().shape({
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
});

const AddParentDetailModel = forwardRef(({ formData, id, getData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("Id:", id);
  };

  const formik = useFormik({
    initialValues: {
      parentDetailId: "",
      parentName: "",
      parentDateOfBirth: "",
      email: "",
      relation: "",
      occupation: "",
      file: null || "",
      mobileNumber: "",
      postalCode: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("Api Data:", data);
      try {
        const payload = [{
          parentName: data.parentName,
          parentDateOfBirth:data.parentDateOfBirth,
          email: data.email,
          relation: data.relation,
          occupation: data.occupation,
          mobileNumber: data.mobileNumber,
          postalCode: data.postalCode,
          address: data.address,
        }];
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
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <button
          onClick={handleShow}
          type="button"
          className="btn btn-border btn-sm"
        >
          <i className="bx bx-plus"></i> Add More
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
                <p className="headColor">Edit Parent/Guardian Detail</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <lable className="form-lable">
                    Parents / Guardian Name
                    <span className="text-danger">*</span>
                  </lable>
                  <div className="input-group mb-3">
                    <input
                      className="form-control "
                      type="text"
                      name="parentName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.parentName}
                    />
                    {formik.touched.parentName && formik.errors.parentName && (
                      <div className="invalid-feedback">
                        {formik.errors.parentName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Occupation<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control    ${
                      formik.touched.occupation && formik.errors.occupation
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("occupation")}
                  />
                  {formik.touched.occupation && formik.errors.occupation && (
                    <div className="invalid-feedback">
                      {formik.errors.occupation}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Date Of Birth<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="date"
                    name="parentDateOfBirth"
                    className={`form-control ${
                      formik.touched.parentDateOfBirth &&
                      formik.errors.parentDateOfBirth
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("parentDateOfBirth")}
                  />
                  {formik.touched.parentDateOfBirth &&
                    formik.errors.parentDateOfBirth && (
                      <div className="invalid-feedback">
                        {formik.errors.parentDateOfBirth}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">Profile Image</lable>
                  <input
                    type="file"
                    name="file"
                    className={`form-control    ${
                      formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("file")}
                  />
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Email<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="email"
                    name="Email"
                    className={`form-control    ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Mobile No<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    name="mobileNumber"
                    className={`form-control    ${
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("mobileNumber")}
                  />
                  {formik.touched.mobileNumber &&
                    formik.errors.mobileNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.mobileNumber}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Relation<span class="text-danger">*</span>
                  </lable>
                  <select
                    className={`form-select ${
                      formik.touched.relation && formik.errors.relation
                        ? "is-invalid"
                        : ""
                    }`}
                    name="relation"
                    {...formik.getFieldProps("relation")}
                  >
                    <option selected></option>
                    <option value="Brother">Brother</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                  </select>
                  {formik.touched.relation && formik.errors.relation && (
                    <div className="invalid-feedback">
                      {formik.errors.relation}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Postal Code<span class="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    name="postalCode"
                    className={`form-control    ${
                      formik.touched.postalCode && formik.errors.postalCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("postalCode")}
                  />
                  {formik.touched.postalCode && formik.errors.postalCode && (
                    <div className="invalid-feedback">
                      {formik.errors.postalCode}
                    </div>
                  )}
                </div>
                <div className="col-md-12 col-12 mb-2">
                  <lable className="">
                    Address<span class="text-danger">*</span>
                  </lable>
                  <textarea
                    type="text"
                    name="address"
                    className={`form-control    ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="mt-3">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="danger"
                onSubmit={formik.handleSubmit}
              >
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
});

export default AddParentDetailModel;
