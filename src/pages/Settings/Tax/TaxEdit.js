import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
  taxType: Yup.string().required("*Tax Type is required"),
  rate: Yup.number()
    .required("*Rate is required")
    .min(0, "Rate must be at least 0")
    .max(100, "Rate must be at most 100"),
  effectiveDate: Yup.string().required("*Effective Date is required"),
  status: Yup.string().required("*Status is required"),
});

function TaxEdit({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const userName = localStorage.getItem("userName");

  const getData = async () => {
    try {
      const response = await api.get(`/getAllTaxSettingById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      taxType: "",
      rate: "",
      effectiveDate: "",
      status: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateTaxSetting/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          onSuccess();

          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        handleClose();
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (
        Object.values(values).some(
          (value) => typeof value === "string" && value.trim() !== ""
        )
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  const handleClose = () => {
    handleMenuClose();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  return (
    <>
      <p
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
        className="text-start"
        onClick={handleShow}
      >
        Edit
      </p>
      <Dialog
        open={show}
        onClose={isModified ? null : handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className="headColor">
          Tax Edit{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Tax Type<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.taxType && formik.errors.taxType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("taxType")}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  {formik.touched.taxType && formik.errors.taxType && (
                    <div className="invalid-feedback">
                      {formik.errors.taxType}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Rate (%)<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    className={`form-control ${
                      formik.touched.rate && formik.errors.rate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("rate")}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  {formik.touched.rate && formik.errors.rate && (
                    <div className="invalid-feedback">{formik.errors.rate}</div>
                  )}
                </div>
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
                     onKeyDown={(e) => e.stopPropagation()}
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
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("status")}
                    className={`form-select ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option></option>
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
              type="button"
              className="btn btn-border btn-sm"
              style={{ fontSize: "12px" }}
              onClick={handleClose}
            >
              Cancel
            </button>
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
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default TaxEdit;
