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
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  shgType: Yup.string().required("*SHG Type is required"),
  shgAmount: Yup.string().required("*SHG Amount is required"),
});

function ShgEdit({ id, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllSHGSettingById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      shgType: "",
      shgAmount: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateSHGSetting/${id}`, values, {
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

  const handleClose = () => setOpen(false);
  const handleShow = () => {
    setOpen(true);
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
        open={open}
        onClose={isModified ? undefined : handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="headColor">
          SHG Edit{" "}
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
                    SHG Type<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.shgType && formik.errors.shgType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shgType")}
                  />
                  {formik.touched.shgType && formik.errors.shgType && (
                    <div className="invalid-feedback">
                      {formik.errors.shgType}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    SHG Amount<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.shgAmount && formik.errors.shgAmount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("shgAmount")}
                  />
                  {formik.touched.shgAmount && formik.errors.shgAmount && (
                    <div className="invalid-feedback">
                      {formik.errors.shgAmount}
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

export default ShgEdit;
