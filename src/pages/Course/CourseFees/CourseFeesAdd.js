import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import fetchAllPackageList from "../../List/PackageList";
import fetchAllPackageListByCenter from "../../List/PackageListByCenter";
import { forEach } from "jszip";

const validationSchema = Yup.object({
  effectiveDate: Yup.string().required("*Effective Date is required"),
  packageId: Yup.string().required("*Package Name is required"),
  weekdayFee: Yup.number()
    .typeError("*Must be a Number")
    .required("*Weekday Fee is required"),
  weekendFee: Yup.number()
    .typeError("*Must be a Number")
    .required("*Weekend Fee is required"),
  taxTypeId: Yup.string().required("*Tax Type Fee is required"),
  status: Yup.string().required("*Status is required"),
});

function CourseFeesAdd({ onSuccess, centerId }) {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  console.log("centerId", centerId);
  console.log("packageData", packageData);
  const fetchPackageData = async (id) => {
    if (id) {
      try {
        const newData = await fetchAllPackageListByCenter(id);
        setPackageData((prev) => {
          if (!Array.isArray(prev)) {
            return newData;
          }
          const uniqueDataMap = new Map();

          prev.forEach((item) => {
            uniqueDataMap.set(item.id, item);
          });
          newData.forEach((item) => {
            uniqueDataMap.set(item.id, item);
          });
          return Array.from(uniqueDataMap.values());
        });
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setPackageData(null);
  };

  const handleShow = () => {
    fetchPackageData();
    fetchTaxData();
    setShow(true);
    setIsModified(false);
  };

  const formik = useFormik({
    initialValues: {
      effectiveDate: "",
      packageId: "",
      weekdayFee: "",
      weekendFee: "",
      taxTypeId: "",
      courseId: id,
      status: "ACTIVE",
      createdBy: userName,
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);

      try {
        const response = await api.post(`/createCourseFees/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (Object.values(values).some((value) => value.trim() !== "")) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchTaxData();

      for (const center of centerId) {
        await fetchPackageData(center.id);
      }
    };

    fetchData();
  }, [show, centerId]);

  return (
    <>
      <div className="py-2 d-flex justify-content-end">
        <Link to="/course">
          <button type="button " className="btn btn-sm btn-border   ">
            Back
          </button>
        </Link>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i className="bx bx-plus"></i>
        </button>
      </div>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add Course Fees</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Effective Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control  ${
                      formik.touched.effectiveDate &&
                      formik.errors.effectiveDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("effectiveDate")}
                  />
                  {formik.touched.effectiveDate &&
                    formik.errors.effectiveDate && (
                      <div className="invalid-feedback">
                        {formik.errors.effectiveDate}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Package<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("packageId")}
                    className={`form-select  ${
                      formik.touched.packageId && formik.errors.packageId
                        ? "is-invalid"
                        : ""
                    }`}
                    id="packageId"
                    name="packageId"
                  >
                    <option value="" disabled selected>
                      Select Package
                    </option>
                    {packageData &&
                      packageData.map((packages) => (
                        <option key={packages.id} value={packages.id}>
                          {packages.packageNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.packageId && formik.errors.packageId && (
                    <div className="invalid-feedback">
                      {formik.errors.packageId}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Weekday Fee<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.weekdayFee && formik.errors.weekdayFee
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("weekdayFee")}
                  />
                  {formik.touched.weekdayFee && formik.errors.weekdayFee && (
                    <div className="invalid-feedback">
                      {formik.errors.weekdayFee}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    WeekEnd Fee<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.weekendFee && formik.errors.weekendFee
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("weekendFee")}
                  />
                  {formik.touched.weekendFee && formik.errors.weekendFee && (
                    <div className="invalid-feedback">
                      {formik.errors.weekendFee}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Tax Type<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select  ${
                      formik.touched.taxTypeId && formik.errors.taxTypeId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("taxTypeId")}
                    style={{ width: "100%" }}
                  >
                    <option value=""></option>
                    {taxData &&
                      taxData.map((tax) => (
                        <option key={tax.id} value={tax.id}>
                          {tax.taxType}
                        </option>
                      ))}
                  </select>
                  {formik.touched.taxTypeId && formik.errors.taxTypeId && (
                    <div className="invalid-feedback">
                      {formik.errors.taxTypeId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select  ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("status")}
                    style={{ width: "100%" }}
                  >
                    <option value=""></option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-sm btn-border bg-light text-dark"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Submit
              </Button>
              {/* <Button variant="danger" type="submit">
                Submit
              </Button> */}
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default CourseFeesAdd;
