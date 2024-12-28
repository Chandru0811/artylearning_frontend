import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AbsentReasonEdit({ id, onSuccess,handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllAbsentReasonById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const handleClose = () => {
    handleMenuClose();
    setShow(false);}

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  const validationSchema = yup.object().shape({
    absentReason: yup.string().required("*Absent Reason is required"),
  });

  const formik = useFormik({
    initialValues: {
      absentReason: "",
      remarks: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        values.updatedBy = userName
        const response = await api.put(`/updateAbsentReason/${id}`, values, {
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
        toast.error(error);
      } finally {
        setLoadIndicator(false);
        handleClose();
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
        open={show}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="edit-absent-reason-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="edit-absent-reason-title">
            <p className="headColor">Edit Absent Reason</p>{" "}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">
                  Absent Reason<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.absentReason && formik.errors.absentReason
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("absentReason")}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                {formik.touched.absentReason && formik.errors.absentReason && (
                  <div className="invalid-feedback">
                    {formik.errors.absentReason}
                  </div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Remarks</label>
                <textarea
                  rows={4}
                  className="form-control"
                  {...formik.getFieldProps("remarks")}
                />
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

export default AbsentReasonEdit;
