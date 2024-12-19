import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import CloseIcon from "@mui/icons-material/Close";

function CMSContactEdit({ id, onSuccess, handleMenuClose }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    handleMenuClose();
    setOpen(false);
  };
  const handleOpen = () => {
    getData();
    setOpen(true);
  };

  const validationSchema = Yup.object({
    centerName: Yup.string().required("*Centre Name is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*Enter a valid email address"
      )
      .required("*Email is required"),
    address: Yup.string().required("*Address is required"),
    map: Yup.string().required("*Google Address is required"),
    mobileNo: Yup.string()
      .matches(
        /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
        "*Invalid Phone Number"
      )
      .required("*Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      centerName: "",
      email: "",
      address: "",
      map: "",
      mobileNo: "",
      updatedBy: userName,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateContactUsSave/${id}`, values, {
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
  });

  const getData = async () => {
    if (id) {
      try {
        const response = await api.get(`/getContactUsSaveById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    }
  };

  return (
    <>
      <p className="text-start" onClick={handleOpen}>
        Edit
      </p>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="headColor">
          Edit Contact{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Centre Name</label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.centerName && formik.errors.centerName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("centerName")}
                  />
                  {formik.touched.centerName && formik.errors.centerName && (
                    <div className="invalid-feedback">
                      {formik.errors.centerName}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Email</label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
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
                  <label className="form-label">Mobile</label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.mobileNo && formik.errors.mobileNo
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("mobileNo")}
                  />
                  {formik.touched.mobileNo && formik.errors.mobileNo && (
                    <div className="invalid-feedback">
                      {formik.errors.mobileNo}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Address</label>
                  <textarea
                    type="text"
                    className={`form-control ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : ""
                    }`}
                    rows="3"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Google Address</label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.map && formik.errors.map
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("map")}
                  />
                  {formik.touched.map && formik.errors.map && (
                    <div className="invalid-feedback">{formik.errors.map}</div>
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

export default CMSContactEdit;
