import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchAllCentersWithIds from "../../List/CenterList";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function HolidayAdd({ selectedCenter }) {
  const validationSchema = Yup.object({
    centerId: Yup.string().required("*Centre Name is required"),
    holidayName: Yup.string().required("*Holiday Name is required"),
    startDate: Yup.string().required("*Start Date is required"),
    endDate: Yup.string()
      .required("*End Date is required")
      .test(
        "is-greater",
        "*To Date should be later than Start Date",
        function (value) {
          const { startDate } = this.parent;
          return !startDate || !value || new Date(value) >= new Date(startDate);
        }
      ),
    holidayDescription: Yup.string().required(
      "*Holiday Description is required"
    ),
  });
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      centerId: selectedCenter,
      holidayName: "",
      startDate: "",
      endDate: "",
      holidayDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      try {
        const apiCalls = centerData.map(async (center) => {
          try {
            const payload = {
              holidayName: values.holidayName,
              startDate: values.startDate,
              endDate: values.endDate,
              holidayDescription: values.holidayDescription,
              createdBy: userName,
              centerId: String(center.id),
            };

            const response = await api.post(`/createUserHoliday`, payload, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            return { success: true, centerId: center.id };
          } catch (error) {
            if (error.response?.status === 409) {
              toast.warning(
                `${error?.response?.data?.message} - ${center.centerNames}`
              );
            } else {
              toast.error(error.response?.data?.message);
            }
            return { success: false, centerId: center.id };
          }
        });

        const results = await Promise.all(apiCalls);
        const allSuccess = results.every((result) => result.success);

        if (allSuccess) {
          toast.success("Holiday added successfully!");
          navigate("/holiday");
        } else {
          toast.error("error");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });
  console.log("object", formik.values.centerId);

  const fetchData = async () => {
    try {
      const response = await fetchAllCentersWithIds();

      let formattedCenters = response.map((center) => ({
        id: center.id,
        centerNames: center.centerNames,
      }));

      if (selectedCenter === "0" || selectedCenter === 0) {
        setCenterData(formattedCenters);
      } else {
        const filteredCenter = formattedCenters.filter(
          (center) => center.id === parseInt(selectedCenter)
        );
        setCenterData(filteredCenter);
      }

      formik.setFieldValue("centerId", selectedCenter);
    } catch (error) {
      toast.error("Failed to fetch center data");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCenter]);

  useEffect(() => {
    fetchData();
    if (selectedCenter) {
      formik.setFieldValue("center", selectedCenter);
    }
  }, [selectedCenter]);

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/holiday" className="custom-breadcrumb">
            &nbsp;Holiday
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Holiday Add
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex justify-content-between align-items-center p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Add Holiday</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/holiday">
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
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
                <span className="fw-medium">Save</span>
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 d-none">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label m-0">
                    Centre Name<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("centerId")}
                    name="centerId"
                    className={`form-select ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected disabled></option>
                    {centerData &&
                      centerData.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.centerNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.centerId && formik.errors.centerId && (
                    <div className="invalid-feedback">
                      {formik.errors.centerId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Holiday Name<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.holidayName && formik.errors.holidayName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("holidayName")}
                  />
                  {formik.touched.holidayName && formik.errors.holidayName && (
                    <div className="invalid-feedback">
                      {formik.errors.holidayName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Start Date<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="date"
                    className={`form-control  ${
                      formik.touched.startDate && formik.errors.startDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("startDate")}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <div className="invalid-feedback">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    End Date<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="date"
                    className={`form-control  ${
                      formik.touched.endDate && formik.errors.endDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("endDate")}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <div className="invalid-feedback">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Description<span className="text-danger">*</span>
                  </lable>
                  <textarea
                    type="text"
                    rows={5}
                    className={`form-control  ${
                      formik.touched.holidayDescription &&
                      formik.errors.holidayDescription
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("holidayDescription")}
                  />
                  {formik.touched.holidayDescription &&
                    formik.errors.holidayDescription && (
                      <div className="invalid-feedback">
                        {formik.errors.holidayDescription}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HolidayAdd;
