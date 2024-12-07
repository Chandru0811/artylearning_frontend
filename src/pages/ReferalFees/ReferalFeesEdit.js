import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";

function ReferalFeesEdit({ referalData, onSuccess }) {
  const [show, setShow] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    setShow(true);
    if (referalData) {
      formik.setValues({
        centerLocation: referalData.centerLocation || [],
        effectiveDate: referalData.effectiveDate || "",
        referalFee: referalData.referalFee || "",
      });
    }
  };

  const validationSchema = yup.object().shape({
    centerLocation: yup
      .array()
      .of(yup.string().required("*Each center must be a valid string"))
      .min(1, "*At least one center is required"),
    effectiveDate: yup.string().required("*Effective Date is required"),
    referalFee: yup.string().required("*Referal Fee is required"),
  });

  const formik = useFormik({
    initialValues: {
      centerLocation: [],
      effectiveDate: "",
      referalFee: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadIndicator(true);
        console.log("Updated values:", values);
        toast.success("Referal Fees updated successfully!");
        if (onSuccess) onSuccess();
        handleClose();
      } catch (error) {
        toast.error("Failed to update Referal Fees.");
      } finally {
        setLoadIndicator(false);
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
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Edit <i className="bx bx-edit"></i>
        </button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
            <Modal.Title>Edit Referal Fees</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                {/* Center Selection */}
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Centre<span className="text-danger">*</span>
                  </label>
                  <div
                    className={`form-control form-control-sm ${
                      formik.touched.centerLocation &&
                      formik.errors.centerLocation
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      alignItems: "center",
                      minHeight: "38px",
                    }}
                  >
                    {formik.values.centerLocation?.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-primary text-white d-flex align-items-center"
                        style={{ padding: "5px 10px", borderRadius: "10px" }}
                      >
                        {tag}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: "10px", lineHeight: 1 }}
                          onClick={() => {
                            const updatedCenters = [
                              ...formik.values.centerLocation,
                            ];
                            updatedCenters.splice(index, 1);
                            formik.setFieldValue(
                              "centerLocation",
                              updatedCenters
                            );
                          }}
                        />
                      </span>
                    ))}
                    <select
                      onChange={(e) => {
                        const selectedCenter = e.target.value;
                        if (
                          selectedCenter &&
                          !formik.values.centerLocation.includes(selectedCenter)
                        ) {
                          formik.setFieldValue("centerLocation", [
                            ...formik.values.centerLocation,
                            selectedCenter,
                          ]);
                        }
                      }}
                      className="form-select form-select-sm border-0"
                    >
                      <option value="" disabled>
                        Select a Centre
                      </option>
                      {centerData &&
                        centerData.map((center) => (
                          <option key={center.id} value={center.centerNames}>
                            {center.centerNames}
                          </option>
                        ))}
                    </select>
                  </div>
                  {formik.touched.centerLocation &&
                    formik.errors.centerLocation && (
                      <div className="invalid-feedback">
                        {formik.errors.centerLocation}
                      </div>
                    )}
                </div>

                {/* Effective Date */}
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

                {/* Referral Fee */}
                <div className="col-md-6 col-12">
                  <label className="form-label">
                    Referal Fee<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.referalFee && formik.errors.referalFee
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("referalFee")}
                  />
                  {formik.touched.referalFee && formik.errors.referalFee && (
                    <div className="invalid-feedback">
                      {formik.errors.referalFee}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ReferalFeesEdit;
