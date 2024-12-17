import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import { FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";

function ReferalFeesEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    fetchData();
    getData();
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    centerId: yup.string().required("*Centre is required"),
    effectiveDate: yup.string().required("*Effective Date is required"),
    referralFee: yup
      .number()
      .typeError("*Referral Fee must be a number")
      .positive("*Referral Fee must be a positive number")
      .required("*Referral Fee is required"),
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
      effectiveDate: "",
      referralFee: "",
      status: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);

      try {
        const response = await api.put(`/updateReferralFees/${id}`, values, {
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

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error("Error fetching center data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllReferralFeesById/${id}`);
      const rest = response.data;

      const formattedData = {
        ...rest,
        effectiveDate: rest.effectiveDate
          ? new Date(rest.effectiveDate).toISOString().split("T")[0]
          : undefined,
      };
      formik.setValues(formattedData);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
        className="btn btn-sm btn-normal text-start"
      >
        <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      </button>

      <Dialog
        open={show}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        disableBackdropClick={isModified}
        disableEscapeKeyDown={isModified}
      >
        <DialogTitle className="headColor">Edit Referal Fees</DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogContent>
            <div className="container">
              <div className="row py-4">
                <div class="col-md-6 col-12 mb-4">
                  <lable className="form-label">
                    Centre<span class="text-danger">*</span>
                  </lable>
                  <select
                    {...formik.getFieldProps("centerId")}
                    name="centerId"
                    className={`form-select   ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                    class="form-select "
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((centerId) => (
                        <option key={centerId.id} value={centerId.id}>
                          {centerId.centerNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.centerId && formik.errors.centerId && (
                    <div className="invalid-feedback">
                      {formik.errors.centerId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Effective Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.effectiveDate &&
                      formik.errors.effectiveDate
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
                <div className="col-md-6 col-12">
                  <label className="form-label">
                    Referal Fee<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.referralFee && formik.errors.referralFee
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("referralFee")}
                  />
                  {formik.touched.referralFee && formik.errors.referralFee && (
                    <div className="invalid-feedback">
                      {formik.errors.referralFee}
                    </div>
                  )}
                </div>
                <div class="col-md-6 col-12 mb-4">
                  <lable className="form-label">
                    Status<span class="text-danger">*</span>
                  </lable>
                  <select
                    {...formik.getFieldProps("status")}
                    name="status"
                    className={`form-select   ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                    class="form-select"
                  >
                    <option selected></option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">INactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <button
              type="submit"
              onSubmit={formik.handleSubmit}
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

export default ReferalFeesEdit;
