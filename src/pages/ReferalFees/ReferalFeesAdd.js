import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import api from "../../config/URL";
import { MultiSelect } from "react-multi-select-component";

function ReferalFeesAdd({ onSuccess }) {
  const [show, setShow] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const createdBy = localStorage.getItem("userName");
  const centerOptions = centerData?.map((center) => ({
    label: center.centerNames,
    value: center.id,
  }));

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    fetchData();
    setShow(true);
    setIsModified(false);
  };

  const validationSchema = yup.object().shape({
    centerId: yup
      .array()
      .min(1, "*At least one center must be selected")
      .required("*Center selection is required"),
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
      status: "ACTIVE",
      createdBy: createdBy,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      let successCount = 0;
      const apiCalls = selectedCenters.map(async (center) => {
        const payload = {
          breakName: values.breakName,
          effectiveDate: values.effectiveDate,
          referralFee: values.referralFee,
          status: values.status,
          createdBy: values.createdBy,
          centerId: center.value,
        };
        try {
          const response = await api.post(`/createReferralFees`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 201) {
            successCount++;
          }
        } catch (error) {
          if (error.response?.status === 409) {
            toast.warning(`${error?.response?.data?.message}$${center.label}`);
          } else {
            toast.error(`${error?.response?.data?.message}$${center.label}`);
          }
        }
      });

      await Promise.all(apiCalls);
      if (successCount > 0) {
        toast.success(`Referal Fee added successfully`);
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
      toast.error("Error fetching center data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end mb-3 me-3">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i className="bx bx-plus"></i>
        </button>
      </div>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="headColor">Add Referal Fees</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-4">
                  <label className="form-label">
                    Centre<span className="text-danger">*</span>
                  </label>
                  <MultiSelect
                    options={centerOptions}
                    value={centerOptions?.filter((center) =>
                      formik.values.centerId?.includes(center.value)
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
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
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ReferalFeesAdd;
