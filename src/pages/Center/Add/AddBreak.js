import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import fetchAllCentersWithIds from "../../List/CenterList";

function AddBreak({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [centerData, setCenterData] = useState([]);

  const centerOptions = centerData?.map((center) => ({
    label: center.centerNames,
    value: center.id,
  }));

  const handleClose = () => {
    handleMenuClose();
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
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
    centerId: yup
      .array()
      .min(1, "*At least one center must be selected")
      .required("*Center selection is required"),
  });

  const formik = useFormik({
    initialValues: {
      breakName: "",
      fromDate: "",
      toDate: "",
      centerId: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const payload = {
        breakName: values.breakName,
        fromDate: values.fromDate,
        toDate: values.toDate,
      };
      let successCount = 0;
      let conflictCenters = [];
      let conflictMessage = "";
      const apiCalls = selectedCenters.map(async (center) => {
        try {
          const response = await api.post(
            `/createCenterBreaks/${center.value}`,
            { ...payload, centerId: center.value },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            successCount++;
          }
        } catch (error) {
          if (error.response?.status === 409) {
            if (!conflictMessage)
              conflictMessage = error.response?.data?.message;
            conflictCenters.push(center.label);
          } else {
            toast.error(`${error?.response?.data?.message}$${center.label}`);
          }
        }
      });

      await Promise.all(apiCalls);
      if (conflictCenters.length > 0) {
        toast.warning(`${conflictMessage}: ${conflictCenters.join(", ")}`);
      }
      if (successCount > 0) {
        toast.success(`Registration added successfully`);
        setLoadIndicator(false);
        onSuccess();
        handleClose();
      }
    },
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              e.preventDefault();
            }
          }}
        >
          <DialogTitle>
            <p className="headColor">Add Centre Break</p>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Centre<span className="text-danger">*</span>
                </label>
                <MultiSelect
                  options={centerOptions}
                  value={centerOptions.filter((center) =>
                    formik.values.centerId.includes(center.value)
                  )}
                  onChange={(selected) => {
                    setSelectedCenters(selected);
                    formik.setFieldValue(
                      "centerId",
                      selected.map((center) => center.value)
                    );
                  }}
                  labelledBy="Select Centers"
                  className="form-multi-select"
                />
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="text-danger mt-1">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  Break Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...formik.getFieldProps("breakName")}
                />
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  From Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  {...formik.getFieldProps("fromDate")}
                />
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label className="form-label">
                  To Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  {...formik.getFieldProps("toDate")}
                />
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
                <span className="spinner-border spinner-border-sm me-2"></span>
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
