import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

function AddBreak({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    handleMenuClose();
    formik.resetForm();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };
  const validationSchema = yup.object().shape({
    breakName: yup.string().required("*Break Name is required"),
    fromDate: yup.string().required("*From Date is required"),
    toDate: yup
      .string()
      .required("*To Date is required")
      .test(
        "is-greater",
        "*To Date must be greater than From Date",
        function (value) {
          const { fromDate } = this.parent;
          return fromDate && value
            ? new Date(value) >= new Date(fromDate)
            : true;
        }
      ),
  });
  const formik = useFormik({
    initialValues: {
      breakName: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form values:", values);
      try {
        const response = await api.post(`/createCenterBreaks/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.warning(error?.response?.data?.message);
        } else {
          toast.error(error.response.data.message);
        }
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
  return (
    <>
      <p
        className="text-start mb-0 menuitem-style"
        style={{ whiteSpace: "nowrap", width: "100%" }}
        onClick={handleShow}
      >
        Add Centre Break
      </p>

      <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <DialogTitle>
            <p className="headColor">Add Centre Break</p>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Break Name<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <input
                  onKeyDown={(e) => e.stopPropagation()}
                    type="data"
                    className={`form-control   ${
                      formik.touched.breakName && formik.errors.breakName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("breakName")}
                  />
                  {formik.touched.breakName && formik.errors.breakName && (
                    <div className="invalid-feedback">
                      {formik.errors.breakName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable>
                  From Date<span class="text-danger">*</span>
                </lable>
                <input
                  type="date"
                  className={`form-control   ${
                    formik.touched.fromDate && formik.errors.fromDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("fromDate")}
                />
                {formik.touched.fromDate && formik.errors.fromDate && (
                  <div className="invalid-feedback">
                    {formik.errors.fromDate}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  To Date<span className="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <input
                    type="date"
                    className={`form-control   ${
                      formik.touched.toDate && formik.errors.toDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("toDate")}
                  />
                  {formik.touched.toDate && formik.errors.toDate && (
                    <div className="invalid-feedback">
                      {formik.errors.toDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="mt-3">
            <Button
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
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddBreak;
