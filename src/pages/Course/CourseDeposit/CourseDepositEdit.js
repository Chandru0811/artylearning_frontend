import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object({
  effectiveDate: Yup.string().required("*Effective Date is required"),
  depositFees: Yup.string().required("*Deposit Fees Code is required"),
  taxType: Yup.string().required("*TaxType is required"),
  status: Yup.string().required("*Status is required"),
});

function CourseFeesEdit({ id, onSuccess, handleMenuClose }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [taxData, setTaxData] = useState([]);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    setOpen(false);
    handleMenuClose();
  };

  const handleOpen = () => {
    setOpen(true);
    fetchTaxData();
  };

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      effectiveDate: "",
      depositFees: "",
      taxType: "",
      status: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      try {
        const response = await api.put(
          `/updateCourseDepositFees/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
        const response = await api.get(`/getAllCourseDepositFeesById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    getData();
  }, [id]);

  return (
    <>
      <span
        onClick={handleOpen}
        style={{
          whiteSpace: "nowrap",
          width: "100%",
          cursor: "pointer",
        }}
      >
        &nbsp;&nbsp;&nbsp;Edit
      </span>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Course Deposit</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Effective Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
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
                    Deposit Fees<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.depositFees && formik.errors.depositFees
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("depositFees")}
                  />
                  {formik.touched.depositFees && formik.errors.depositFees && (
                    <div className="invalid-feedback">
                      {formik.errors.depositFees}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Tax Type<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${
                      formik.touched.taxType && formik.errors.taxType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("taxType")}
                  >
                    <option value=""></option>
                    {taxData.map((tax) => (
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
                    className={`form-control ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("status")}
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
          </DialogContent>
          <DialogActions>
            <button
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
