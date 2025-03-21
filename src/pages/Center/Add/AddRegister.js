import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import fetchAllCentersWithIds from "../../List/CenterList";
import { MultiSelect } from "react-multi-select-component";

function AddRegister({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [taxData, setTaxData] = useState([]);
  const [isModified, setIsModified] = useState(false);
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

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const handleShow = () => {
    fetchTaxData();
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    effectiveDate: yup.string().required("*Effective Date is required"),
    amount: yup
      .string()
      .typeError("Amount must be a number")
      .required("*Amount is required")
      .matches(
        /^\d+(\.\d{1,2})?$/,
        "*Amount must be a valid number without special characters"
      ),
    taxId: yup.string().required("*Tax Type is required"),
    status: yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      effectiveDate: "",
      amount: "",
      taxId: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log(values);
      let successCount = 0;
      let conflictCenters = [];
      let conflictMessage = "";
      const apiCalls = selectedCenters.map(async (center) => {
        try {
          const payload = {
            effectiveDate: values.effectiveDate,
            amount: values.amount,
            classRoomCode: values.classRoomCode,
            taxId: values.taxId,
            status: values.status,
          };
          const response = await api.post(
            `/createCenterRegistrations/${center.value}`,
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
        Add Registration Fees
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
            <p className="headColor">Add Centre Registration Fees</p>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Centre<span className="text-danger">*</span>
                </label>
                <MultiSelect
                  options={centerOptions}
                  value={selectedCenters}
                  onChange={(selected) => {
                    setSelectedCenters(selected);
                    formik.setFieldValue(
                      "centerId",
                      selected.map((option) => option.value)
                    );
                  }}
                  labelledBy="Select Centers"
                  className={`form-multi-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    height: "37.6px !important", // Set the desired height
                    minHeight: "37.6px", // Ensure the height doesn't shrink
                  }}
                />
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label>
                  Effective Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    formik.touched.effectiveDate && formik.errors.effectiveDate
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
                <label>
                  Amount (Including GST)<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control ${
                      formik.touched.amount && formik.errors.amount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("amount")}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="invalid-feedback">
                      {formik.errors.amount}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label>
                  Tax Type<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.taxId && formik.errors.taxId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("taxId")}
                  style={{ width: "100%" }}
                >
                  <option value=""></option>
                  {taxData &&
                    taxData.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.taxType}
                      </option>
                    ))}
                </select>
                {formik.touched.taxId && formik.errors.taxId && (
                  <div className="invalid-feedback">{formik.errors.taxId}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label>
                  Status<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.status && formik.errors.status
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("status")}
                  style={{ width: "100%" }}
                >
                  <option value=""></option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="invalid-feedback">{formik.errors.status}</div>
                )}
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

export default AddRegister;
