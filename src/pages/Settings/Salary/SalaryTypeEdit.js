import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
  salaryType: Yup.string().required("*Salary Type is required"),
});

function SalaryEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllSalarySettingById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      salaryType: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateSalarySetting/${id}`, values, {
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

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  return (
    <>
      <button
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
        className="btn btn-sm btn-normal text-start"
        onClick={handleShow}
      >
        <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      </button>

      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="contained-dialog-title-vcenter"
        maxWidth="sm"
        fullWidth
        disableBackdropClick={isModified}
        disableEscapeKeyDown={isModified}
      >
        <DialogTitle id="contained-dialog-title-vcenter" className="headColor">
          Salary Type Edit{" "}
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
                <div className="col-12 mb-2">
                  <label className="form-label">
                    Salary Type<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.salaryType && formik.errors.salaryType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("salaryType")}
                  />
                  {formik.touched.salaryType && formik.errors.salaryType && (
                    <div className="invalid-feedback">
                      {formik.errors.salaryType}
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

export default SalaryEdit;
