import React, { forwardRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CiEdit } from "react-icons/ci";

const validationSchema = Yup.object().shape({
  parentName: Yup.string().required("*Guardian Name is required"),
  parentDateOfBirth: Yup.date()
    .required("*Date Of Birth is required")
    .max(new Date(), "*Date Of Birth cannot be in the future"),
  email: Yup.string().required("*Email is required"),
  relation: Yup.string().required("*Relation is required"),
  mobileNumber: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .required("Phone Number is required"),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Invalid Postal Code")
    .required("*Postal code is required"),
  address: Yup.string().required("*Address is required"),
  files: Yup.mixed()
    .notRequired()
    .test(
      "max-file-name-length",
      "*File name must be at most 50 characters",
      (value) => !value || (value.name && value.name.length <= 50)
    ),
});

const EditParentDetailModel = forwardRef(({ id, getData }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  const handleShow = async () => {
    setShow(true);
    try {
      const response = await api.get(`/getAllStudentParentsDetailsById/${id}`);
      const getFormData = {
        ...response.data,
        parentDateOfBirth: response.data.parentDateOfBirth.substring(0, 10),
      };
      formik.setValues(getFormData);
      setData(response.data);
      console.log("Student ParentsDetails Data:", getFormData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Id:", id);
  };

  const formik = useFormik({
    initialValues: {
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
      setLoadIndicator(true);
      try {
        const formDatas = new FormData();
        formDatas.append("parentName", data.parentName);
        formDatas.append("parentDateOfBirth", data.parentDateOfBirth);
        formDatas.append("email", data.email);
        formDatas.append("relation", data.relation);
        formDatas.append("occupation", data.occupation);
        formDatas.append("file", data.file);
        formDatas.append("mobileNumber", data.mobileNumber);
        formDatas.append("postalCode", data.postalCode);
        formDatas.append("address", data.address);
        // formDatas.append('parentId', id);
        formDatas.append("password", "12345678");
        formDatas.append("updatedBy", userName);

        const response = await api.put(
          `/updateStudentParentsDetailsWithProfileImages/${id}`,
          formDatas,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          handleClose();
          // fetchParentData();
          getData();
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

  // const fetchParentData = async () => {

  // };

  // useEffect(() => {
  //   fetchParentData();
  // }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <button className="btn" type="button">
          <CiEdit onClick={handleShow} />
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
                    Occupation<span className="text-danger">*</span>
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
                    Date Of Birth<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="date"
                    // onFocus={(e) => e.target.showPicker()}
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
                    className="form-control"
                    onChange={(event) => {
                      formik.setFieldValue("file", event.target.files[0]);
                    }}
                    onBlur={formik.handleBlur}
                    accept=".jpg, .jpeg, .png, .gif, .bmp"
                  />
                  {formik.touched.file && formik.errors.file && (
                    <div className="error text-danger">
                      <small>{formik.errors.file}</small>
                    </div>
                  )}
                  <div className="my-2">
                    {data.profileImage ? (
                      <img
                        src={data.profileImage}
                        className="img-fluid rounded"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        alt="Profile"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#e0e0e0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <lable className="">
                    Email<span className="text-danger">*</span>
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
                    Mobile No<span className="text-danger">*</span>
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
                    Relation<span className="text-danger">*</span>
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
                    Postal Code<span className="text-danger">*</span>
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
                    Address<span className="text-danger">*</span>
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
              <Button
                className="btn btn-sm btn-border bg-light text-dark"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <button
                type="submit"
                onSubmit={formik.handleSubmit}
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
});

export default EditParentDetailModel;
