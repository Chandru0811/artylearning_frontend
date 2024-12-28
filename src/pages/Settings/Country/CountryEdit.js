import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineModeEdit } from "react-icons/md";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
  country: Yup.string().required("*Country is required"),
  nationality: Yup.string().required("*Nationality is required"),
  citizenship: Yup.string().required("*Citizenship is required"),
});

function CountryEdit({ id, onSuccess, handleMenuClose }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllCountrySettingById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      country: "",
      nationality: "",
      citizenship: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        values.updatedBy = userName
        const response = await api.put(`/updateCountrySetting/${id}`, values, {
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
        toast.error(error.message || "An error occurred");
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
    setOpen(false);
    setIsModified(false);
  };

  const handleShow = () => {
    setOpen(true);
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
        className="text-start mb-0 menuitem-style"
        onClick={handleShow}
      >
        Edit
      </p>
      <Dialog
        open={open}
        onClose={isModified ? undefined : handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="headColor">
          Country & Nationality Edit{" "}
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
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Country<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.country && formik.errors.country
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("country")}
                  />
                  {formik.touched.country && formik.errors.country && (
                    <div className="invalid-feedback">
                      {formik.errors.country}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Nationality<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.nationality && formik.errors.nationality
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("nationality")}
                  />
                  {formik.touched.nationality && formik.errors.nationality && (
                    <div className="invalid-feedback">
                      {formik.errors.nationality}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Citizenship<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.citizenship && formik.errors.citizenship
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("citizenship")}
                  />
                  {formik.touched.citizenship && formik.errors.citizenship && (
                    <div className="invalid-feedback">
                      {formik.errors.citizenship}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-border btn-sm"
              style={{ fontSize: "12px" }}
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

export default CountryEdit;
