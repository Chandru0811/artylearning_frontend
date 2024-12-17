import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MdOutlineModeEdit } from "react-icons/md";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function RaceEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllRaceSettingById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  const validationSchema = Yup.object({
    race: Yup.string().required("*Race is required"),
  });

  const formik = useFormik({
    initialValues: {
      race: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateRaceSetting/${id}`, values, {
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
        toast.error("An error occurred.");
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
        onClose={!isModified ? handleClose : null}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="headColor">
          Race Edit{" "}
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
                    Race<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.race && formik.errors.race
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("race")}
                  />
                  {formik.touched.race && formik.errors.race && (
                    <div className="invalid-feedback">{formik.errors.race}</div>
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

export default RaceEdit;
