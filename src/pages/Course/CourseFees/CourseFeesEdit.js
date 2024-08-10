import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllPackageList from "../../List/PackageList";

const validationSchema = Yup.object({
  effectiveDate: Yup.string().required("*Effective Date is required"),
  packageId: Yup.string().required("*Package Name is required"),
  weekdayFee: Yup.string().required("*Weekday Fee is required"),
  weekendFee: Yup.string().required("*Weekend Fee is required"),
  taxType: Yup.string().required("*TaxType Fee is required"),
  status: Yup.string().required("*Status is required"),

});

function CourseFeesEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [taxData, setTaxData] = useState([]);

  const fetchPackageData = async () => {
    try {
      const packageData = await fetchAllPackageList();
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
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
  };

  const formik = useFormik({
    initialValues: {
      effectiveDate: "",
      packageId: "",
      weekdayFee: "",
      weekendFee: "",
      taxType: "",
      courseId: id,
      status: ""
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);

      try {
        const response = await api.put(`/updateCourseFees/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
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
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseFeesById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTaxData();
    fetchPackageData();
  }, [show]);

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Edit Course Fees</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Effective Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    onFocus={(e) => e.target.showPicker()}
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
                    class={`form-select  ${
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
                      formik.touched.taxType && formik.errors.taxType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("taxType")}
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
                  {formik.touched.taxType && formik.errors.taxType && (
                    <div className="invalid-feedback">
                      {formik.errors.taxType}
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
              <Button type="button" variant="secondary" onClick={handleClose}>
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

export default CourseFeesEdit;
