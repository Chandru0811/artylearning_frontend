import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { GoPackage } from "react-icons/go";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import fetchAllCentersWithIds from "../../List/CenterList";
function AddPackage({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
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

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };
  const validationSchema = yup.object().shape({
    packageName: yup.string().required("*Package Name is required"),
    noOfLesson: yup
      .number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("*Number of Lesson is required"),
  });
  const formik = useFormik({
    initialValues: {
      packageName: "",
      noOfLesson: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form values:", values);
      let successCount = 0;
      let conflictCenters = [];
      let conflictMessage = "";
      const apiCalls = selectedCenters.map(async (center) => {
        try {
          const payload = {
            packageName: values.packageName,
            noOfLesson: values.noOfLesson,
          };
          const response = await api.post(
            `/createCenterPackages/${center.value}`,
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
        toast.success(`Package added successfully`);
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
        Add Package
      </p>

      <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
        <form
          onSubmit={formik.handleSubmit}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" && !formik.isSubmitting) {
          //     e.preventDefault(); // Prevent default form submission
          //   }
          // }}
        >
          <DialogTitle>
            <p className="headColor">Add Package</p>
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
                <lable className="form-lable">
                  Package Name<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    onKeyDown={(e) => e.stopPropagation()}
                    className={`form-control   ${
                      formik.touched.packageName && formik.errors.packageName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("packageName")}
                  />
                  {formik.touched.packageName && formik.errors.packageName && (
                    <div className="invalid-feedback">
                      {formik.errors.packageName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label>
                  Number of Lesson<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.quantity && formik.errors.quantity
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("noOfLesson")}
                  style={{ width: "100%" }}
                >
                  <option value=""></option>
                  {Array.from({ length: 100 }, (_, i) => i + 1).map(
                    (number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    )
                  )}
                </select>
                {formik.touched.noOfLesson && formik.errors.noOfLesson && (
                  <div className="invalid-feedback">
                    {formik.errors.noOfLesson}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions className="mt-5">
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

export default AddPackage;
