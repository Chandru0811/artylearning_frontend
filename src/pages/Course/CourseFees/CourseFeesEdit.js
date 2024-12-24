import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllPackageListByCenter from "../../List/PackageListByCenter";

const validationSchema = Yup.object({
  effectiveDate: Yup.string().required("*Effective Date is required"),
  packageId: Yup.string().required("*Package Name is required"),
  weekdayFee: Yup.string().required("*Weekday Fee is required"),
  weekendFee: Yup.string().required("*Weekend Fee is required"),
  taxTypeId: Yup.string().required("*Tax Type Fee is required"),
  status: Yup.string().required("*Status is required"),
});

function CourseFeesEdit({ id, onSuccess, handleMenuClose, centerId }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [taxData, setTaxData] = useState([]);
  const userName = localStorage.getItem("userName");

  // const fetchPackageData = async () => {
  //   try {
  //     const packageData = await fetchAllPackageList();
  //     setPackageData(packageData);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

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
    handleMenuClose();
    setOpen(false);
    setPackageData(null);
  };

  const handleShow = () => {
    fetchPackageData();
    fetchTaxData();
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      effectiveDate: "",
      packageId: "",
      weekdayFee: "",
      weekendFee: "",
      taxTypeId: "",
      courseId: id,
      status: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.updatedBy = userName
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
    enableReinitialize: true,
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTaxData();

      for (const center of centerId) {
        await fetchPackageData(center.id);
      }
    };

    fetchData();
  }, [centerId]);
  return (
    <>
      <span
        onClick={handleShow}
        style={{
          whiteSpace: "nowrap",
          width: "100% !important",
        }}
      >
        Edit
      </span>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Course Fees</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-3">
                  <label>Effective Date</label>
                  <input
                    type="date"
                    className="form-control"
                    {...formik.getFieldProps("effectiveDate")}
                  />
                  {formik.touched.effectiveDate &&
                    formik.errors.effectiveDate && (
                      <div style={{ color: "red", fontSize: "0.8rem" }}>
                        {formik.errors.effectiveDate}
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label>Package</label>
                  <select
                    className="form-select"
                    {...formik.getFieldProps("packageId")}
                  >
                    <option value="">Select Package</option>
                    {packageData &&
                      packageData.map((packages) => (
                        <option key={packages.id} value={packages.id}>
                          {packages.packageNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.packageId && formik.errors.packageId && (
                    <div style={{ color: "red", fontSize: "0.8rem" }}>
                      {formik.errors.packageId}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label>Weekday Fee</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("weekdayFee")}
                  />
                  {formik.touched.weekdayFee && formik.errors.weekdayFee && (
                    <div style={{ color: "red", fontSize: "0.8rem" }}>
                      {formik.errors.weekdayFee}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label>Weekend Fee</label>
                  <input
                    type="text"
                    className="form-control"
                    {...formik.getFieldProps("weekendFee")}
                  />
                  {formik.touched.weekendFee && formik.errors.weekendFee && (
                    <div style={{ color: "red", fontSize: "0.8rem" }}>
                      {formik.errors.weekendFee}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label>Tax Type</label>
                  <select
                    className="form-select"
                    {...formik.getFieldProps("taxTypeId")}
                  >
                    <option value="">Select Tax Type</option>
                    {taxData &&
                      taxData.map((tax) => (
                        <option key={tax.id} value={tax.id}>
                          {tax.taxType}
                        </option>
                      ))}
                  </select>
                  {formik.touched.taxTypeId && formik.errors.taxTypeId && (
                    <div style={{ color: "red", fontSize: "0.8rem" }}>
                      {formik.errors.taxTypeId}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label>Status</label>
                  <select
                    className="form-select"
                    {...formik.getFieldProps("status")}
                  >
                    <option value="">Select Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div style={{ color: "red", fontSize: "0.8rem" }}>
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-button btn-sm">
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CourseFeesEdit;
