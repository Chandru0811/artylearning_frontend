import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllPackageList from "../../List/PackageList";

const validationSchema = Yup.object({
  effectiveDate: Yup.string().required("*Effective Date is required"),
  packageId: Yup.string().required("*Package Name is required"),
  weekdayFee: Yup.string().required("*Weekday Fee is required"),
  weekendFee: Yup.string().required("*Weekend Fee is required"),
  taxType: Yup.string().required("*TaxType Fee is required"),
  status: Yup.string().required("*Status is required"),
});

function CourseFeesEdit({ id, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [taxData, setTaxData] = useState([]);
  const userName = localStorage.getItem("userName");

  const fetchPackageData = async () => {
    try {
      const packageData = await fetchAllPackageList();
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPackageData(null);
  };

  const handleShow = () => {
    fetchPackageData();
    fetchTaxData();
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      effectiveDate: "",
      packageId: "",
      weekdayFee: "",
      weekendFee: "",
      taxType: "",
      courseId: id,
      status: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateCourseFees/${id}`, values, {
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
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseFeesById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <span
        onClick={handleShow}
        style={{
          whiteSpace: "nowrap",
          width: "100%",
          cursor: "pointer",
        }}
      >
        &nbsp;&nbsp;&nbsp;Edit
      </span>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Edit Course Fees</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-3">
                  <TextField
                    label="Effective Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...formik.getFieldProps("effectiveDate")}
                    error={
                      formik.touched.effectiveDate &&
                      Boolean(formik.errors.effectiveDate)
                    }
                    helperText={
                      formik.touched.effectiveDate &&
                      formik.errors.effectiveDate
                    }
                  />
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <FormControl fullWidth>
                    <InputLabel>Package</InputLabel>
                    <Select
                      {...formik.getFieldProps("packageId")}
                      error={
                        formik.touched.packageId &&
                        Boolean(formik.errors.packageId)
                      }
                    >
                      <MenuItem value="">
                        <em>Select Package</em>
                      </MenuItem>
                      {packageData &&
                        packageData.map((packages) => (
                          <MenuItem key={packages.id} value={packages.id}>
                            {packages.packageNames}
                          </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.packageId && formik.errors.packageId && (
                      <div style={{ color: "red", fontSize: "0.8rem" }}>
                        {formik.errors.packageId}
                      </div>
                    )}
                  </FormControl>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <TextField
                    label="Weekday Fee"
                    fullWidth
                    {...formik.getFieldProps("weekdayFee")}
                    error={
                      formik.touched.weekdayFee &&
                      Boolean(formik.errors.weekdayFee)
                    }
                    helperText={
                      formik.touched.weekdayFee && formik.errors.weekdayFee
                    }
                  />
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <TextField
                    label="Weekend Fee"
                    fullWidth
                    {...formik.getFieldProps("weekendFee")}
                    error={
                      formik.touched.weekendFee &&
                      Boolean(formik.errors.weekendFee)
                    }
                    helperText={
                      formik.touched.weekendFee && formik.errors.weekendFee
                    }
                  />
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <FormControl fullWidth>
                    <InputLabel>Tax Type</InputLabel>
                    <Select
                      {...formik.getFieldProps("taxType")}
                      error={
                        formik.touched.taxType && Boolean(formik.errors.taxType)
                      }
                    >
                      <MenuItem value="">
                        <em>Select Tax Type</em>
                      </MenuItem>
                      {taxData &&
                        taxData.map((tax) => (
                          <MenuItem key={tax.id} value={tax.id}>
                            {tax.taxType}
                          </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.taxType && formik.errors.taxType && (
                      <div style={{ color: "red", fontSize: "0.8rem" }}>
                        {formik.errors.taxType}
                      </div>
                    )}
                  </FormControl>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...formik.getFieldProps("status")}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                    >
                      <MenuItem value="">
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                      <div style={{ color: "red", fontSize: "0.8rem" }}>
                        {formik.errors.status}
                      </div>
                    )}
                  </FormControl>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-button btn-sm">
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CourseFeesEdit;
